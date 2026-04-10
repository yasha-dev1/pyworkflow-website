"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // For now, store in a simple way - you can replace this with your preferred
    // newsletter service (Buttondown, Mailchimp, ConvertKit, etc.)
    try {
      // Placeholder: replace with your newsletter API endpoint
      // Example for Buttondown: https://api.buttondown.email/v1/subscribers
      // Example for ConvertKit: https://api.convertkit.com/v3/forms/{form_id}/subscribe
      console.log("Newsletter signup:", email);

      // Simulate success for now
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="newsletter" className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center md:px-16">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[300px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
          </div>

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Stay in the <span className="gradient-text">loop</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-zinc-400">
              Get updates on new releases, tutorials, and tips for building better workflows. No spam, unsubscribe anytime.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
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
                You&apos;re subscribed! Check your inbox for a confirmation.
              </p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
