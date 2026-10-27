import { createFileRoute } from "@tanstack/react-router";
import { PageContainer, PageHeader } from "@/components/app/shell";
import { Panel, StatusBadge } from "@/components/app/ui";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Send,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/_layout/ai-operations")({
  component: AiOperations,
});

const suggestedPrompts = [
  "Why is today's risk increasing?",
  "What departments are most affected?",
  "What should we do next?",
  "Show possible cascading impacts.",
];

function AiOperations() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="AI Operations Console"
        title="Decision support, grounded in your operations"
        description="Ask the platform. Get reasoning, recommended actions, cascading impact and citations — not chat noise."
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Panel className="p-0 overflow-hidden">
            <div className="p-5 border-b border-border bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex items-center gap-2 text-xs text-primary font-medium">
                <Sparkles className="h-3.5 w-3.5" /> Console
              </div>
              <div className="mt-3 flex items-center gap-3">
                <input
                  defaultValue="Why is today's risk increasing?"
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
                <button className="h-10 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium inline-flex items-center gap-1.5 hover:opacity-90">
                  <Send className="h-3.5 w-3.5" /> Ask
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p}
                    className="text-[11px] rounded-full border border-border bg-card px-3 py-1 hover:bg-accent/40"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 space-y-4">
              <AnswerCard />
            </div>
          </Panel>

          <Panel>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <TrendingUp className="h-3.5 w-3.5" /> Cascading impact
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                {
                  name: "Patient Portal",
                  detail: "Auth degradation → login failures across 4 regions",
                  impact: 92,
                },
                { name: "Clinician App", detail: "Session mint delays > 8s p95", impact: 74 },
                { name: "Payments", detail: "Second-factor challenge storm risk", impact: 41 },
              ].map((c) => (
                <div key={c.name} className="rounded-xl border border-border p-4">
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.detail}</div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">Projected impact</span>
                    <span className="text-sm font-semibold tabular-nums">{c.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <div className="space-y-4">
          <Panel>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <Brain className="h-3.5 w-3.5" /> Recent conversations
            </div>
            <ul className="space-y-2 text-sm">
              {[
                "Rebalance ED staffing for tomorrow",
                "Explain WMS latency root cause",
                "Draft board summary of EVT-2481",
                "What did we do last time this happened?",
              ].map((q) => (
                <li
                  key={q}
                  className="flex items-center justify-between rounded-lg border border-border px-3 py-2 hover:bg-accent/30 cursor-pointer"
                >
                  <span className="truncate">{q}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                </li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              <Zap className="h-3.5 w-3.5" /> Quick actions
            </div>
            <div className="grid grid-cols-2 gap-2">
              {["Summarise", "Compare", "Predict", "Escalate", "Cite", "Draft"].map((a) => (
                <button
                  key={a}
                  className="rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-accent/30"
                >
                  {a}
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </PageContainer>
  );
}

function AnswerCard() {
  return (
    <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/[0.03] to-transparent p-5">
      <div className="flex items-start gap-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-[oklch(0.62_0.19_275)] text-primary-foreground flex items-center justify-center shrink-0">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Operations Agent</span>
            <StatusBadge kind="ai">grounded · 4 signals</StatusBadge>
            <span className="ml-auto text-[11px] text-muted-foreground">Confidence 94%</span>
          </div>

          <Section title="Summary">
            Today's composite risk climbed 6 points driven primarily by a coordinated
            credential-stuffing pattern against the auth gateway (EVT-2481), amplified by WMS
            latency drift at Meridian and a projected ED staffing gap tonight.
          </Section>

          <Section title="Reasoning">
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Auth 401 spikes correlate with 4 residential ASNs — indicator of automated abuse.
              </li>
              <li>WMS p95 latency is degrading by ~7ms/hour; SLO breach projected in 47 min.</li>
              <li>Rota system shows ED coverage 22% below floor for the 22:00 shift.</li>
            </ul>
          </Section>

          <Section title="Recommended Actions">
            <ul className="space-y-2">
              {[
                { t: "Engage rate limiting on auth endpoints", meta: "Impact 92 · Reversible" },
                {
                  t: "Reallocate 4 clinicians from Site B to Site A",
                  meta: "Impact 64 · Requires approval",
                },
                { t: "Warm-standby carrier fallback #2", meta: "Impact 48 · Low cost" },
              ].map((a) => (
                <li
                  key={a.t}
                  className="flex items-center justify-between rounded-xl border border-border bg-card p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">{a.t}</div>
                      <div className="text-[11px] text-muted-foreground">{a.meta}</div>
                    </div>
                  </div>
                  <button className="text-xs font-medium text-primary inline-flex items-center gap-1 hover:underline">
                    Approve <ArrowRight className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Related Events">
            <div className="flex flex-wrap gap-1.5">
              {["EVT-2481", "EVT-2479", "EVT-2476"].map((e) => (
                <span
                  key={e}
                  className="text-[11px] font-mono rounded-md border border-border bg-muted/40 px-2 py-0.5"
                >
                  {e}
                </span>
              ))}
            </div>
          </Section>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            <Meta label="Potential Risks" value="Sev-1 escalation · reputational" />
            <Meta label="Estimated Impact" value="~ £480k / hour" />
            <Meta label="Time to Act" value="< 30 min" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-4">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
        {title}
      </div>
      <div className="text-sm text-foreground/90 leading-relaxed">{children}</div>
    </div>
  );
}
function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="text-sm font-medium mt-0.5">{value}</div>
    </div>
  );
}
