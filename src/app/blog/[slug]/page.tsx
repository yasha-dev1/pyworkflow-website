import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogNewsletter } from "@/components/BlogNewsletter";
import { getBlogPosts, getBlogPost, formatDate, getRelatedBlogPosts } from "@/lib/blog";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPost(params.slug);

  if (!post) {
    return {};
  }

  const baseUrl = "https://pyworkflow.dev";
  const url = `${baseUrl}/blog/${params.slug}`;

  return {
    title: `${post.metadata.title} | PyWorkflow Blog`,
    description: post.metadata.excerpt,
    authors: [{ name: post.metadata.author }],
    keywords: post.metadata.tags || [],
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.excerpt,
      url,
      type: "article",
      publishedTime: post.metadata.date,
      authors: [post.metadata.author],
      tags: post.metadata.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.excerpt,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);
  const relatedPosts = getRelatedBlogPosts(params.slug, 3);

  if (!post) {
    notFound();
  }

  // Structured data for blog post
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.excerpt,
    image: `https://pyworkflow.dev/og-image.png`,
    datePublished: post.metadata.date,
    dateModified: post.metadata.date,
    author: {
      "@type": "Person",
      name: post.metadata.author,
    },
    publisher: {
      "@type": "Organization",
      name: "PyWorkflow",
      logo: {
        "@type": "ImageObject",
        url: "https://pyworkflow.dev/logo.png",
      },
    },
    keywords: post.metadata.tags?.join(", "),
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Article Container */}
        <article className="border-b border-white/10">
          {/* Article Header */}
          <div className="border-b border-white/10 pt-32 pb-12 md:pb-16">
            <div className="mx-auto max-w-3xl px-6">
              {/* Back Link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white mb-8"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 2L4 8l6 6" />
                </svg>
                Back to Blog
              </Link>

              {/* Tags */}
              {post.metadata.tags && post.metadata.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300 border border-blue-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white mb-6">
                {post.metadata.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg text-zinc-400 mb-8">
                {post.metadata.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                <span>{post.metadata.author}</span>
                <span>•</span>
                <time dateTime={post.metadata.date}>
                  {formatDate(post.metadata.date)}
                </time>
                {post.metadata.readingTime && (
                  <>
                    <span>•</span>
                    <span>{post.metadata.readingTime} min read</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="py-12 md:py-20">
            <div className="mx-auto max-w-3xl px-6">
              <div className="prose prose-invert max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6
                prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-a:underline
                prose-strong:text-white prose-strong:font-semibold
                prose-code:text-blue-300 prose-code:bg-white/5 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
                prose-blockquote:border-l-4 prose-blockquote:border-blue-500/50 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-zinc-400
                prose-ul:text-zinc-300 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                prose-ol:text-zinc-300 prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6
                prose-li:mb-2
                prose-hr:border-white/10 prose-hr:my-8
              ">
                {post.content && typeof post.content === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: parseMarkdown(post.content) }} />
                ) : (
                  post.content
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Newsletter CTA */}
        <BlogNewsletter />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-12 md:py-20">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="group flex flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition">
                      {relatedPost.metadata.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-zinc-400">
                      {relatedPost.metadata.excerpt}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-zinc-500">
                      <span>{formatDate(relatedPost.metadata.date)}</span>
                      {relatedPost.metadata.readingTime && <span>{relatedPost.metadata.readingTime} min</span>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Back to Blog CTA */}
        <section className="border-t border-white/10 py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition hover:text-blue-300"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 2L4 8l6 6" />
              </svg>
              Back to All Articles
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/**
 * Simple markdown to HTML converter for content
 * Handles basic markdown syntax
 */
function parseMarkdown(content: string): string {
  let html = content;

  // Headers
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');

  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Code blocks
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

  // Inline code
  html = html.replace(/`(.*?)`/g, '<code>$1</code>');

  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  // Line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';

  // Lists
  html = html.replace(/^\* (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>');

  return html;
}
