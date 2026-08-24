# 1. Architecture

Status: draft — living document, updated as decisions are made.

Builds on decisions and open questions from [`0-product-discovery.md`](./0-product-discovery.md).

## Stack overview

- **Framework:** Next.js (App Router, TypeScript) — single project for both the content site and the chatbot backend, so no separate server to deploy.
- **Styling:** Tailwind CSS.
- **Hosting:** Vercel — zero-config for Next.js, handles both static/SSG product pages and the serverless API route in one deploy.
- **Chatbot model:** Google Gemini API (`gemini-flash-lite-latest`), called via the Vercel AI SDK (`ai` + `@ai-sdk/google`). Chosen over the standard `flash` models specifically for its much higher free-tier daily quota (~1,000+/day vs. only 20/day for `gemini-3.6-flash` — discovered by exhausting it during manual testing).

### Why not X

- **Next.js pure React (Vite) split:** considered, but a client-only SPA has no server-side code to hold the model API key, requiring a separate backend deploy (Express on Render/Railway/Fly.io) plus CORS. Next.js gives the same result in one project.
- **GitHub Pages:** static-only hosting, can't run the API route that keeps the key server-side. Would require splitting the chatbot endpoint onto a separate serverless host (Cloudflare Workers, Netlify Functions) for no real benefit over just using Vercel.
- **Claude API:** was the original "confirmed direction" in the discovery doc, but it's paid/usage-billed. Not a security risk if kept server-side, but a public capstone demo has no natural spend ceiling without active guardrails. Swapped for Gemini's free tier to remove that risk entirely; Claude remains a drop-in swap later if quality demands it (same architecture, different SDK call).
- **Full RAG (vector DB):** unnecessary at the target catalog size (18 SKUs). Context-stuffing the whole catalog into the system prompt is simpler and easier to defend as "nothing dropped by retrieval" — revisit only if the catalog grows well past this size.

## Frontend

- Next.js App Router pages for the marketing/editorial site: home, category listing, product detail pages.
- Product detail pages statically generated (SSG) from the catalog data at build time.
- Chat widget is a client component using the Vercel AI SDK's `useChat()` hook (message state, streaming, loading/error handling) talking to the API route below.

## Catalog data

- Stored as typed TypeScript/JSON data files in the repo — no CMS or database needed at this size.
- Each product record needs a stable ID, category, tier, structured specs, and short editorial copy, so the chatbot can cite an exact record per claim.
- Data layer is just typed accessors over these files (e.g. `getProductById`, `getProductsByCategory`) — no query engine required.

## Chatbot backend

- Single Next.js API route (e.g. `POST /api/chat`).
- Uses the Vercel AI SDK's `streamText({ model: google('gemini-flash-lite-latest'), system, messages })`, streaming the response back to `useChat()`.
- **Context strategy:** the full structured catalog (18 SKUs — specs + copy) is serialized into the system prompt. No vector store, no retrieval step.
- **Groundedness mechanism:**
  - System prompt instructs the model to answer only from the supplied catalog data, and to cite the product/spec ID backing each claim.
  - Refusal behavior: if the answer isn't in the catalog data (shipping policy, real-world availability, anything off-scope), the model says so and suggests contacting a human, rather than inventing an answer.
  - Citations returned by the model are validated server-side against the actual catalog records before being trusted/displayed — this is what makes the accuracy claim measurable rather than just asserted.
- **Guardrails:** `maxOutputTokens: 1024` per response; a simple in-memory per-IP rate limiter (5 requests/minute) on the API route — note this protects against rapid abuse but doesn't raise Gemini's own daily quota; keep the system prompt scoped strictly to product selection (no general-purpose assistant behavior), per the discovery doc's non-goals.

## Evaluation (groundedness metric)

- Small hand-authored eval set: test questions with known-correct grounded answers, plus a set of intentionally out-of-scope questions that should trigger refusal.
- Eval script runs the eval set against the deployed chat route and reports citation accuracy (claims traceable to catalog data) and refusal correctness (out-of-scope questions correctly declined).
- Results surfaced on a "trust" / "how this works" page on the site itself, per the discovery doc's plan.

## Open questions / not yet decided

- How eval results get rendered on the trust page (eval set/script format is decided — see `eval/questions.ts` and `eval/run.ts`).
- Visual identity (logo, color palette, typography) — brand name (Fractal Pattern) and tier naming (Essential/Pro/Elite) are finalized.
- Image sourcing: Canva vs. Unsplash split (carried over from discovery doc, still open).

## Next steps

- Define the per-category product data schema and author a first pass at real SKUs.
- Scaffold the Next.js project: pages, Tailwind setup, `/api/chat` route wired to Gemini via the Vercel AI SDK.
- Write the system prompt (catalog injection + refusal rules) and a first small eval set to validate groundedness end-to-end before building out the full catalog.
