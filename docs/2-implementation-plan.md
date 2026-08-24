# 2. Implementation Plan

Status: draft — living document, updated as work progresses. Check off steps as they're completed.

Builds on [`0-product-discovery.md`](./0-product-discovery.md) and [`1-architecture.md`](./1-architecture.md). Phases are ordered by dependency — each one assumes the previous is done, so build top to bottom rather than jumping ahead.

## Phase 0 — Project scaffolding

Get something running and deployed before building anything real on top of it.

- [x] `create-next-app` with TypeScript, Tailwind, App Router.
- [x] Bare route structure: home, category listing, `[slug]` product detail — placeholder content only.
- [x] Push to GitHub, connect to Vercel, confirm a live deploy works end to end.

## Phase 1 — Brand & content foundations

Decisions that everything else (copy, imagery, data schema) depends on — do these before authoring real content.

- [x] Finalize brand name and tier naming convention — **Fractal Pattern**, tiers **Essential / Pro / Elite**.
- [x] Decide the Canva vs. Unsplash image split — **Unsplash for product photos, Canva for brand assets only**.
- [ ] Define the per-category product data schema (a laptop's spec fields differ from a desk's) — this is the `1-architecture.md` "not yet decided" item that blocks catalog authoring.

## Phase 2 — Product catalog

The dataset the whole site and chatbot are built around.

- [ ] Author the category/tier structure (6 categories × 3 tiers).
- [ ] Write real structured specs + editorial copy for a first small batch (e.g. one full category) to validate the schema before scaling up.
- [ ] Once the schema holds up, author the remaining SKUs to reach the ~30–40 target.
- [ ] Source/assign images per product per the Phase 1 decision.

## Phase 3 — Site build

Turn the catalog into the actual browsable site.

- [ ] Product detail pages: render real specs from the catalog data (SSG).
- [ ] Category listing pages with comparison-friendly layout (this is a spec-sheet site, not a store — emphasize comparability).
- [ ] Home page and basic nav/footer.
- [ ] Responsive pass and basic accessibility check.

## Phase 4 — Chatbot backend

The core differentiator — build this once there's real catalog data to ground it in.

- [ ] Get a free Gemini API key, store it as a Vercel env var (never committed).
- [ ] `/api/chat` route wired to Gemini via the Vercel AI SDK.
- [ ] System prompt: inject the full catalog, instruct answer-only-from-data + cite product/spec IDs.
- [ ] Refusal behavior: explicit instruction + test that out-of-scope questions (shipping, availability, etc.) get declined with a "talk to a human" suggestion instead of an invented answer.
- [ ] Setup builder behavior: ask about use case/space/budget, recommend a matched bundle across categories with a stated reason per item (per the discovery doc's chatbot job description).
- [ ] Chat widget UI using `useChat()`, embedded on the site.
- [ ] Guardrails: `max_tokens` cap, per-IP/session rate limiting.

## Phase 5 — Groundedness evaluation

Prove the anti-hallucination claim rather than just asserting it — this is the standout feature, so budget real time here.

- [ ] Hand-author an eval set: known-answerable questions (with the correct grounded answer) + intentionally out-of-scope questions (should trigger refusal).
- [ ] Eval script that runs the set against the deployed chat route and checks citation accuracy + refusal correctness.
- [ ] "Trust" / "how this works" page on the site surfacing the eval results.

## Phase 6 — Polish & hardening

- [ ] Cross-check every chatbot claim path against Phase 5 results; fix prompt issues the eval surfaces.
- [ ] Visual polish pass once content is final (spacing, imagery consistency, tier presentation).
- [ ] Confirm Gemini free-tier limits hold up under expected demo/grading traffic; add a fallback path if not.
- [ ] Final deploy check on Vercel.

## Phase 7 — Write-up

- [ ] Capstone documentation/report drawing on `0-product-discovery.md`, `1-architecture.md`, and the Phase 5 eval results as evidence.
- [ ] Demo script: a few example chatbot conversations that show the setup-builder behavior and the refusal behavior clearly.

## Notes

- Phases 1–2 (brand/schema/catalog) are the actual bottleneck — everything from Phase 3 onward is mechanical once real data exists. Don't start Phase 3 with placeholder data if it can be avoided.
- Phase 4 and 5 should be built together, not sequentially — writing eval questions while building the prompt catches ungrounded answers immediately instead of after the fact.
