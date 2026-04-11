import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogMetadata {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category?: string;
  tags?: string[];
  readingTime?: number;
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  metadata: BlogMetadata;
  content: string;
}

const BLOG_POSTS_DIR = path.join(process.cwd(), "src/content/blog");

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_POSTS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_POSTS_DIR).filter((file) => {
    return file.endsWith(".mdx") || file.endsWith(".md") || file.endsWith(".json");
  });

  const posts = files.map((file) => {
    const slug = file.replace(/\.(mdx|md|json)$/, "");
    const filePath = path.join(BLOG_POSTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    if (file.endsWith(".json")) {
      // Handle JSON format
      const data = JSON.parse(fileContent);
      return {
        slug: data.slug || slug,
        metadata: {
          title: data.title || "Untitled",
          excerpt: data.excerpt || "",
          author: data.author || "PyWorkflow Team",
          date: data.date || new Date().toISOString(),
          tags: data.tags || [],
          readingTime: data.readingTime || calculateReadingTime(data.content),
          featured: data.featured || false,
        },
        content: data.content || "",
      };
    } else {
      // Handle MDX/MD format with frontmatter
      const { data, content } = matter(fileContent);
      return {
        slug,
        metadata: {
          title: data.title || "Untitled",
          excerpt: data.excerpt || data.description || "",
          author: data.author || "PyWorkflow Team",
          date: data.date || data.publishedAt || new Date().toISOString(),
          category: data.category,
          tags: data.tags || [],
          readingTime: data.readingTime || calculateReadingTime(content),
          featured: data.featured || false,
        },
        content,
      };
    }
  });

  // Sort by date descending (newest first)
  return posts.sort(
    (a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
  );
}

/**
 * Get a single blog post by slug
 */
export function getBlogPost(slug: string): BlogPost | null {
  const posts = getBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogPosts(limit: number = 3): BlogPost[] {
  const posts = getBlogPosts();
  return posts.filter((post) => post.metadata.featured).slice(0, limit);
}

/**
 * Get blog posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  const posts = getBlogPosts();
  return posts.filter((post) => post.metadata.tags?.includes(tag));
}

/**
 * Get all unique tags from blog posts
 */
export function getAllBlogTags(): string[] {
  const posts = getBlogPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.metadata.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Get related blog posts (by tags)
 */
export function getRelatedBlogPosts(slug: string, limit: number = 3): BlogPost[] {
  const posts = getBlogPosts();
  const currentPost = posts.find((p) => p.slug === slug);

  if (!currentPost) {
    return [];
  }

  const related = posts
    .filter((post) => post.slug !== slug)
    .filter((post) =>
      post.metadata.tags?.some((tag) => currentPost.metadata.tags?.includes(tag))
    )
    .slice(0, limit);

  return related;
}

/**
 * Calculate reading time in minutes
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
