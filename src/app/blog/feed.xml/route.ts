import { getBlogPosts, formatDate } from "@/lib/blog";

export async function GET() {
  const baseUrl = "https://pyworkflow.dev";
  const posts = getBlogPosts();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>PyWorkflow Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Tutorials, best practices, and insights about distributed workflow orchestration, Python automation, and building reliable systems.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.metadata.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.metadata.excerpt)}</description>
      <author>PyWorkflow Team</author>
      ${post.metadata.tags?.map((tag) => `<category>${escapeXml(tag)}</category>`).join("\n      ")}
      <content:encoded><![CDATA[
        <p>${escapeXml(post.metadata.excerpt)}</p>
        <p><a href="${baseUrl}/blog/${post.slug}">Read full article</a></p>
      ]]></content:encoded>
    </item>
    `
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
