import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ReactNode } from "react";

export interface BlogMetadata {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  category?: string;
  tags?: string[];
  readingTime?: number;
}

export interface BlogPost {
  slug: string;
  metadata: BlogMetadata;
  content: ReactNode;
}

const BLOG_POSTS_DIR = path.join(process.cwd(), "src/content/blog");

/**
 * Get all blog posts
 */
export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_POSTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_POSTS_DIR).filter((file) => {
    return file.endsWith(".mdx") || file.endsWith(".md");
  });

  return files.map((file) => {
    const slug = file.replace(/\.(mdx|md)$/, "");
    const filePath = path.join(BLOG_POSTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      metadata: {
        title: data.title || "Untitled",
        description: data.description || "",
        author: data.author || "PyWorkflow Team",
        publishedAt: data.publishedAt || new Date().toISOString(),
        category: data.category,
        tags: data.tags || [],
        readingTime: data.readingTime || calculateReadingTime(content),
      },
      content: content as ReactNode,
    };
  });
}

/**
 * Get a single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost | null {
  const posts = getBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

/**
 * Calculate reading time in minutes
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
