import { createFileRoute } from "@tanstack/react-router";
import { PageContainer, PageHeader } from "@/components/app/shell";
import { Panel } from "@/components/app/ui";
import { workflowNodes } from "@/lib/mock/data";
import { Bot, CheckCircle2, GitBranch, ShieldCheck, Sparkles, Users, Zap, Bell } from "lucide-react";

export const Route = createFileRoute("/_layout/workflows")({
  component: WorkflowsPage,
});

const iconMap: Record<string, typeof Bot> = {
  trigger: Zap,
  ai: Sparkles,
  human: Users,
  action: Bot,
  terminal: CheckCircle2,
};

function WorkflowsPage() {
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Workflows"
        title="Workflow Builder"
        description="Compose AI-driven operational playbooks. Drag, connect, approve — with human-in-the-loop where it matters."
        actions={
          <>
            <button className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium hover:bg-accent/40">Templates</button>
            <button className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-medium hover:opacity-90 inline-flex items-center gap-1.5">
              <GitBranch className="h-3.5 w-3.5" /> New workflow
            </button>
          </>
        }
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Panel>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Palette</div>
          <div className="space-y-2">
            {[
              { name: "Trigger", icon: Zap },
              { name: "AI Analysis", icon: Sparkles },
              { name: "Risk Assessment", icon: ShieldCheck },
              { name: "Human Approval", icon: Users },
              { name: "Task Creation", icon: Bot },
              { name: "Notification", icon: Bell },
              { name: "Resolution", icon: CheckCircle2 },
            ].map((p) => (
              <div key={p.name} className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-card px-3 py-2 text-xs cursor-grab hover:border-primary/40 hover:bg-primary/[0.03]">
                <p.icon className="h-3.5 w-3.5 text-primary" />
                {p.name}
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="lg:col-span-3 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold">Cyber Incident Response — v4.2</div>
              <div className="text-xs text-muted-foreground">Auto-runs on Sev-1/Sev-2 · last edited 2h ago</div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.95_0.06_155)] text-[oklch(0.42_0.13_155)] px-2 py-0.5 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.55_0.15_155)]" /> Active
              </span>
              <button className="rounded-lg border border-border px-3 py-1.5 hover:bg-accent/30">Simulate</button>
              <button className="rounded-lg bg-primary text-primary-foreground px-3 py-1.5">Publish</button>
            </div>
          </div>

          <div
            className="relative rounded-2xl border border-dashed border-border bg-[radial-gradient(oklch(0.9_0.02_255)_1px,transparent_1px)] [background-size:16px_16px] p-6 overflow-x-auto"
          >
            <div className="flex items-center gap-3 min-w-[900px]">
              {workflowNodes.map((n, i) => {
                const Icon = iconMap[n.kind] ?? Bot;
                return (
                  <div key={n.id} className="flex items-center gap-3">
                    <div className="w-40 rounded-xl border border-border bg-card shadow-[var(--shadow-card)] p-3 hover:border-primary/40 transition">
                      <div className="flex items-center gap-2">
                        <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${
                          n.kind === "ai" ? "bg-gradient-to-br from-primary to-[oklch(0.62_0.19_275)] text-primary-foreground" :
                          n.kind === "human" ? "bg-[oklch(0.96_0.06_80)] text-[oklch(0.5_0.16_75)]" :
                          n.kind === "terminal" ? "bg-[oklch(0.95_0.06_155)] text-[oklch(0.42_0.13_155)]" :
                          n.kind === "trigger" ? "bg-destructive/10 text-destructive" :
                          "bg-primary/10 text-primary"
                        }`}>
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-xs font-semibold">{n.label}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1.5 leading-snug">{n.desc}</p>
                    </div>
                    {i < workflowNodes.length - 1 ? (
                      <svg width="32" height="12" className="text-border">
                        <line x1="0" y1="6" x2="24" y2="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                        <polygon points="24,2 32,6 24,10" fill="currentColor" />
                      </svg>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: "Cyber Incident Response", runs: 128, ok: 96 },
              { name: "Staffing Reallocation", runs: 74, ok: 91 },
              { name: "Supplier Failover", runs: 41, ok: 88 },
            ].map((w) => (
              <div key={w.name} className="rounded-xl border border-border p-4">
                <div className="text-sm font-medium">{w.name}</div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{w.runs} runs</span>
                  <span className="font-medium text-[oklch(0.42_0.13_155)]">{w.ok}% success</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </PageContainer>
  );
}