#!/usr/bin/env tsx

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import {
  BLOG_CONFIG,
  SYSTEM_PROMPT,
  getUserPrompt,
  generateTopicQueue,
  getNextTopic,
  type TopicEntry,
} from "./blog-config";

const QUEUE_PATH = path.join(__dirname, "topic-queue.json");
const CONTENT_DIR = path.join(process.cwd(), BLOG_CONFIG.contentDir);

interface QueueData {
  lastUpdated: string;
  rotationIndex: number;
  topics: TopicEntry[];
}

// Load or initialize the topic queue
function loadQueue(): QueueData {
  if (fs.existsSync(QUEUE_PATH)) {
    const data = JSON.parse(fs.readFileSync(QUEUE_PATH, "utf-8"));
    return {
      lastUpdated: data.lastUpdated,
      rotationIndex: data.rotationIndex ?? 0,
      topics: data.topics,
    };
  }
  // First run: generate and save the initial queue
  const topics = generateTopicQueue();
  const queue: QueueData = { lastUpdated: new Date().toISOString(), rotationIndex: 0, topics };
  saveQueue(queue);
  return queue;
}

function saveQueue(queue: QueueData): void {
  fs.writeFileSync(
    QUEUE_PATH,
    JSON.stringify(
      { lastUpdated: new Date().toISOString(), rotationIndex: queue.rotationIndex, topics: queue.topics },
      null,
      2
    ),
    "utf-8"
  );
}

// Pick the next topic to generate (uses rotation-aware selection)
function pickNextTopic(queue: QueueData): { topic: TopicEntry | null; nextRotationIndex: number } {
  return getNextTopic(queue.topics, queue.rotationIndex);
}

// Generate blog post content via Claude API
async function generateContent(topic: TopicEntry): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY environment variable is required");
  }

  const client = new Anthropic({ apiKey });

  const message = await client.messages.create({
    model: BLOG_CONFIG.model,
    max_tokens: BLOG_CONFIG.maxTokens,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: getUserPrompt(topic),
      },
    ],
  });

  const textBlock = message.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text content in API response");
  }

  return textBlock.text;
}

// Build the frontmatter for the markdown file
function buildFrontmatter(topic: TopicEntry, excerpt: string): string {
  const today = new Date().toISOString().split("T")[0];
  const lines = [
    "---",
    `title: "${topic.title.replace(/"/g, '\\"')}"`,
    `slug: "${topic.slug}"`,
    `date: "${today}"`,
    `excerpt: "${excerpt.replace(/"/g, '\\"')}"`,
    `categories:`,
    ...topic.categories.map((c) => `  - "${c}"`),
    `tags:`,
    ...topic.tags.map((t) => `  - "${t}"`),
    `featuredService: "${topic.service}"`,
    topic.town ? `featuredTown: "${topic.town}"` : `featuredTown: null`,
    `published: true`,
    "---",
  ];
  return lines.join("\n");
}

// Extract first paragraph as excerpt
function extractExcerpt(content: string): string {
  const lines = content.split("\n").filter((l) => l.trim() && !l.startsWith("#"));
  const firstParagraph = lines[0] || "";
  // Truncate to ~160 chars for meta description
  if (firstParagraph.length > 160) {
    return firstParagraph.substring(0, 157) + "...";
  }
  return firstParagraph;
}

// Validate generated content quality
function validateContent(content: string, topic: TopicEntry): string[] {
  const errors: string[] = [];
  const wordCount = content.split(/\s+/).length;

  if (wordCount < BLOG_CONFIG.targetWordCount.min) {
    errors.push(`Word count too low: ${wordCount} (minimum: ${BLOG_CONFIG.targetWordCount.min})`);
  }
  if (wordCount > BLOG_CONFIG.targetWordCount.max * 1.5) {
    errors.push(`Word count too high: ${wordCount} (target max: ${BLOG_CONFIG.targetWordCount.max})`);
  }
  if (!content.includes("(201) 630-7181") && !content.includes("201-630-7181")) {
    errors.push("Missing phone number");
  }
  if (!content.includes("/contact/") && !content.includes("/contact")) {
    errors.push("Missing link to contact page");
  }
  if (content.includes("[insert") || content.includes("[INSERT") || content.includes("lorem ipsum")) {
    errors.push("Contains placeholder text");
  }
  if (!content.includes("##")) {
    errors.push("Missing H2 headings");
  }

  // Check for service page links
  if (!content.includes(`/services/${topic.service}`)) {
    errors.push(`Missing link to service page /services/${topic.service}/`);
  }

  return errors;
}

