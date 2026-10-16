# Office Hours diagnostic

**Mode:** startup, pre-product. **Decision:** build a narrow proof artifact, not a platform.

## Six forcing questions

1. **Demand reality.** There is direct complaint evidence and a fast-growing agent install base, but no ActionProof payment evidence. Vendor pricing proves budget exists for AI support, not that reconciliation gets its own line item. The honest status is *pain evidenced, demand unproven*.
2. **Status quo.** A Head of CX samples AI-closed tickets, exports refunds, asks an analyst to compare records, and learns about misses from escalations or customer complaints. That costs analyst hours, apology credits, leakage, and trust. The spreadsheet is more dangerous than ResponseCX because it is already “good enough.”
3. **Desperate user.** Head of CX at a $2M–$50M Shopify brand, running Gorgias/Siena/Yuma with thousands of monthly tickets. They are rewarded for containment and CSAT, but blamed for unauthorized refunds, incorrect subscription changes, and public escalations.
4. **Narrowest paid wedge.** A manually delivered 30-day retroactive refund audit: connect/export Gorgias and Shopify/Stripe, return only missing, duplicate, and wrong-amount actions with evidence and dollar exposure. Charge for the next monthly run only after the audit finds material exceptions.
5. **Observation plan.** Watch five Heads of CX review a real exception packet without guidance. Measure which exceptions they open, dismiss, escalate, and remediate; capture false-positive reason codes. A polished demo is not validation.
6. **Future-fit.** If support agents gain more write access, an independent outcome ledger becomes more valuable. If platforms expose signed intent/outcome traces and bundle reconciliation, the product becomes less valuable unless it owns cross-vendor evidence and policy intelligence.

## Premise challenge

- The outcome is not “better AI QA”; it is **recovering incorrect money movement before a customer reports it**.
- Read-only access is essential to trust and speeds security review.
- The MVP must reconcile one action deeply (refunds), not many actions shallowly.
- False-positive cost is the critical product risk; an inbox full of noise dies in week one.

## Approaches considered

### A — Concierge audit (recommended)
Export-based, deterministic refund reconciliation with a human-reviewed exception packet. **Effort S / risk low.** Fastest path to observed buyer behavior and price acceptance; weak recurring software proof.

### B — Read-only nightly connector
OAuth/API ingestion from support and commerce systems, rules engine, evidence inbox, Slack digest. **Effort M / risk medium.** Proves recurring workflow; security and API surface slow learning.

### C — Universal agent outcome ledger
Event-sourced intent and outcome graph across support, payments, subscriptions, and logistics. **Effort XL / risk high.** Strong long-term architecture; premature before exception patterns and budget are proven.

## Assignment and success criteria

Sell five concierge audits before building production connectors. Success in 30 days: 20 qualified conversations, 8 exports accepted, 5 completed audits, at least 3 audits finding >$500 recoverable exposure, and 2 buyers agreeing to a paid $1,500 monthly pilot. Kill or reframe if fewer than 2 buyers share data or no one agrees to pay after seeing real findings.
