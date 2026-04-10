const steps = [
  {
    step: "1",
    title: "Install & Scaffold",
    description: "Install PyWorkflow with pip and scaffold your project in seconds with the CLI.",
    code: "pip install pyworkflow-engine\npyworkflow quickstart",
  },
  {
    step: "2",
    title: "Define Your Workflows",
    description: "Write workflows and steps using simple Python decorators and async functions.",
    code: "@workflow()\nasync def my_flow(data):\n    result = await my_step(data)\n    return result",
  },
  {
    step: "3",
    title: "Run & Scale",
    description: "Start the worker and run your workflows. Scale horizontally by adding more workers.",
    code: "pyworkflow worker run\npyworkflow workflows run my_flow \\\n  --input '{\"key\": \"value\"}'",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Up and running in{" "}
            <span className="gradient-text">5 minutes</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            From zero to production-ready workflows in three simple steps.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {steps.map((s) => (
            <div
              key={s.step}
              className="grid items-center gap-8 rounded-xl border border-white/10 bg-white/[0.02] p-6 md:grid-cols-2 md:p-8"
            >
              <div>
                <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-400">
                  {s.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold text-white">{s.title}</h3>
                <p className="text-zinc-400">{s.description}</p>
              </div>
              <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0d0d0d]">
                <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
                  <code className="text-zinc-300">{s.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
