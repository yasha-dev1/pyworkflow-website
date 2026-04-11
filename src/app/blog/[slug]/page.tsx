import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getBlogPosts, getBlogPost } from "@/lib/blog";
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

  return {
    title: `${post.metadata.title} - PyWorkflow Blog`,
    description: post.metadata.description,
    authors: [{ name: post.metadata.author }],
    keywords: post.metadata.tags || [],
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      url: `https://pyworkflow.dev/blog/${params.slug}`,
      type: "article",
      publishedTime: post.metadata.publishedAt,
      authors: [post.metadata.author],
      tags: post.metadata.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.description,
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-block mb-8 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            ← Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12 border-b border-slate-700 pb-8">
            {/* Category */}
            {post.metadata.category && (
              <span className="inline-block mb-4 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                {post.metadata.category}
              </span>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.metadata.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-slate-300 mb-6">
              {post.metadata.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span>{post.metadata.author}</span>
              <span>•</span>
              <time dateTime={post.metadata.publishedAt}>
                {new Date(post.metadata.publishedAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </time>
              {post.metadata.readingTime && (
                <>
                  <span>•</span>
                  <span>{post.metadata.readingTime} min read</span>
                </>
              )}
            </div>

            {/* Tags */}
            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-slate-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-code:text-slate-200 prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700">
            {post.content}
          </div>

          {/* Navigation */}
          <nav className="mt-16 pt-8 border-t border-slate-700 flex justify-between">
            <Link
              href="/blog"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              ← All Posts
            </Link>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
