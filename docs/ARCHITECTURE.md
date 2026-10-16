# Architecture

```text
Gorgias export/API ──> promise normalizer ─┐
                                           ├─> deterministic matcher ─> reconciliation store ─> exception inbox/digest
Shopify/Stripe events ─> outcome normalizer┘                 │
                                                            └─> audit log + metrics
```

The prototype keeps the frontend static for GitHub Pages. TypeScript performs the same domain operation client-side for the demo. FastAPI exposes `/reconcile` and `/health` as runnable, tested backend source; it is **not deployed**. Production would use a queue plus Postgres, encrypted raw payload storage with short retention, immutable normalized event hashes, and per-tenant read-only credentials.

## Contracts and shadow paths

`POST /reconcile` accepts bounded IDs, nonnegative amounts, enumerated states, and age. Nil/wrong types/negative amounts return Pydantic 422; missing outcomes become a named `missing_action`; stale pending events become `processing_lag`; mismatched amounts carry exact exposure. Upstream connector timeout should mark a run `incomplete`, never “clean.” Empty imports produce an explicit zero-record state. Duplicate provider events must dedupe on tenant/source/external ID.

## Observability and security

Metrics: import records, unmatched identity rate, reconciliations by class, false-positive dispositions, run duration, stale runs, dollar exposure, and recovery. Alert on failed/stale runs, unmatched identity >5%, or sudden clean-rate shifts. Keep OAuth secrets server-side, request least-privilege read scopes, redact PII in logs, encrypt tenant data, sign exports, and record rule/version lineage. Never let reconciliation code mutate an order.

## Scaling

Partition by tenant and event date; normalize once, reconcile incrementally, and replay by rule version. At 10×, batch event matching and index order/customer/timestamp. At 100×, move ingestion to tenant-aware queues and separate raw retention from normalized evidence. Human review throughput, not compute, is likely the first bottleneck.
