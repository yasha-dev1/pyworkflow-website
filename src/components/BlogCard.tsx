import Link from "next/link";
import { formatDate } from "@/lib/blog";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readingTime?: number;
  tags?: string[];
}

export function BlogCard({
  slug,
  title,
  excerpt,
  date,
  author,
  readingTime,
  tags,
}: BlogCardProps) {
  return (
    <article className="group flex flex-col gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.05]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Link
            href={`/blog/${slug}`}
            className="text-xl font-semibold text-white transition group-hover:text-blue-400"
          >
            {title}
          </Link>
        </div>
      </div>

      <p className="line-clamp-2 text-sm text-zinc-400">{excerpt}</p>

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300 border border-blue-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-zinc-500">
        <div className="flex items-center gap-4">
          <span>{author}</span>
          <span>{formatDate(date)}</span>
        </div>
        {readingTime && <span>{readingTime} min read</span>}
      </div>
    </article>
  );
}
