import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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
  Activity,
  Bot,
  CheckCircle2,
  GitBranch,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
  Bell,
  Clock,
  XCircle,
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

function statusClasses(status: SimulationStepStatus) {
  switch (status) {
    case "Completed":
      return "bg-emerald-100 text-emerald-800";
    case "Running":
      return "bg-blue-100 text-blue-800";
    case "Waiting for Approval":
      return "bg-amber-100 text-amber-800";
    case "Rejected":
    case "Failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function WorkflowsPage() {
  const [currentRun, setCurrentRun] = useState<SimulationRun | null>(null);
  const [history, setHistory] = useState<SimulationRun[]>([]);
  const [message, setMessage] = useState("");

  function simulate() {
    const run = startSimulation(workflowNodes, `SIM-${Date.now()}`, new Date().toISOString());

    setCurrentRun(run);
    setHistory((previous) => [run, ...previous].slice(0, 10));
    setMessage(
      run.completionStatus === "Waiting for approval"
        ? "Simulation paused. Review the workflow and approve or reject it."
        : "Simulation could not start because the workflow has no approval step.",
    );
  }

  function decideApproval(decision: "approve" | "reject") {
    if (!currentRun) return;

    const updatedRun = resolveApproval(currentRun, decision);

    setCurrentRun(updatedRun);
    setHistory((previous) => previous.map((run) => (run.id === updatedRun.id ? updatedRun : run)));

    setMessage(
      decision === "approve"
        ? `Simulation finished with status: ${updatedRun.completionStatus}.`
        : "Approval rejected. Remaining steps were not executed.",
    );
  }

  const waitingForApproval = currentRun?.completionStatus === "Waiting for approval";

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Workflows"
        title="Workflow Builder"
        description="Explore operational playbooks with a deterministic local simulation and human approval."
        actions={
          <>
            <button
              type="button"
              onClick={() =>
                setMessage(
                  "Workflow templates are sample data. Template selection is not implemented yet.",
                )
              }
              className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium hover:bg-accent/40"
            >
              Templates
            </button>

            <button
              type="button"
              onClick={() =>
                setMessage(
                  "Draft creation is not implemented yet. You can simulate the existing workflow below.",
                )
              }
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:opacity-90"
            >
              <GitBranch className="h-3.5 w-3.5" />
              New workflow
            </button>
          </>
        }
      />

      {message && (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 rounded-lg border border-border bg-card p-3 text-sm"
        >
          {message}
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
        <Panel>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-card px-3 py-2 text-xs"
              >
                <item.icon className="h-3.5 w-3.5 text-primary" />
                {item.name}
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="relative overflow-hidden lg:col-span-3">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">Cyber Incident Response — v4.2</div>
              <div className="text-xs text-muted-foreground">
                Local deterministic simulation · Sample workflow
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-1 font-medium text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                Draft demo
              </span>

              <button
                type="button"
                onClick={simulate}
                className="rounded-lg border border-border px-3 py-1.5 hover:bg-accent/30"
              >
                <span className="inline-flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" />
                  Simulate
                </span>
              </button>
            </div>
          </div>

          <div className="relative overflow-x-auto rounded-2xl border border-dashed border-border bg-card p-6">
            <div className="flex min-w-[900px] items-start gap-3">
              {workflowNodes.map((node, index) => {
                const Icon = iconMap[node.kind] ?? Bot;
                const step = currentRun?.steps.find((item) => item.nodeId === node.id);

                return (
                  <div key={node.id} className="flex items-start gap-3">
                    <div className="w-40 rounded-xl border border-border bg-card p-3 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-3.5 w-3.5" />
                        </div>

                        <span className="text-xs font-semibold">{node.label}</span>
                      </div>

                      <p className="mt-1.5 text-[11px] leading-snug text-muted-foreground">
                        {node.desc}
                      </p>

                      <div className="mt-3">
                        {step ? (
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${statusClasses(step.status)}`}
                          >
                            {step.status}
                          </span>
                        ) : (
                          <span className="text-[10px] text-muted-foreground">Not run</span>
                        )}
                      </div>
                    </div>

                    {index < workflowNodes.length - 1 && (
                      <svg
                        aria-hidden="true"
                        width="32"
                        height="12"
                        className="mt-8 shrink-0 text-border"
                      >
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
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {waitingForApproval && (
            <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-amber-700" />

                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-amber-950">Human approval required</h3>

                  <p className="mt-1 text-xs text-amber-900">
                    Review this simulated workflow before allowing the remaining steps to complete.
                    No real operational actions will run.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => decideApproval("approve")}
                      className="rounded-lg bg-emerald-700 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-800"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Approve
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => decideApproval("reject")}
                      className="rounded-lg border border-red-300 bg-white px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-50"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <XCircle className="h-3.5 w-3.5" />
                        Reject
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentRun && (
            <div className="mt-4 rounded-xl border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">Current simulation</h3>

                <span className="rounded-full bg-muted px-2 py-1 text-xs">
                  {currentRun.completionStatus}
                </span>
              </div>

              <div className="mt-2 text-xs text-muted-foreground">Run ID: {currentRun.id}</div>

              <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                Started: {new Date(currentRun.startedAt).toLocaleString()}
              </div>
            </div>
          )}

          {/* Simulated execution timeline */}
          {currentRun && (
            <div className="mt-4 rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-semibold">Simulated Execution Timeline</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Chronological record of workflow events.
                  </p>
                </div>

                <span className="rounded-full bg-muted px-2 py-1 text-xs">
                  {currentRun.events.length} events
                </span>
              </div>

              <div className="mt-4 space-y-4">
                {currentRun.events.map((event) => {
                  const isFailure =
                    event.type === "step_failed" ||
                    event.type === "workflow_failed" ||
                    event.type === "approval_rejected";

                  const isApproval = event.type === "approval_requested";

                  const EventIcon = isFailure
                    ? XCircle
                    : isApproval
                      ? ShieldCheck
                      : event.type === "workflow_started"
                        ? Activity
                        : CheckCircle2;

                  const iconColour = isFailure
                    ? "text-red-600 bg-red-100"
                    : isApproval
                      ? "text-amber-700 bg-amber-100"
                      : "text-emerald-700 bg-emerald-100";

                  return (
                    <div key={event.id} className="flex items-start gap-3">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconColour}`}
                      >
                        <EventIcon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium">{event.message}</p>

                        {event.nodeId && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Workflow node: {event.nodeId}
                          </p>
                        )}

                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 border-t border-border pt-3 text-[11px] text-muted-foreground">
                These are simulated event timestamps, not actual operational execution times.
              </p>
            </div>
          )}
        </Panel>
      </div>

      <Panel className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Simulation history</h2>

          <span className="text-xs text-muted-foreground">
            {history.length} run{history.length === 1 ? "" : "s"} · Current session only
          </span>
        </div>

        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No simulations yet. Select Simulate to start your first run.
          </p>
        ) : (
          <div className="space-y-3">
            {history.map((run) => (
              <div
                key={run.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-3"
              >
                <div>
                  <div className="text-sm font-medium">{run.id}</div>

                  <div className="mt-1 text-xs text-muted-foreground">
                    {new Date(run.startedAt).toLocaleString()}
                  </div>

                  <div className="mt-1 text-xs text-muted-foreground">
                    {run.steps.filter((step) => step.status === "Completed").length}/
                    {run.steps.length} steps completed
                  </div>
                </div>

                <span className="rounded-full bg-muted px-2 py-1 text-xs">
                  {run.completionStatus}
                </span>
              </div>
            ))}
          </div>
        )}
      </Panel>
    </PageContainer>
  );
}
