"""
backend/main.py
================
FastAPI Application Entry Point

This is the main server. It:
  1. Creates the FastAPI app instance
  2. Configures CORS (so the React frontend can connect)
  3. Registers all routers
  4. Seeds the database on startup
  5. Provides the auto-generated Swagger UI at /docs

To run:
  cd sih26163-security-dashboard
  uvicorn backend.main:app --reload --port 8000
"""

import sys
import os

# Add project root to path so security_engine can be imported
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from backend.database import init_db
from backend.routes.findings import router as findings_router
from backend.routes.assessment import router as assessment_router
from backend.routes.report import router as report_router


# ─── App Instance ─────────────────────────────────────────────────────────────
app = FastAPI(
    title="SIH26163 — World Monitor Security Assessment Platform",
    description=(
        "A prototype security assessment platform for the World Monitor application. "
        "Built for Smart India Hackathon 2026. "
        "NOT a production penetration testing tool."
    ),
    version="1.0.0",
    docs_url="/docs",        # Swagger UI — great for judge demos
    redoc_url="/redoc",      # Alternative API docs
)


# ─── CORS Configuration ───────────────────────────────────────────────────────
# Allows the React frontend (running on port 5173) to call this API.
# In production, replace "*" with your specific frontend domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── Startup Event ────────────────────────────────────────────────────────────
@app.on_event("startup")
async def startup_event():
    """Initialize database and seed demo data on first run."""
    init_db()
    # Auto-seed if database is empty
    try:
        from backend.seed import seed_database
        seed_database()
    except Exception as e:
        print(f"Seed warning: {e}")


# ─── Routers ─────────────────────────────────────────────────────────────────
app.include_router(findings_router)
app.include_router(assessment_router)
app.include_router(report_router)


# ─── Root Endpoint ────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "name": "SIH26163 Security Assessment API",
        "version": "1.0.0",
        "docs": "/docs",
        "health": "/api/health",
        "dashboard": "/api/dashboard",
        "findings": "/api/findings",
        "note": "Prototype — for Smart India Hackathon 2026 demonstration only.",
    }


# ─── Run directly (alternative to uvicorn CLI) ────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="127.0.0.1", port=8000, reload=True)
