import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PyWorkflow - Distributed, Durable Workflow Orchestration for Python",
  description:
    "Build sophisticated, long-running business processes with simple Python code. Distributed execution on Celery, event sourcing for durability, automatic failure recovery, and built-in scheduling.",
  keywords: [
    "python workflow",
    "workflow orchestration",
    "distributed workflows",
    "celery workflows",
    "python automation",
    "durable execution",
    "event sourcing python",
    "task orchestration",
    "pyworkflow",
    "workflow engine python",
  ],
  authors: [{ name: "QualityUnit" }],
  openGraph: {
    title: "PyWorkflow - Distributed, Durable Workflow Orchestration for Python",
    description:
      "Build sophisticated, long-running business processes with simple Python code. Distributed execution, event sourcing, automatic recovery.",
    url: "https://pyworkflow.dev",
    siteName: "PyWorkflow",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "PyWorkflow - Distributed, Durable Workflow Orchestration for Python",
    description:
      "Build sophisticated, long-running business processes with simple Python code. Distributed execution, event sourcing, automatic recovery.",
  },
  metadataBase: new URL("https://pyworkflow.dev"),
  alternates: {
    canonical: "https://pyworkflow.dev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PyWorkflow",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  description:
    "Distributed, durable workflow orchestration framework for Python. Build long-running business processes with simple Python code.",
  url: "https://pyworkflow.dev",
  author: {
    "@type": "Organization",
    name: "QualityUnit",
    url: "https://github.com/QualityUnit",
  },
  license: "https://opensource.org/licenses/MIT",
  programmingLanguage: "Python",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
