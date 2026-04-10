"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <span className="gradient-text">PyWorkflow</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm text-zinc-400 transition hover:text-white">
            Features
          </a>
          <a href="#use-cases" className="text-sm text-zinc-400 transition hover:text-white">
            Use Cases
          </a>
          <a href="#how-it-works" className="text-sm text-zinc-400 transition hover:text-white">
            How It Works
          </a>
          <a href="#community" className="text-sm text-zinc-400 transition hover:text-white">
            Community
          </a>
          <a
            href="https://docs.pyworkflow.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-400 transition hover:text-white"
          >
            Docs
          </a>
          <a
            href="https://github.com/QualityUnit/pyworkflow"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:border-white/25 hover:bg-white/5"
          >
            <GitHubIcon />
            GitHub
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-zinc-400 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#0a0a0a] px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            <a href="#features" onClick={() => setMobileOpen(false)} className="text-sm text-zinc-400 hover:text-white">Features</a>
            <a href="#use-cases" onClick={() => setMobileOpen(false)} className="text-sm text-zinc-400 hover:text-white">Use Cases</a>
            <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-sm text-zinc-400 hover:text-white">How It Works</a>
            <a href="#community" onClick={() => setMobileOpen(false)} className="text-sm text-zinc-400 hover:text-white">Community</a>
            <a href="https://docs.pyworkflow.dev" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white">Docs</a>
            <a href="https://github.com/QualityUnit/pyworkflow" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-400 hover:text-white">GitHub</a>
          </div>
        </div>
      )}
    </header>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}
