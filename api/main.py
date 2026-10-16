from enum import Enum
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="ActionProof Reconciliation API", version="0.1.0")

class ActionState(str, Enum):
    completed = "completed"
    pending = "pending"
    missing = "missing"

class ReconciliationRequest(BaseModel):
    ticket_id: str = Field(min_length=1, max_length=80)
    order_id: str = Field(min_length=1, max_length=80)
    action: str = Field(min_length=1, max_length=80)
    promised_amount: float = Field(ge=0, le=1_000_000)
    actual_amount: float = Field(ge=0, le=1_000_000)
    promised_state: ActionState
    actual_state: ActionState
    age_minutes: int = Field(ge=0, le=525_600)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/reconcile")
def reconcile(body: ReconciliationRequest):
    if body.promised_state == ActionState.completed and body.actual_state == ActionState.missing:
        return {"status": "critical", "reason": "missing_action", "exposure": body.promised_amount,
                "summary": f"{body.action.replace('_', ' ')} was promised but no commerce event exists."}
    delta = round(abs(body.promised_amount - body.actual_amount), 2)
    if delta >= 0.01:
        return {"status": "critical", "reason": "amount_mismatch", "exposure": delta,
                "summary": f"Promised ${body.promised_amount:.2f}; ledger shows ${body.actual_amount:.2f}."}
    if body.actual_state == ActionState.pending and body.age_minutes > 15:
        return {"status": "warning", "reason": "processing_lag", "exposure": body.promised_amount,
                "summary": f"Action is still pending after {body.age_minutes} minutes."}
    return {"status": "clean", "reason": "matched", "exposure": 0,
            "summary": "Support promise and system-of-record event match."}
