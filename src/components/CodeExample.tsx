export function CodeExample() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Just <span className="gradient-text">Python</span>. No YAML. No DSLs.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-400">
              Define workflows with decorators and async functions you already know. Steps are retryable,
              workflows are durable, and sleeps release all resources.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Decorate functions as @workflow and @step",
                "Await steps like regular async calls",
                "Sleep for days without consuming resources",
                "Automatic retry on transient failures",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-300">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="glow rounded-xl">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]">
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-zinc-500">onboarding.py</span>
              </div>
              <pre className="overflow-x-auto p-5 text-sm leading-relaxed">
                <code>{`from pyworkflow import workflow, step, start, sleep

@step()
async def send_welcome_email(user_id: str):
    print(f"Sending welcome email to {user_id}")
    return f"Email sent to {user_id}"

@step()
async def send_tips_email(user_id: str):
    print(f"Sending tips email to {user_id}")
    return f"Tips sent to {user_id}"

@workflow()
async def onboarding(user_id: str):
    await send_welcome_email(user_id)
    await sleep("1d")  # Sleeps 1 day, no resources held
    await send_tips_email(user_id)
    return "Onboarding complete"

run_id = start(onboarding, user_id="user_123")`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
