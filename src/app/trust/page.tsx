import evalResults from "../../../eval/results.json";

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

export default function TrustPage() {
  const generatedAt = new Date(evalResults.generatedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-16">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-wide text-neon-cyan uppercase">
          How this works
        </h1>
        <p className="mt-2 text-muted">
          The assistant is built to be provably non-hallucinating, not just
          claimed to be.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="font-display text-lg font-bold tracking-wide text-neon-magenta uppercase">
          The approach
        </h2>
        <p className="text-foreground/90">
          Every product fact the assistant can state — specs, prices,
          features — comes from the same 18-item catalog that powers this
          site&apos;s product pages. The full catalog is given to the model
          as context on every request, so nothing is left out by a search
          step and nothing can be invented that isn&apos;t already in the
          data.
        </p>
        <p className="text-foreground/90">
          The assistant is explicitly instructed to decline anything the
          catalog doesn&apos;t cover — shipping, returns, availability,
          general questions unrelated to Fractal Pattern products — and to
          suggest contacting a person instead of guessing.
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-bold tracking-wide text-neon-magenta uppercase">
          Measured results
        </h2>
        <p className="text-sm text-muted">
          Last run: {generatedAt} · {evalResults.totalQuestions} test
          questions
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="neon-border rounded-lg bg-surface p-6">
            <p className="text-sm text-muted">Citation accuracy</p>
            <p className="neon-text-cyan text-3xl font-bold">
              {formatPercent(evalResults.citationAccuracy)}
            </p>
            <p className="mt-1 text-sm text-muted">
              Factual questions answered correctly from catalog data.
            </p>
          </div>
          <div className="neon-border rounded-lg bg-surface p-6">
            <p className="text-sm text-muted">Refusal correctness</p>
            <p className="neon-text-magenta text-3xl font-bold">
              {formatPercent(evalResults.refusalCorrectness)}
            </p>
            <p className="mt-1 text-sm text-muted">
              Out-of-scope questions correctly declined.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="font-display text-lg font-bold tracking-wide text-neon-magenta uppercase">
          The test questions
        </h2>
        {evalResults.results.map((result) => (
          <div
            key={result.id}
            className="neon-border rounded-lg bg-surface p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs font-medium tracking-wide text-muted uppercase">
                {result.type === "grounded"
                  ? "Grounded fact check"
                  : "Out-of-scope refusal check"}
              </span>
              <span
                className={
                  result.passed
                    ? "rounded-full border border-neon-green/60 bg-neon-green/10 px-2 py-0.5 text-xs font-medium text-neon-green"
                    : "rounded-full border border-neon-red/60 bg-neon-red/10 px-2 py-0.5 text-xs font-medium text-neon-red"
                }
              >
                {result.passed ? "Pass" : "Fail"}
              </span>
            </div>
            <p className="font-medium text-foreground">{result.question}</p>
            <p className="mt-2 text-sm whitespace-pre-wrap text-muted">
              {result.response}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
