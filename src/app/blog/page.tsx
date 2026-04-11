import type { Metadata } from "next";
import BlogPage from "./blog-page";

export const metadata: Metadata = {
  title: "Blog - PyWorkflow",
  description:
    "Read tutorials, best practices, and insights on building distributed workflows with PyWorkflow.",
  keywords: [
    "workflow tutorials",
    "distributed systems",
    "python workflows",
    "best practices",
  ],
  openGraph: {
    title: "Blog - PyWorkflow",
    description:
      "Read tutorials, best practices, and insights on building distributed workflows with PyWorkflow.",
    url: "https://pyworkflow.dev/blog",
    type: "website",
    siteName: "PyWorkflow",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - PyWorkflow",
    description:
      "Read tutorials, best practices, and insights on building distributed workflows with PyWorkflow.",
  },
};

export default function Page() {
  return <BlogPage />;
}
