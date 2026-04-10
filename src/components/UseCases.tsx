const useCases = [
  {
    title: "User Onboarding",
    description: "Multi-step onboarding flows with timed emails, verification checks, and progressive engagement sequences.",
    example: "Welcome email → wait 1 day → tips email → wait 3 days → survey",
  },
  {
    title: "Order Processing",
    description: "End-to-end order pipelines handling payment, inventory, fulfillment, and customer notifications.",
    example: "Validate → charge → reserve inventory → ship → notify",
  },
  {
    title: "ETL & Data Pipelines",
    description: "Extract, transform, and load data across systems with automatic retry on transient failures.",
    example: "Extract API → transform → validate → load DB → report",
  },
  {
    title: "Approval Workflows",
    description: "Human-in-the-loop workflows that pause for manual approvals via webhooks or external events.",
    example: "Submit request → await approval → provision → notify",
  },
  {
    title: "Scheduled Jobs",
    description: "Recurring workflows on cron, interval, or calendar schedules with built-in scheduling.",
    example: "Every Monday 9am → generate report → email team",
  },
  {
    title: "Drip Campaigns",
    description: "Multi-touch marketing sequences with precise timing, conditions, and personalization.",
    example: "Sign up → wait 2h → email 1 → wait 3d → email 2",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built for <span className="gradient-text">real-world</span> use cases
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            From simple automations to complex multi-step business processes, PyWorkflow handles it all.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              <h3 className="mb-2 text-lg font-semibold text-white">{uc.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-zinc-400">{uc.description}</p>
              <div className="rounded-lg bg-white/5 px-3 py-2">
                <code className="text-xs text-zinc-500">{uc.example}</code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
