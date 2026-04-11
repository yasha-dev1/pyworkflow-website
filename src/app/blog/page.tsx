import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { getBlogPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | PyWorkflow - Distributed Workflow Orchestration",
  description:
    "Learn about distributed workflow orchestration, Python automation, and best practices for building reliable systems with PyWorkflow.",
  keywords: [
    "workflow blog",
    "tutorials",
    "distributed systems",
    "python",
    "orchestration",
    "celery",
    "event sourcing",
  ],
  openGraph: {
    title: "Blog | PyWorkflow",
    description:
      "Learn about distributed workflow orchestration, Python automation, and best practices for building reliable systems with PyWorkflow.",
    url: "https://pyworkflow.dev/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | PyWorkflow",
    description:
      "Learn about distributed workflow orchestration, Python automation, and best practices for building reliable systems with PyWorkflow.",
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Blog Header */}
        <section className="border-b border-white/10 pt-32 pb-12 md:pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                PyWorkflow Blog
              </h1>
              <p className="mt-4 text-lg text-zinc-400">
                Tutorials, best practices, and insights about distributed workflow orchestration, Python automation, and building reliable systems.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-400">No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <BlogCard
                    key={post.slug}
                    slug={post.slug}
                    title={post.metadata.title}
                    excerpt={post.metadata.excerpt}
                    date={post.metadata.date}
                    author={post.metadata.author}
                    readingTime={post.metadata.readingTime}
                    tags={post.metadata.tags}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-white/10 py-12 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 text-center md:p-12">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to build better workflows?
              </h2>
              <p className="mt-4 text-zinc-400">
                Get started with PyWorkflow today and explore the power of distributed, durable workflow orchestration.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row justify-center">
                <Link
                  href="/"
                  className="rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/5"
                >
                  Back to Home
                </Link>
                <a
                  href="https://docs.pyworkflow.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  View Documentation
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
