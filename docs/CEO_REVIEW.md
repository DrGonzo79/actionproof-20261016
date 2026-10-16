# CEO review

**Mode:** scope reduction for the build; selective expansion only after paid evidence.

## Premise and strongest challenges

The original framing (“AI support reconciliation platform”) is too broad. The sharp problem is wrong or missing refunds, where evidence and dollars are legible. Three threats dominate: (1) native vendors can bundle verification, (2) false positives can make the inbox unusable, and (3) a painful incident may still be too intermittent for a monthly budget. The plan therefore starts with a concierge refund audit and treats integrations as earned scope.

## Alternatives and decision

Concierge CSV audit (S/low) beats a nightly connector (M/medium) for demand learning and a universal outcome ledger (XL/high) for architectural ambition. Build the evidence inbox as the sales artifact, not as proof that customers exist. Reuse the same typed reconciliation contract in TypeScript and FastAPI, but do not pretend a demo fixture is integration progress.

## Review by area

1. **Architecture:** keep read-only source boundaries and deterministic matching. Mark partial upstream runs incomplete.
2. **Errors:** name invalid input (422), missing action, amount mismatch, lag, duplicate event, unmatched identity, stale run, and connector timeout. Never map upstream failure to a clean result.
3. **Security:** minimize PII, isolate tenants, encrypt, use least-privilege scopes, and keep payloads out of logs. No write scopes.
4. **Data flow / interactions:** cover nil, empty, invalid, delayed, duplicate, multi-currency, partial-refund, double-click, slow network, and stale selection paths.
5. **Code quality:** one pure reconciliation function per runtime; money needs decimal/minor-unit integers before production.
6. **Tests:** unit/API tests cover matched, mismatch, missing, lag, and invalid values; Playwright covers filter, inspect, manual reconciliation, validation, acknowledgment, and mobile overflow. Production still needs contract/replay tests against recorded provider schemas.
7. **Observability:** run completeness, unmatched rate, false-positive rate, stale jobs, exposure, and reviewer time are launch metrics; add runbooks before live connectors.
8. **State:** prototype state is ephemeral. Production requires immutable input hashes, rule versions, dispositions, and idempotency keys.
9. **API:** version the contract, use integer minor units, return rule/evidence IDs, and rate-limit by tenant.
10. **Performance:** batch and index event matching; queue connector work. Review volume will break before CPU.
11. **UX:** exception-first hierarchy is correct. Preserve explicit demo labels, keyboard focus, loading/error/empty states, and mobile containment.

## Accepted / deferred / excluded

**Accepted:** refund mismatch engine, exception inbox, evidence detail, filters, manual test, FastAPI contract, tests, and static deployment. **Deferred:** OAuth connectors, persistence, Slack, LLM extraction, multi-tenant auth, agency view. **Not in scope:** autonomous remediation, write access, paid infrastructure, or claims of live backend capability.

**Decision:** ship this vertical slice, then demand five real-data audits and two paid pilots before broadening actions or integrations.
