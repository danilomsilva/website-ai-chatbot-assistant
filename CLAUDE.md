@AGENTS.md

## Project

Fractal Pattern — a fictional workspace-gear brand site (Next.js App Router,
TypeScript, Tailwind) with an AI setup-builder chatbot. See `docs/` for the
full story: `0-product-discovery.md` (what/why), `1-architecture.md` (stack
decisions), `2-implementation-plan.md` (phased build log, kept up to date).

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (also type-checks)
- `npm run eval` — runs `eval/run.ts` against a running `/api/chat` (needs
  the dev server up); prints pass/fail per question and writes
  `eval/results.json`, which the `/trust` page reads directly.

## Key files

- `src/lib/catalog/types.ts` — the `Product` schema (discriminated union per category).
- `src/lib/catalog/data/*.ts` — the 18 SKUs (one file per category, 3 tiers each).
- `src/lib/chat/systemPrompt.ts` — catalog injection + grounding/refusal rules.
- `src/app/api/chat/route.ts` — chat endpoint (Gemini via Vercel AI SDK).
- `eval/questions.ts` + `eval/run.ts` — groundedness eval suite.

## Gotchas

- **Gemini free-tier quota is per-model and easy to blow through.** `gemini-3.6-flash`
  caps at 20 requests/day on the free tier — exhausted it once during manual
  testing. Currently using `gemini-flash-lite-latest` (~1,000+/day). If you
  switch models, check the actual daily quota first, not just RPM.
- The `/api/chat` rate limiter (`src/lib/chat/rateLimit.ts`) is in-memory,
  per-serverless-instance — resets on cold start, not shared across
  instances. Fine for blunting casual abuse on a small demo, not real
  infra-level protection.
- Local `curl`/testing requests have no `x-forwarded-for` header, so they
  all share one rate-limit bucket (`"unknown"`). Don't fire off many manual
  test requests right before running `npm run eval`, or the eval's own
  requests will get false-negatived by 429s from your own prior testing.
- Never add Claude/Anthropic co-author trailers to commits in this repo — it's public.
