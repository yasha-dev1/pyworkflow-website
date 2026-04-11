"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getBlogPosts, formatDate } from "@/lib/blog";

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Blog Header */}
        <div className="border-b border-white/10 pt-32 pb-12 md:pb-16">
          <div className="mx-auto max-w-6xl px-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white mb-4">
              Blog
            </h1>
            <p className="text-lg text-zinc-400 max-w-2xl">
              Read tutorials, best practices, and insights on building distributed workflows with PyWorkflow.
            </p>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-400 text-lg">
                  No blog posts yet. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
                  >
                    {/* Featured Badge */}
                    {post.metadata.featured && (
                      <div className="flex items-start">
                        <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300 border border-blue-500/20 font-semibold">
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Tags */}
                    {post.metadata.tags && post.metadata.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.metadata.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-block rounded-full bg-white/5 px-2 py-1 text-xs text-zinc-400 border border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition line-clamp-2">
                      {post.metadata.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="line-clamp-3 text-sm text-zinc-400 flex-1">
                      {post.metadata.excerpt}
                    </p>

                    {/* Footer Meta */}
                    <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-zinc-500">
                      <div className="flex items-center gap-2">
                        <span>{post.metadata.author}</span>
                        <span>•</span>
                        <time dateTime={post.metadata.date}>
                          {formatDate(post.metadata.date)}
                        </time>
                      </div>
                      {post.metadata.readingTime && (
                        <span>{post.metadata.readingTime} min</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-white/10 bg-white/[0.02] py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest tutorials and insights on distributed workflows.
            </p>
            <Link
              href="#newsletter"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Subscribe to Newsletter
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 12L10 8L6 4" />
              </svg>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
