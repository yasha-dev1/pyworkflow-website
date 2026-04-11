import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog - PyWorkflow",
  description:
    "Learn about distributed workflow orchestration, Python best practices, and PyWorkflow insights from our team.",
  openGraph: {
    title: "Blog - PyWorkflow",
    description:
      "Learn about distributed workflow orchestration, Python best practices, and PyWorkflow insights from our team.",
    url: "https://pyworkflow.dev/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Blog
            </h1>
            <p className="text-xl text-slate-300">
              Insights on distributed workflow orchestration, Python best practices, and PyWorkflow development.
            </p>
          </div>

          {/* Blog Posts Grid */}
          {sortedPosts.length > 0 ? (
            <div className="grid gap-8 md:gap-12">
              {sortedPosts.map((post) => (
                <article
                  key={post.slug}
                  className="group border border-slate-700 rounded-lg p-8 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 bg-slate-800/50 backdrop-blur"
                >
                  <div className="flex flex-col gap-3">
                    {/* Category Badge */}
                    {post.metadata.category && (
                      <span className="inline-block w-fit px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                        {post.metadata.category}
                      </span>
                    )}

                    {/* Title */}
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {post.metadata.title}
                      </h2>
                    </Link>

                    {/* Description */}
                    <p className="text-slate-300 text-lg">
                      {post.metadata.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 pt-4">
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
                      <div className="flex flex-wrap gap-2 pt-2">
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

                    {/* Read More Link */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-300 text-lg">
                No blog posts yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
