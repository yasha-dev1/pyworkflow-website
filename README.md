# PyWorkflow Website

The official marketing website for [PyWorkflow](https://github.com/QualityUnit/pyworkflow) - a distributed, durable workflow orchestration framework for Python. Built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

**Live site**: [pyworkflow.dev](https://pyworkflow.dev)

---

## What is This Repo?

This is the **marketing website**, not the PyWorkflow library itself. It includes:

- **Marketing homepage** - hero, features, code example, use cases, how-it-works, community, and newsletter sections
- **Blog system** - file-based blog supporting .json, .md, and .mdx posts with Markdown rendering via marked and syntax highlighting via shiki
- **SEO infrastructure** - dynamic sitemap, robots.txt, Open Graph tags, Twitter Cards, and JSON-LD structured data

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Markdown | marked + shiki (syntax highlighting) |
| Blog content | JSON / Markdown / MDX files in src/content/blog/ |
| Deployment | Vercel (auto-deploy on push to main) |

---

## Project Structure

    src/
    app/
        blog/
            page.tsx              # Blog index page
            [slug]/page.tsx       # Individual blog post (dynamic route)
        layout.tsx                # Root layout - global metadata, fonts, JSON-LD
        page.tsx                  # Homepage
        globals.css               # Global styles
        sitemap.ts                # Dynamic sitemap generation
        robots.ts                 # robots.txt
    components/
        Header.tsx                # Site header with navigation
        Hero.tsx                  # Homepage hero section
        Features.tsx              # Features grid (6 features)
        CodeExample.tsx           # Interactive code demo section
        HowItWorks.tsx            # 3-step getting started section
        UseCases.tsx              # Use case cards
        Community.tsx             # GitHub / Discord / Docs links
        Newsletter.tsx            # Email newsletter signup
        BlogCard.tsx              # Blog post preview card
        BlogNewsletter.tsx        # Newsletter CTA on blog index
        BlogPostNewsletter.tsx    # Newsletter CTA on individual posts
        CopyButton.tsx            # Copy-to-clipboard button
        Footer.tsx                # Site footer
    content/
        blog/                     # Blog post files (JSON / MD / MDX)
            getting-started.json
            advanced-workflow-patterns.md
            error-handling-and-recovery.md
    lib/
        blog.ts                   # Blog utility functions (read, sort, filter posts)
        markdown.ts               # Markdown to HTML renderer (marked + shiki)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

    git clone https://github.com/yasha-dev1/pyworkflow-website.git
    cd pyworkflow-website
    npm install

### Development

    npm run dev
    # Visit http://localhost:3000

### Build

    npm run build
    npm start

### Lint

    npm run lint

---

## Blog System

Blog posts live in src/content/blog/ and support three formats:

### JSON (recommended for simple posts)

Fields: id, slug, title, excerpt (150-160 chars), author, date (YYYY-MM-DD), readingTime (minutes), tags (array), featured (boolean), content (Markdown string).

### Markdown with frontmatter (.md / .mdx)

Use YAML frontmatter with the same fields (title, excerpt, author, date, tags, featured), then write the post body in Markdown below the --- delimiter.

### Blog utility functions (src/lib/blog.ts)

| Function | Description |
|---|---|
| getBlogPosts() | All posts sorted by date (newest first) |
| getBlogPost(slug) | Single post by slug |
| getFeaturedBlogPosts(limit) | Featured posts only |
| getBlogPostsByTag(tag) | Posts filtered by tag |
| getAllBlogTags() | All unique tags |
| getRelatedBlogPosts(slug, limit) | Related posts by shared tags |
| formatDate(dateString) | Human-readable date formatting |

For detailed content authoring guidelines, see BLOG_CONTENT_GUIDE.md.
For technical blog setup details, see BLOG_SETUP.md.

---

## SEO

- **Sitemap**: auto-generated at /sitemap.xml - includes homepage and all blog posts
- **robots.txt**: configured at /robots.txt via src/app/robots.ts
- **Metadata**: each page exports Next.js Metadata with title, description, Open Graph, and Twitter Card fields
- **JSON-LD**: SoftwareApplication schema on the homepage; BlogPosting schema on individual blog posts

---

## Deployment

The site deploys automatically to Vercel on every push to main.

To publish a new blog post:

    git add src/content/blog/your-post.json
    git commit -m "blog: add your-post"
    git push origin main

The post goes live immediately after the Vercel build completes.

---

## Contributing

1. Fork the repo and create a feature branch: git checkout -b feat/your-feature
2. Make your changes
3. Open a pull request against main

---

## License

MIT License - Copyright 2026 Yasha Boroumand. See LICENSE for details.

---

## Links

- **PyWorkflow library**: github.com/QualityUnit/pyworkflow
- **Docs**: docs.pyworkflow.dev
- **Discord**: discord.gg/RN3U7rkNuz
- **Website**: pyworkflow.dev
