import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import readingTime from "reading-time";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  categories: string[];
  tags: string[];
  featuredService: string | null;
  featuredTown: string | null;
  published: boolean;
  readingTime: number;
  content: string;
  htmlContent: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function markdownToHtml(markdown: string): string {
  const result = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .processSync(markdown);
  return String(result);
}

let cachedPosts: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cachedPosts) return cachedPosts;

  if (!fs.existsSync(BLOG_DIR)) {
    cachedPosts = [];
    return cachedPosts;
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));

  const posts = files
    .map((filename) => {
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      if (!data.published) return null;

      const stats = readingTime(content);
      const htmlContent = markdownToHtml(content);

      return {
        slug: data.slug || filename.replace(/\.md$/, ""),
        title: data.title || "Untitled",
        date: data.date || "",
        excerpt: data.excerpt || "",
        categories: data.categories || [],
        tags: data.tags || [],
        featuredService: data.featuredService || null,
        featuredTown: data.featuredTown || null,
        published: data.published !== false,
        readingTime: Math.ceil(stats.minutes),
        content,
        htmlContent,
      } as BlogPost;
    })
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  cachedPosts = posts;
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllCategories(): string[] {
  const cats = new Set<string>();
  for (const post of getAllPosts()) {
    for (const c of post.categories) cats.add(c);
  }
  return Array.from(cats).sort();
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const t of post.tags) tags.add(t);
  }
  return Array.from(tags).sort();
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((p) =>
    p.categories.some((c) => c.toLowerCase() === category.toLowerCase())
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllPosts().filter((p) =>
    p.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getRecentPosts(count: number): BlogPost[] {
  return getAllPosts().slice(0, count);
}

export function getRelatedPosts(slug: string, count: number): BlogPost[] {
  const post = getPostBySlug(slug);
  if (!post) return [];

  const others = getAllPosts().filter((p) => p.slug !== slug);

  const scored = others.map((p) => {
    let score = 0;
    // Shared tags
    for (const t of p.tags) {
      if (post.tags.includes(t)) score += 3;
    }
    // Same featured service
    if (p.featuredService && p.featuredService === post.featuredService) score += 2;
    // Same featured town
    if (p.featuredTown && p.featuredTown === post.featuredTown) score += 2;
    // Shared categories
    for (const c of p.categories) {
      if (post.categories.includes(c)) score += 1;
    }
    return { post: p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((s) => s.post);
}
