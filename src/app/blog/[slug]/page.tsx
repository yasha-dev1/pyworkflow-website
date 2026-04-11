import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogNewsletter } from "@/components/BlogNewsletter";
import { getBlogPosts, getBlogPost, formatDate, getRelatedBlogPosts } from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";
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
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  const baseUrl = "https://pyworkflow.dev";
  const url = `${baseUrl}/blog/${slug}`;

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const relatedPosts = getRelatedBlogPosts(slug, 3);

  if (!post) {
    notFound();
  }

  const renderedContent =
    typeof post.content === "string" ? await renderMarkdown(post.content) : "";

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
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: renderedContent }}
              />
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
