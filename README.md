# ActionProof

A runnable product prototype for independent reconciliation of AI support promises against ecommerce system-of-record outcomes. It demonstrates a refund exception inbox, evidence review, filters, manual reconciliation with validation/loading states, and acknowledgment. All UI data is fictional; connectors and AI are simulated.

## Run

```bash
npm ci
npm run dev
```

Backend (runnable source, not deployed):

```bash
uv sync --project api --locked
uv run --project api uvicorn api.main:app --reload
uv run --project api pytest api/tests
```

Verify everything:

```bash
npm run typecheck
npm run test:e2e
npm run build
npm audit --omit=dev --audit-level=high
```

GitHub Pages serves only the static Next.js frontend under the repository base path. See [product plan](docs/PRODUCT.md), [architecture](docs/ARCHITECTURE.md), [Office Hours](docs/OFFICE_HOURS.md), [CEO review](docs/CEO_REVIEW.md), [opportunity score](docs/OPPORTUNITY_SCORE.md), and [source notes](research/notes.md).

## Source and limits

Derived from IdeaBrowser’s public Idea of the Day report for 2026-10-16. Report figures are summarized for analysis and are not warranties. ActionProof is fictional, does not connect to real stores, and does not move money.
