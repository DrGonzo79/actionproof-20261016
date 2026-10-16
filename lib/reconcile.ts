export type CaseInput = {
  id: string; ticketId: string; customer: string; action: string;
  promisedAmount: number; actualAmount: number; promisedState: string;
  actualState: string; agent: string; ageMinutes: number; orderId: string;
};

export type Finding = CaseInput & {
  status: "critical" | "warning" | "clean";
  reason: "missing_action" | "amount_mismatch" | "processing_lag" | "matched";
  exposure: number;
  summary: string;
};

export function reconcileCase(item: CaseInput): Finding {
  if (item.promisedState === "completed" && item.actualState === "missing") {
    return {...item, status: "critical", reason: "missing_action", exposure: item.promisedAmount,
      summary: `${item.action.replaceAll("_", " ")} was promised but no commerce event exists.`};
  }
  const delta = Math.abs(item.promisedAmount - item.actualAmount);
  if (delta >= 0.01) {
    return {...item, status: "critical", reason: "amount_mismatch", exposure: delta,
      summary: `Promised $${item.promisedAmount.toFixed(2)}; ledger shows $${item.actualAmount.toFixed(2)}.`};
  }
  if (item.actualState === "pending" && item.ageMinutes > 15) {
    return {...item, status: "warning", reason: "processing_lag", exposure: item.promisedAmount,
      summary: `Action is still pending after ${item.ageMinutes} minutes.`};
  }
  return {...item, status: "clean", reason: "matched", exposure: 0,
    summary: "Support promise and system-of-record event match."};
}
