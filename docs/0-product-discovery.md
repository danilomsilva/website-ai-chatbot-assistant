# 0. Product Discovery

Status: draft — living document, updated as decisions are made.

## What this project is

A senior/capstone project combining:

1. A content-rich product website (not an ecommerce store — no cart/checkout, no real payments/inventory). Products are presented like editorial/spec-sheet pages: detailed, comparable, well-photographed.
2. An AI chatbot embedded on the site that helps visitors pick the right product by asking about their needs/preferences and recommending from the real catalog — explaining trade-offs, not just listing specs.
3. A explicit focus on **provable groundedness**: the chatbot must be demonstrably non-hallucinating — every claim traceable to the catalog data, with a documented refusal behavior for anything out of scope. This is the intended standout feature of the project.

## The brand (fictional)

- A fictional premium brand that designs a full coherent workspace ecosystem, not a single product line.
- Positioning idea: "engineered setups, not just specs" — sells the idea that its products are designed to work together as a setup, not just as individual SKUs.
- No real brand names, logos, or trademarks are used anywhere in content or code.
- Brand name: **Fractal Pattern** (finalized).

## Product catalog (concept)

- Categories: laptops, desktops, monitors, desks, chairs, accessories (6 categories).
- Tiers per category: 3 tiers spanning budget → work → gaming/performance use cases, named **Essential / Pro / Elite** (finalized) rather than literally "Budget/Work/Gaming" repeated per category, so it reads as a product line rather than a filter.
- Target catalog size: **18 SKUs total** — 1 product per tier per category (6 categories × 3 tiers). Simpler than the originally floated 30–40, still enough for the chatbot to reason over real trade-offs, and every SKU stays hand-authored with genuine detail.
- Each product needs a detail page with real structured specs (not just marketing copy) so the chatbot has concrete facts to cite.
- Product photography: Unsplash stock photography (generic, realistic, no design work needed for ~30–40 SKUs). Canva is reserved for brand-level assets (logo, hero banners, trust-page graphics), not per-product images.

## Target audience (site visitor persona)

- A "premium public" buyer: someone furnishing/upgrading a work or gaming setup and willing to pay for quality, but who doesn't necessarily know which specific SKU fits their situation.
- Comes in with a use case in mind (e.g. "competitive gaming," "hybrid work," "budget-conscious upgrade") rather than a specific product name.

## The chatbot's job

- Not just single-product Q&A ("which laptop is best for X"), but a **setup builder**: ask about use case, space constraints, and budget, then recommend a matched bundle across categories (e.g. laptop + monitor + desk + chair) with a stated reason per item.
- Explains key differences between comparable products in the visitor's own terms (not just spec dumps).
- Guides toward one recommended product/bundle rather than presenting an open-ended list.

## The anti-hallucination requirement (key differentiator)

- Every factual claim the chatbot makes about a product must be grounded in and traceable to the authored catalog data (specs, descriptions, comparison notes).
- Explicit refusal/fallback behavior when asked something the catalog doesn't cover (e.g. shipping policy, real-world availability) rather than inventing an answer.
- Plan to build a small evaluation set (test questions with known-correct grounded answers) and report citation accuracy / refusal correctness as a demonstrable metric — likely surfaced as a "trust" or "how this works" page on the site itself.
- Small catalog size may make full RAG (vector DB + retrieval) unnecessary — context-stuffing the whole catalog into the model's context could be simpler and easier to defend as "nothing is dropped by retrieval." To be evaluated once catalog size is finalized.

## Explicit non-goals

- Not a real ecommerce store: no cart, checkout, payments, or inventory/order management.
- Not using any real brand, product, or trademark — brand and products are fictional.
- Chatbot is not a general-purpose assistant — scoped strictly to helping with product selection on this site.

## Open questions / not yet decided

- Visual identity (logo, color palette, typography) for the Fractal Pattern brand.
- Per-category product data schema (see `1-architecture.md`).

Technical decisions (stack, chatbot delivery, retrieval strategy, hosting) are resolved in [`1-architecture.md`](./1-architecture.md).

## Next steps

- Define the per-category product data schema, then author a first pass at real SKUs with specs (see `2-implementation-plan.md` Phase 1–2).
