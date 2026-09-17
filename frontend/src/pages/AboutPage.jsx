import React from 'react';
import { Target, Server, Shield, Layers, HelpCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* SIH Context Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
            SIH
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              SIH26163: Security Assessment of World Monitor
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Smart India Hackathon 2026</p>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          Problem statement <strong>SIH26163</strong> challenges participants to evaluate the security posture
          of the <strong>World Monitor</strong> application. World Monitor is an operational monitoring platform
          aggregating critical metrics, requiring strict confidentiality, integrity, and availability.
        </p>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-2">
          <p className="font-semibold text-slate-900">Our Prototype Mission:</p>
          <p>
            Build a prototype web-based security assessment platform that demonstrates the end-to-end audit
            lifecycle: automated inspection, evidence gathering, risk scoring, developer remediation, and formal report generation.
          </p>
        </div>
      </div>

      {/* Architecture Overview */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <Layers className="w-5 h-5 text-blue-600" />
          <h3>System Architecture</h3>
        </div>

        <div className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] leading-relaxed overflow-x-auto whitespace-pre">
{`+-------------------------------------------------------------+
|               React + Vite Frontend (Port 5173)             |
|   - Executive Dashboard    - Finding Detail Modal           |
|   - Real vs Demo Badging   - Status Lifecycle Tracking      |
+-------------------------------------------------------------+
                               |
                        REST API (HTTP)
                               |
+-------------------------------------------------------------+
|                 Python FastAPI Backend (Port 8000)          |
|   - /api/dashboard         - /api/assessment/run            |
|   - /api/findings          - /api/report (PDF Generator)    |
+-------------------------------------------------------------+
            |                                    |
            v                                    v
+-----------------------+            +-----------------------+
|  SQLite Database      |            | Security Engine       |
|  - assessments        |            | - 7 Check Modules     |
|  - findings           |            | - Score Calculator    |
+-----------------------+            +-----------------------+
                                                 |
                                     Safe HTTP Inspection
                                                 v
                                     +-----------------------+
                                     | Simulated Target      |
                                     | World Monitor App     |
                                     | (Port 5001)           |
                                     +-----------------------+`}
        </div>
      </div>

      {/* Scope Boundaries */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
          <HelpCircle className="w-5 h-5 text-blue-600" />
          <h3>Prototype Boundaries: What is Implemented vs Intentionally Deferred</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200">
            <h4 className="font-bold text-emerald-800 mb-2">✓ What We Built (Prototype Scope)</h4>
            <ul className="space-y-1.5 text-emerald-900 list-disc pl-4">
              <li>Full 7-domain security assessment engine</li>
              <li>Local simulated target app with real testable weaknesses</li>
              <li>Dual findings support: Real scan results + Curated demo findings</li>
              <li>Mathematical, transparent security score calculation</li>
              <li>Live finding status updating (Open → Fixed → Score recovery)</li>
              <li>One-click formal PDF report generation with ReportLab</li>
              <li>Executive dashboard with severity & category breakdown</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">✕ What We Deliberately Omitted</h4>
            <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
              <li>Destructive exploits or DoS fuzzers (unethical/unsafe)</li>
              <li>Scanning arbitrary internet endpoints without authorization</li>
              <li>Forced AI/ML marketing claims without technical justification</li>
              <li>Complex multi-tenant user authentication (out of scope)</li>
              <li>Heavy cloud infrastructure or Kubernetes orchestration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
