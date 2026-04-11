"use client";

import { useState } from "react";

export function BlogPostNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      // Placeholder: replace with your newsletter API endpoint
      console.log("Blog newsletter signup:", email);

      // Simulate success
      setStatus("success");
      setEmail("");

      // Reset after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="border-y border-white/10 py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02] px-6 py-12 md:px-8">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-0 top-0 h-[200px] w-[300px] rounded-full bg-blue-500/10 blur-[80px]" />
          </div>

          <div className="relative">
            <h3 className="text-2xl font-bold tracking-tight">
              Get more insights like this
            </h3>
            <p className="mt-2 text-zinc-400">
              Subscribe to our newsletter for tutorials, best practices, and updates on PyWorkflow.
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
              <p className="mt-3 text-sm text-green-400">
                ✓ You're subscribed! Check your inbox for a confirmation.
              </p>
            )}
            {status === "error" && (
              <p className="mt-3 text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
