import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getBlogPosts();
  
  const blogRoutes = blogPosts.map((post) => ({
    url: `https://pyworkflow.dev/blog/${post.slug}`,
    lastModified: new Date(post.metadata.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://pyworkflow.dev",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: "https://pyworkflow.dev/blog",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...blogRoutes,
  ];
}
