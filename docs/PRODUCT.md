# Product plan

## ICP and job

**ICP:** Head of CX at a $2M–$50M Shopify brand using Gorgias, Siena, Yuma, or Kustomer for 3,000+ monthly tickets and allowing autonomous refunds/cancellations. **JTBD:** “Before finance close or a customer escalation, show me every AI promise whose real outcome is missing, late, duplicated, or financially different, with enough evidence to act.”

## MVP

1. Ingest a support export and Shopify/Stripe refund export read-only.
2. Normalize each support promise into `{customer, order, action, amount, timestamp}`.
3. Deterministically match it to ledger events and classify missing, amount mismatch, duplicate, lag, or clean.
4. Show an exception inbox with evidence, exposure, acknowledgment, and false-positive reason.
5. Produce a weekly exposure/recovery digest.

The public prototype demonstrates the core typed reconciliation operation, filtering, evidence review, manual scenario input, validation, loading, and acknowledgment using fictional data.

## Data model

- `Promise`: source ticket, actor, customer/order identity, action type, amount, claimed state, timestamp, extraction confidence.
- `OutcomeEvent`: source system, external ID, action type, amount, state, timestamp, immutable payload hash.
- `Policy`: allowed amount/window/action per brand and channel.
- `Reconciliation`: promise/outcome references, rule version, classification, exposure, evidence.
- `Disposition`: reviewer, acknowledged/escalated/false-positive, reason, resolution timestamp.

## AI strategy

Use an LLM only to extract typed promises from unstructured support text, with confidence and source spans. Matching, amount math, policy evaluation, and severity stay deterministic and versioned. Low-confidence extraction routes to manual review; no model writes to commerce systems. The demo is entirely deterministic and labels all simulated state.

## Economics and validation

Lead with a free 30-day audit, then $1,500/mo Starter and $3,500/mo Growth. Gross margin should exceed 80% after connectors stabilize, but early concierge review will be labor-heavy. Validate data access, exception rate, dollar impact, review time, false-positive rate, and paid conversion before automating acquisition. Target: <10% false positives, <15 minutes weekly review, two paid pilots from five audits.

## Moat

No moat exists today. A defensible position could emerge from a cross-vendor outcome schema, brand-specific policy history, disposition-labeled exception data, auditor-grade evidence, and agency distribution. An interface alone is copyable.

## Risks

Native bundling; vendor API restrictions; customer/PCI/PII exposure; false positives; weak event identity; delayed webhooks; partial refunds; multi-currency; platform-side reversals; intermittent pain; and long security reviews. Mitigations: read-only scopes, data minimization, deterministic replay, regional retention controls, rule versioning, and concierge validation.

## 30 / 60 / 90 days

- **30:** interview 20 buyers, complete five CSV-based audits, measure exception value and false positives, close two paid pilots.
- **60:** ship read-only Gorgias + Shopify ingestion, refund-only nightly reconciliation, evidence inbox, rule versioning, and audit logs to pilots.
- **90:** add Stripe/ReCharge outcome sources, weekly digest, agency multi-store view, incident runbook, and a case study. Do not add autonomous remediation yet.
