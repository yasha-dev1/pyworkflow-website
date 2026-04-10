export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <span className="text-lg font-bold gradient-text">PyWorkflow</span>
            <p className="mt-1 text-sm text-zinc-500">
              Distributed, durable workflow orchestration for Python.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://docs.pyworkflow.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              Docs
            </a>
            <a
              href="https://github.com/QualityUnit/pyworkflow"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://discord.gg/RN3U7rkNuz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              Discord
            </a>
            <a
              href="#newsletter"
              className="text-sm text-zinc-500 transition hover:text-white"
            >
              Newsletter
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-zinc-600">
            Built by the{" "}
            <a
              href="https://github.com/QualityUnit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 transition hover:text-white"
            >
              QualityUnit
            </a>{" "}
            team. Open source under the MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
}
