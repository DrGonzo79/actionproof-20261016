"use client";

import {FormEvent, useMemo, useState} from "react";
import fixtures from "@/data/demo_cases.json";
import {CaseInput, Finding, reconcileCase} from "@/lib/reconcile";

type Filter = "all" | Finding["status"];
const initial = (fixtures as CaseInput[]).map(reconcileCase);
const money = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"});

const labels: Record<Finding["reason"], string> = {
  missing_action: "Missing action", amount_mismatch: "Amount mismatch",
  processing_lag: "Processing lag", matched: "Matched"
};

export default function Home() {
  const [filter, setFilter] = useState<Filter>("all");
  const [selected, setSelected] = useState<Finding>(initial[0]);
  const [findings, setFindings] = useState(initial);
  const [isReconciling, setReconciling] = useState(false);
  const [formError, setFormError] = useState("");
  const [toast, setToast] = useState("");
  const visible = useMemo(() => findings.filter(f => filter === "all" || f.status === filter), [filter, findings]);
  const exceptions = findings.filter(f => f.status !== "clean");
  const exposure = exceptions.reduce((sum, f) => sum + f.exposure, 0);

  function runReconciliation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(""); setToast("");
    const data = new FormData(event.currentTarget);
    const promised = Number(data.get("promised"));
    const actualRaw = String(data.get("actual"));
    if (!Number.isFinite(promised) || promised < 0) return setFormError("Promised amount must be zero or greater.");
    if (actualRaw !== "missing" && (!Number.isFinite(Number(actualRaw)) || Number(actualRaw) < 0)) return setFormError("Ledger amount must be zero, greater, or marked missing.");
    setReconciling(true);
    window.setTimeout(() => {
      const item = reconcileCase({id: `EX-${1050 + findings.length}`, ticketId: String(data.get("ticket")), customer: "Manual check", action: "refund", promisedAmount: promised, actualAmount: actualRaw === "missing" ? 0 : Number(actualRaw), promisedState: "completed", actualState: actualRaw === "missing" ? "missing" : "completed", agent: "Manual demo", ageMinutes: 22, orderId: String(data.get("order"))});
      setFindings(old => [item, ...old]); setSelected(item); setFilter("all"); setReconciling(false);
      setToast(item.status === "clean" ? "Reconciled: records match." : `Exception created: ${labels[item.reason]}.`);
      event.currentTarget?.reset();
    }, 450);
  }

  function acknowledge() {
    setFindings(old => old.filter(item => item.id !== selected.id));
    setToast(`${selected.id} acknowledged and removed from the demo queue.`);
    const next = findings.find(item => item.id !== selected.id); if (next) setSelected(next);
  }

  return <main>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="ActionProof home"><span>AP</span>ActionProof</a>
      <div className="sync"><i aria-hidden="true"/> Last demo sync 2 min ago</div>
    </header>

    <section id="top" className="hero">
      <div>
        <p className="eyebrow">AI SUPPORT CONTROL PLANE / DEMO DATA</p>
        <h1>Trust the outcome,<br/><em>not the reply.</em></h1>
        <p className="lede">ActionProof reconciles what an AI support agent promised with what Shopify, Stripe, and Recharge actually did—then shows your team only the exceptions.</p>
      </div>
      <div className="scorecard" aria-label="Reconciliation health">
        <p>24H RECONCILIATION HEALTH</p><strong>96.8%</strong><span>1,247 actions checked</span>
        <div className="bar"><b style={{width:"96.8%"}}/></div>
      </div>
    </section>

    <section className="metrics" aria-label="Exception metrics">
      <article><span>OPEN EXCEPTIONS</span><strong>{exceptions.length}</strong><small>needs human review</small></article>
      <article><span>DOLLARS EXPOSED</span><strong>{money.format(exposure)}</strong><small>maximum demo impact</small></article>
      <article><span>CRITICAL</span><strong>{findings.filter(f=>f.status==="critical").length}</strong><small>missing or wrong actions</small></article>
      <article><span>AVG. DETECTION</span><strong>4m 12s</strong><small>nightly in paid wedge</small></article>
    </section>

    <section className="workspace">
      <div className="queue">
        <div className="sectionhead"><div><p className="eyebrow">EXCEPTION INBOX</p><h2>Money moved differently.</h2></div>
          <div className="filters" aria-label="Filter findings">{(["all","critical","warning","clean"] as Filter[]).map(value => <button key={value} className={filter===value?"active":""} aria-pressed={filter===value} onClick={()=>setFilter(value)}>{value}</button>)}</div>
        </div>
        <div className="table" role="table" aria-label="Reconciliation findings">
          <div className="tr header" role="row"><span>Ticket / order</span><span>Action</span><span>Finding</span><span>Exposure</span></div>
          {visible.length === 0 ? <div className="empty">No findings in this filter.</div> : visible.map(item =>
            <button className={`tr ${selected.id===item.id?"selected":""}`} role="row" key={item.id} onClick={()=>setSelected(item)}>
              <span><b>{item.ticketId}</b><small>{item.orderId} · {item.customer}</small></span>
              <span>{item.action.replaceAll("_", " ")}<small>{item.agent}</small></span>
              <span><i className={`pill ${item.status}`}>{labels[item.reason]}</i><small>{item.ageMinutes} min ago</small></span>
              <span className="amount">{item.exposure ? money.format(item.exposure) : "—"}</span>
            </button>)}
        </div>
      </div>

      <aside className="detail" aria-live="polite">
        <p className="eyebrow">EVIDENCE / {selected.id}</p><h2>{labels[selected.reason]}</h2><p>{selected.summary}</p>
        <div className="comparison"><div><span>SUPPORT PROMISE</span><strong>{selected.action.replaceAll("_", " ")}</strong><b>{money.format(selected.promisedAmount)}</b></div><div><span>COMMERCE LEDGER</span><strong>{selected.actualState}</strong><b>{money.format(selected.actualAmount)}</b></div></div>
        <dl><div><dt>Ticket</dt><dd>{selected.ticketId}</dd></div><div><dt>Order</dt><dd>{selected.orderId}</dd></div><div><dt>Agent</dt><dd>{selected.agent}</dd></div></dl>
        <button className="primary" onClick={acknowledge}>Acknowledge exception</button><small className="demo-note">Demo-only: no customer or order is changed.</small>
      </aside>
    </section>

    <section className="manual">
      <div><p className="eyebrow">TRY THE DOMAIN OPERATION</p><h2>Reconcile one refund</h2><p>Compare a support promise with the system of record. Use <b>missing</b> to simulate an absent ledger event.</p></div>
      <form onSubmit={runReconciliation} noValidate>
        <label>Ticket ID<input name="ticket" required defaultValue="G-90001"/></label>
        <label>Order ID<input name="order" required defaultValue="#49001"/></label>
        <label>Promised amount<input name="promised" required type="number" min="0" step="0.01" defaultValue="75.00"/></label>
        <label>Ledger amount or “missing”<input name="actual" required defaultValue="50.00"/></label>
        {formError && <p className="form-error" role="alert">{formError}</p>}
        <button className="primary" disabled={isReconciling}>{isReconciling ? "Reconciling…" : "Run reconciliation"}</button>
        {toast && <p className="toast" role="status">{toast}</p>}
      </form>
    </section>

    <footer><p><b>ActionProof</b> · Fictional prototype for product validation. Simulated connectors and demo data only.</p><a href="https://www.ideabrowser.com/hub/ideas/today">Idea source ↗</a></footer>
  </main>;
}
