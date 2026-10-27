import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageContainer, PageHeader } from "@/components/app/shell";
import { Panel } from "@/components/app/ui";
import { workflowNodes } from "@/lib/mock/data";
import {
  resolveApproval,
  startSimulation,
  type SimulationRun,
  type SimulationStepStatus,
} from "@/lib/workflow-simulation";
import {
  Bot,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  Bell,
} from "lucide-react";

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

const statusStyles: Record<SimulationStepStatus, string> = {
  Pending: "bg-muted text-muted-foreground",
  Running: "bg-primary/10 text-primary",
  Completed: "bg-[oklch(0.95_0.06_155)] text-[oklch(0.42_0.13_155)]",
  "Waiting for Approval": "bg-[oklch(0.96_0.06_80)] text-[oklch(0.5_0.16_75)]",
  Rejected: "bg-destructive/10 text-destructive",
  Failed: "bg-destructive/10 text-destructive",
};

const formatRunTime = (startedAt: string) =>
  new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(
    new Date(startedAt),
  );

function WorkflowsPage() {
  const [runHistory, setRunHistory] = useState<SimulationRun[]>([]);
  const [draftNumber, setDraftNumber] = useState(0);
  const [publishStatus, setPublishStatus] = useState<string | null>(null);
  const latestRun = runHistory[0];
  const draftName = draftNumber
    ? `Cyber Incident Response — Draft ${draftNumber}`
    : "Cyber Incident Response — v4.2";

  const simulate = () => {
    const id = `SIM-${String(runHistory.length + 1).padStart(3, "0")}`;
    setRunHistory((history) => [
      startSimulation(workflowNodes, id, new Date().toISOString()),
      ...history,
    ]);
  };
  const handleApproval = (decision: "approve" | "reject") => {
    if (latestRun)
      setRunHistory((history) => [resolveApproval(latestRun, decision), ...history.slice(1)]);
  };
  const createDraft = () => {
    setDraftNumber((number) => number + 1);
    setPublishStatus("Draft created locally from the Cyber Incident Response template.");
  };
  const publish = () => {
    const valid =
      workflowNodes.length === 7 && workflowNodes.some((node) => node.id === "approval");
    setPublishStatus(
      valid
        ? "Validation passed: this draft is marked published in this local demo only. No real system was deployed."
        : "Validation failed: this draft requires all seven steps and a Human Approval gate.",
    );
  };
  return (
    <PageContainer>
      <PageHeader
        eyebrow="Workflows"
        title="Workflow Builder"
        description="Compose AI-driven operational playbooks. Drag, connect, approve — with human-in-the-loop where it matters."
        actions={
          <>
            <button className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium hover:bg-accent/40">
              Templates
            </button>
            <button
              type="button"
              onClick={createDraft}
              className="rounded-lg bg-primary text-primary-foreground px-3 py-2 text-xs font-medium hover:opacity-90 inline-flex items-center gap-1.5"
            >
              <GitBranch className="h-3.5 w-3.5" /> New workflow
            </button>
          </>
        }
      />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Panel>
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Palette
          </div>
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
              <div
                key={p.name}
                className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-card px-3 py-2 text-xs cursor-grab hover:border-primary/40 hover:bg-primary/[0.03]"
              >
                <p.icon className="h-3.5 w-3.5 text-primary" />
                {p.name}
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="lg:col-span-3 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold">{draftName}</div>
              <div className="text-xs text-muted-foreground">
                Auto-runs on Sev-1/Sev-2 · last edited 2h ago
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.95_0.06_155)] text-[oklch(0.42_0.13_155)] px-2 py-0.5 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.55_0.15_155)]" /> Active
              </span>
              <button
                type="button"
                onClick={simulate}
                disabled={latestRun?.completionStatus === "Waiting for approval"}
                className="rounded-lg border border-border px-3 py-1.5 hover:bg-accent/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Simulate
              </button>
              <button
                type="button"
                onClick={publish}
                className="rounded-lg bg-primary text-primary-foreground px-3 py-1.5"
              >
                Publish
              </button>
            </div>
          </div>

          <p
            className="mb-4 rounded-lg border border-primary/20 bg-primary/[0.03] px-3 py-2 text-xs text-muted-foreground"
            role="note"
          >
            Local mock simulation only. It uses deterministic placeholder results and never reads
            from or writes to operational systems.
          </p>
          {publishStatus ? (
            <p className="mb-4 text-xs text-muted-foreground" role="status" aria-live="polite">
              {publishStatus}
            </p>
          ) : null}

          <div className="relative rounded-2xl border border-dashed border-border bg-[radial-gradient(oklch(0.9_0.02_255)_1px,transparent_1px)] [background-size:16px_16px] p-6 overflow-x-auto">
            <div className="flex items-center gap-3 min-w-[900px]">
              {workflowNodes.map((n, i) => {
                const Icon = iconMap[n.kind] ?? Bot;
                return (
                  <div key={n.id} className="flex items-center gap-3">
                    <div className="w-40 rounded-xl border border-border bg-card shadow-[var(--shadow-card)] p-3 hover:border-primary/40 transition">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-7 w-7 rounded-lg flex items-center justify-center ${
                            n.kind === "ai"
                              ? "bg-gradient-to-br from-primary to-[oklch(0.62_0.19_275)] text-primary-foreground"
                              : n.kind === "human"
                                ? "bg-[oklch(0.96_0.06_80)] text-[oklch(0.5_0.16_75)]"
                                : n.kind === "terminal"
                                  ? "bg-[oklch(0.95_0.06_155)] text-[oklch(0.42_0.13_155)]"
                                  : n.kind === "trigger"
                                    ? "bg-destructive/10 text-destructive"
                                    : "bg-primary/10 text-primary"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-xs font-semibold">{n.label}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-1.5 leading-snug">
                        {n.desc}
                      </p>
                    </div>
                    {i < workflowNodes.length - 1 ? (
                      <svg width="32" height="12" className="text-border">
                        <line
                          x1="0"
                          y1="6"
                          x2="24"
                          y2="6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                        <polygon points="24,2 32,6 24,10" fill="currentColor" />
                      </svg>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          {latestRun ? (
            <section
              className="mt-4 rounded-xl border border-border p-4"
              aria-labelledby="simulation-title"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 id="simulation-title" className="text-sm font-semibold">
                    Current mock simulation: {latestRun.id}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Started {formatRunTime(latestRun.startedAt)} · {latestRun.completionStatus}
                  </p>
                </div>
                {latestRun.completionStatus === "Waiting for approval" ? (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleApproval("approve")}
                      className="rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApproval("reject")}
                      className="rounded-lg border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10"
                    >
                      Reject
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {latestRun.steps.map((step) => (
                  <div
                    key={step.nodeId}
                    className="flex items-center justify-between gap-2 rounded-lg bg-muted/40 px-3 py-2 text-xs"
                  >
                    <span>{step.label}</span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${statusStyles[step.status]}`}
                    >
                      {step.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

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

          {runHistory.length > 0 ? (
            <section className="mt-4" aria-labelledby="run-history-title">
              <h2 id="run-history-title" className="text-sm font-semibold">
                Local mock run history
              </h2>
              <div className="mt-2 overflow-x-auto rounded-xl border border-border">
                <table className="w-full min-w-[640px] text-left text-xs">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 font-medium">Run ID</th>
                      <th className="px-3 py-2 font-medium">Started</th>
                      <th className="px-3 py-2 font-medium">Completion status</th>
                      <th className="px-3 py-2 font-medium">Step results</th>
                    </tr>
                  </thead>
                  <tbody>
                    {runHistory.map((run) => (
                      <tr key={run.id} className="border-t border-border">
                        <td className="px-3 py-2 font-medium">{run.id}</td>
                        <td className="px-3 py-2 text-muted-foreground">
                          {formatRunTime(run.startedAt)}
                        </td>
                        <td className="px-3 py-2">{run.completionStatus}</td>
                        <td className="px-3 py-2 text-muted-foreground">
                          {run.steps.map((step) => `${step.label}: ${step.status}`).join(" · ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}
        </Panel>
      </div>
    </PageContainer>
  );
}