// Write the markdown file
function writePost(topic: TopicEntry, content: string): string {
  const excerpt = extractExcerpt(content);
  const frontmatter = buildFrontmatter(topic, excerpt);
  const fullContent = `${frontmatter}\n\n${content}\n`;

  fs.mkdirSync(CONTENT_DIR, { recursive: true });
  const filename = `${topic.slug}.md`;
  const filePath = path.join(CONTENT_DIR, filename);
  fs.writeFileSync(filePath, fullContent, "utf-8");

  return filePath;
}

// Check if a post was already generated this week (within the last 6 days)
function wasPostGeneratedThisWeek(): string | null {
  if (!fs.existsSync(CONTENT_DIR)) return null;
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  const sixDaysAgo = new Date();
  sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const dateMatch = raw.match(/^date:\s*"(\d{4}-\d{2}-\d{2})"/m);
    if (dateMatch) {
      const postDate = new Date(dateMatch[1] + "T12:00:00Z");
      if (postDate >= sixDaysAgo) {
        return file;
      }
    }
  }
  return null;
}

// Main execution
async function main() {
  console.log("=== Blog Post Generator ===\n");

  // Guard: only one post per week
  const recentPost = wasPostGeneratedThisWeek();
  if (recentPost) {
    console.log(`A post was already generated this week: ${recentPost}`);
    console.log("Skipping to avoid duplicates. Only one post per week is allowed.");
    return;
  }

  // Load queue
  const queue = loadQueue();
  const remaining = queue.topics.filter((t) => !t.generated);
  console.log(`Topics in queue: ${queue.topics.length} total, ${remaining.length} remaining`);
  console.log(`Rotation index: ${queue.rotationIndex}\n`);

  // Pick next topic (rotation-aware — different template type each week)
  const { topic, nextRotationIndex } = pickNextTopic(queue);
  if (!topic) {
    console.log("No more topics to generate. All done!");
    return;
  }

  console.log(`Selected topic: ${topic.title}`);
  console.log(`Template: ${topic.template}`);
  console.log(`Service: ${topic.service}`);
  if (topic.town) console.log(`Town: ${topic.town}`);
  console.log(`Primary keyword: ${topic.primaryKeyword}\n`);

  // Check if post already exists (by slug or by similar title)
  const existingPath = path.join(CONTENT_DIR, `${topic.slug}.md`);
  if (fs.existsSync(existingPath)) {
    console.log(`Post already exists at ${existingPath}. Marking as generated and skipping.\n`);
    topic.generated = true;
    queue.rotationIndex = nextRotationIndex;
    saveQueue(queue);
    return;
  }

  // Check for duplicate topics by scanning existing post titles
  const existingFiles = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));
  for (const file of existingFiles) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const titleMatch = raw.match(/^title:\s*"(.+)"/m);
    if (titleMatch) {
      const existingTitle = titleMatch[1].toLowerCase();
      const topicTitle = topic.title.toLowerCase();
      // Skip if an existing post has the same or very similar title
      if (existingTitle === topicTitle || existingTitle.includes(topicTitle) || topicTitle.includes(existingTitle)) {
        console.log(`Duplicate topic detected: "${titleMatch[1]}" already exists in ${file}. Marking as generated and skipping.\n`);
        topic.generated = true;
        queue.rotationIndex = nextRotationIndex;
        saveQueue(queue);
        return;
      }
    }
  }

  // Generate content
  console.log("Generating content via Claude API...\n");
  const content = await generateContent(topic);

  // Validate
  const errors = validateContent(content, topic);
  if (errors.length > 0) {
    console.warn("Content validation warnings:");
    for (const err of errors) {
      console.warn(`  - ${err}`);
    }
    console.warn("\nProceeding anyway (warnings are non-fatal).\n");
  }

  // Write file
  const filePath = writePost(topic, content);
  console.log(`Post written to: ${filePath}`);

  // Update queue with new rotation position
  topic.generated = true;
  queue.rotationIndex = nextRotationIndex;
  saveQueue(queue);

  const newRemaining = queue.topics.filter((t) => !t.generated);
  console.log(`\nDone! ${newRemaining.length} topics remaining in queue.`);
  console.log(`Next rotation index: ${nextRotationIndex}`);
}

main().catch((err) => {
  console.error("Error generating blog post:", err);
  process.exit(1);
});
