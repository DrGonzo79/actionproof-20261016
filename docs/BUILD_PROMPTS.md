# Phased build prompts

1. **Production money model:** “Replace floating-point amounts with ISO currency + integer minor units. Add partial, multiple, reversed, duplicated, and cross-currency refund fixtures. Preserve named classifications and add property tests.”
2. **Connector proof:** “Implement read-only CSV imports for Gorgias and Shopify. Produce an explicit run-completeness record; upstream/parse failures must never become clean reconciliations. Add recorded-schema contract tests.”
3. **Durable evidence:** “Add Postgres tables for promises, outcome events, rule versions, reconciliations, and dispositions. Enforce tenant-scoped uniqueness/idempotency and immutable evidence hashes.”
4. **Safe extraction:** “Extract structured promises from ticket text with source spans and confidence. Route low confidence to manual review; keep reconciliation deterministic. Add prompt/version evals against a labeled corpus.”
5. **Pilot operations:** “Add tenant auth, read-only OAuth scopes, encrypted credentials, PII-redacted logs, run metrics, Slack digest, stale-run alerts, retention controls, and incident runbooks.”
