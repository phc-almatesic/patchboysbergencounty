#!/usr/bin/env tsx

/**
 * Post a blog summary to Google Business Profile as a "What's New" update.
 *
 * Usage:
 *   GOOGLE_SERVICE_ACCOUNT_KEY=<json> npx tsx scripts/post-to-gbp.ts <blog-slug>
 *
 * Environment variables:
 *   GOOGLE_SERVICE_ACCOUNT_KEY - JSON string of the service account credentials
 *   GBP_ACCOUNT_ID            - (optional) GBP account ID — auto-discovered if omitted
 *   GBP_LOCATION_ID           - (optional) GBP location ID — auto-discovered if omitted
 */

import { google } from "googleapis";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const SITE_URL = "https://www.bergencountypatchboys.com";
const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

function getAuthClient() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY environment variable is required");
  }

  const key = JSON.parse(keyJson);
  return new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ["https://www.googleapis.com/auth/business.manage"],
  });
}

// ---------------------------------------------------------------------------
// GBP API helpers (v4 — localPosts still active)
// ---------------------------------------------------------------------------

async function listAccounts(auth: InstanceType<typeof google.auth.JWT>): Promise<string> {
  // Check for override
  if (process.env.GBP_ACCOUNT_ID) return process.env.GBP_ACCOUNT_ID;

  const res = await auth.request({
    url: "https://mybusinessaccountmanagement.googleapis.com/v1/accounts",
    method: "GET",
  });
  const accounts = (res.data as { accounts?: { name: string }[] }).accounts;
  if (!accounts || accounts.length === 0) {
    throw new Error("No GBP accounts found for this service account. Make sure the service account has been granted access to your Business Profile.");
  }
  console.log(`Found ${accounts.length} account(s). Using: ${accounts[0].name}`);
  return accounts[0].name; // e.g. "accounts/123456789"
}

async function listLocations(auth: InstanceType<typeof google.auth.JWT>, account: string): Promise<string> {
  // Check for override
  if (process.env.GBP_LOCATION_ID) return process.env.GBP_LOCATION_ID;

  const res = await auth.request({
    url: `https://mybusinessbusinessinformation.googleapis.com/v1/${account}/locations`,
    method: "GET",
  });
  const locations = (res.data as { locations?: { name: string; title?: string }[] }).locations;
  if (!locations || locations.length === 0) {
    throw new Error("No locations found for this account. Verify your Business Profile has a location configured.");
  }
  console.log(`Found ${locations.length} location(s). Using: ${locations[0].name} (${locations[0].title || "unnamed"})`);
  return locations[0].name; // e.g. "locations/987654321"
}

async function createLocalPost(
  auth: InstanceType<typeof google.auth.JWT>,
  account: string,
  location: string,
  summary: string,
  blogUrl: string,
) {
  // The v4 localPosts API wants the parent as "accounts/X/locations/Y"
  // account is "accounts/X", location is "locations/Y"
  const locationId = location.replace("locations/", "");
  const parent = `${account}/locations/${locationId}`;

  const body = {
    languageCode: "en-US",
    topicType: "STANDARD",
    summary,
    callToAction: {
      actionType: "LEARN_MORE",
      url: blogUrl,
    },
    media: [
      {
        mediaFormat: "PHOTO",
        sourceUrl: OG_IMAGE_URL,
      },
    ],
  };

  console.log(`Creating post on ${parent}...`);

  const res = await auth.request({
    url: `https://mybusiness.googleapis.com/v4/${parent}/localPosts`,
    method: "POST",
    data: body,
  });

  console.log("Post created successfully!");
  return res.data;
}

// ---------------------------------------------------------------------------
// Blog post reading
// ---------------------------------------------------------------------------

function readBlogPost(slug: string): { title: string; excerpt: string; url: string } {
  const contentDir = path.join(process.cwd(), "content/blog");
  const filePath = path.join(contentDir, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Blog post not found: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);

  return {
    title: data.title || slug,
    excerpt: data.excerpt || "",
    url: `${SITE_URL}/blog/${slug}/`,
  };
}

/**
 * Build a GBP post summary from a blog post.
 * - Max 1,500 chars, ideal 150-300
 * - NO phone numbers (GBP rejects them)
 * - Include the blog title and a teaser
 */
function buildSummary(title: string, excerpt: string): string {
  const intro = `${title}\n\n${excerpt}`;

  // Trim to ~280 chars to stay in the ideal range
  if (intro.length > 280) {
    return intro.substring(0, 277) + "...";
  }
  return intro;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    // If no slug provided, find the most recently generated post
    const contentDir = path.join(process.cwd(), "content/blog");
    const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".md"));
    if (files.length === 0) {
      console.error("No blog posts found and no slug provided.");
      process.exit(1);
    }

    // Sort by file modification time, newest first
    const sorted = files
      .map((f) => ({ name: f, mtime: fs.statSync(path.join(contentDir, f)).mtimeMs }))
      .sort((a, b) => b.mtime - a.mtime);

    const latestSlug = sorted[0].name.replace(".md", "");
    console.log(`No slug provided. Using most recent post: ${latestSlug}\n`);
    return run(latestSlug);
  }

  return run(slug);
}

async function run(slug: string) {
  console.log("=== Google Business Profile Post ===\n");

  // Read blog post
  const post = readBlogPost(slug);
  console.log(`Blog post: ${post.title}`);
  console.log(`URL: ${post.url}\n`);

  // Build summary
  const summary = buildSummary(post.title, post.excerpt);
  console.log(`Summary (${summary.length} chars):\n${summary}\n`);

  // Authenticate
  console.log("Authenticating with Google...");
  const auth = getAuthClient();

  // Discover account & location
  const account = await listAccounts(auth);
  const location = await listLocations(auth, account);

  // Create post
  const result = await createLocalPost(auth, account, location, summary, post.url);
  console.log("\nPost details:", JSON.stringify(result, null, 2));
}

main().catch((err) => {
  console.error("Error posting to GBP:", err.message || err);
  process.exit(1);
});
