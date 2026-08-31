# Fractal Pattern

A content-rich product site for a fictional premium workspace brand, with an
AI chatbot that builds a matched setup (laptop + monitor + desk + chair)
based on a visitor's use case, space, and budget — and is built to be
**provably non-hallucinating**, not just claimed to be.

**Live demo:** https://website-ai-chatbot-assistant.vercel.app

[![Live demo](https://img.shields.io/badge/demo-Vercel-000?logo=vercel&logoColor=white)](https://website-ai-chatbot-assistant.vercel.app)
[![Trust page](https://img.shields.io/badge/citation%20%26%20refusal%20eval-100%25-brightgreen)](https://website-ai-chatbot-assistant.vercel.app/trust)
![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178c6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white)

## What makes this different

Most "AI chatbot on a website" projects stop at "I called an LLM API." This
one goes further: every factual claim the assistant makes is traceable to a
real catalog record, and a hand-authored evaluation suite measures that
claim instead of asserting it.

**Current eval results: 100% citation accuracy, 100% refusal correctness**
(see the live [`/trust`](https://website-ai-chatbot-assistant.vercel.app/trust)
page for the full breakdown, or run it yourself with `npm run eval`).

## How it works

- The full 18-SKU product catalog (6 categories × 3 tiers: Essential, Pro,
  Elite) is injected directly into the chatbot's system prompt — no vector
  database, no retrieval step, so nothing can be silently dropped or
  misretrieved.
- The system prompt instructs the model to answer only from that catalog
  data and to explicitly decline (and suggest contacting a human) for
  anything outside it — shipping, returns, unrelated topics, etc.
- An [eval suite](eval/questions.ts) of grounded fact-checks and
  out-of-scope refusal-checks runs against the live `/api/chat` route and
  scores both dimensions automatically.

Full architecture rationale (why Next.js, why Gemini, why not RAG) is in
[`docs/1-architecture.md`](docs/1-architecture.md).

## Tech stack

- **Framework:** Next.js (App Router, TypeScript), Tailwind CSS
- **Chatbot:** Google Gemini API via the [Vercel AI SDK](https://ai-sdk.dev/) (`ai` + `@ai-sdk/react` + `@ai-sdk/google`)
- **Hosting:** Vercel
- **Data:** typed TypeScript catalog files, no database

## Project structure

```
src/
  app/                    Next.js App Router pages
    api/chat/             chatbot API route
    products/[slug]/      product detail pages (SSG)
    category/[category]/  per-category spec comparison tables
    trust/                eval results page
  components/             Header, Footer, ChatWidget
  lib/
    catalog/              product schema, data, and accessors
    chat/                 system prompt + rate limiter
eval/
  questions.ts            the eval question set
  run.ts                  the eval runner (npm run eval)
docs/
  0-product-discovery.md  what this project is and why
  1-architecture.md       stack decisions and trade-offs
  2-implementation-plan.md  phased build log
```

## Running locally

```bash
npm install
```

Create `.env.local` with a free [Gemini API key](https://aistudio.google.com/apikey):

```
GOOGLE_GENERATIVE_AI_API_KEY=your-key-here
```

```bash
npm run dev
```

Open http://localhost:3000.

To run the groundedness eval against your local dev server:

```bash
npm run eval
```

## Non-goals

Not a real ecommerce store (no cart/checkout/payments) and not a
general-purpose assistant — the brand, products, and chatbot scope are all
deliberately fictional and narrow. See
[`docs/0-product-discovery.md`](docs/0-product-discovery.md) for the full
project rationale.
