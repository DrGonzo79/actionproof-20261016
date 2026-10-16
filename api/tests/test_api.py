from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)
BASE = {"ticket_id":"G-1","order_id":"#1","action":"refund","promised_amount":100,
        "actual_amount":100,"promised_state":"completed","actual_state":"completed","age_minutes":5}

def test_health():
    assert client.get("/health").json() == {"status":"ok"}

def test_matching_refund_is_clean():
    result = client.post("/reconcile", json=BASE)
    assert result.status_code == 200
    assert result.json()["status"] == "clean"

def test_amount_mismatch_reports_exact_exposure():
    result = client.post("/reconcile", json={**BASE, "actual_amount": 62.5}).json()
    assert result == {"status":"critical","reason":"amount_mismatch","exposure":37.5,
                      "summary":"Promised $100.00; ledger shows $62.50."}

def test_missing_action_is_critical():
    result = client.post("/reconcile", json={**BASE, "actual_state":"missing","actual_amount":0}).json()
    assert result["reason"] == "missing_action"
    assert result["exposure"] == 100

def test_stale_pending_action_is_warning():
    result = client.post("/reconcile", json={**BASE, "actual_state":"pending","age_minutes":31}).json()
    assert result["reason"] == "processing_lag"

def test_invalid_negative_amount_is_rejected():
    response = client.post("/reconcile", json={**BASE, "promised_amount":-1})
    assert response.status_code == 422

def test_invalid_state_is_rejected():
    response = client.post("/reconcile", json={**BASE, "actual_state":"vanished"})
    assert response.status_code == 422
