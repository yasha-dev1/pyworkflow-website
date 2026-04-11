"use client";

import { useState } from "react";

export function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      // Placeholder: replace with your newsletter API endpoint
      console.log("Newsletter signup from blog:", email);
      setStatus("success");
      setEmail("");
      
      // Reset success message after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="border-y border-white/10 py-12 md:py-16">
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-8 md:p-12">
          <h3 className="text-2xl font-bold text-white">
            Get the latest PyWorkflow articles
          </h3>
          <p className="mt-2 text-zinc-400">
            Subscribe to our newsletter for tutorials, best practices, and updates on distributed workflow orchestration.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {status === "success" && (
            <p className="mt-4 text-sm text-green-400">
              ✓ You&apos;re subscribed! Check your inbox for a confirmation.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-sm text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
