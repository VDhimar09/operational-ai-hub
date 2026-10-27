export type SimulationStepStatus =
  "Pending" | "Running" | "Completed" | "Waiting for Approval" | "Rejected" | "Failed";

export type SimulationCompletionStatus =
  "In progress" | "Waiting for approval" | "Completed" | "Rejected" | "Failed";

export interface SimulationStep {
  nodeId: string;
  label: string;
  status: SimulationStepStatus;
}

export interface SimulationRun {
  id: string;
  startedAt: string;
  completionStatus: SimulationCompletionStatus;
  steps: SimulationStep[];
}

type WorkflowNode = { id: string; label: string };

export function startSimulation(
  nodes: readonly WorkflowNode[],
  id: string,
  startedAt: string,
): SimulationRun {
  const approvalIndex = nodes.findIndex((node) => node.id === "approval");
  return {
    id,
    startedAt,
    completionStatus: approvalIndex === -1 ? "Failed" : "Waiting for approval",
    steps: nodes.map((node, index) => ({
      nodeId: node.id,
      label: node.label,
      status:
        approvalIndex === -1
          ? index === 0
            ? "Failed"
            : "Pending"
          : index < approvalIndex
            ? "Completed"
            : index === approvalIndex
              ? "Waiting for Approval"
              : "Pending",
    })),
  };
}

export function resolveApproval(
  run: SimulationRun,
  decision: "approve" | "reject",
  failAtNodeId?: string,
): SimulationRun {
  const approvalIndex = run.steps.findIndex((step) => step.nodeId === "approval");
  if (run.completionStatus !== "Waiting for approval" || approvalIndex === -1) return run;
  if (decision === "reject") {
    return {
      ...run,
      completionStatus: "Rejected",
      steps: run.steps.map((step, index) =>
        index === approvalIndex ? { ...step, status: "Rejected" } : step,
      ),
    };
  }
  const failureIndex = failAtNodeId
    ? run.steps.findIndex((step) => step.nodeId === failAtNodeId)
    : -1;
  return {
    ...run,
    completionStatus: failureIndex > approvalIndex ? "Failed" : "Completed",
    steps: run.steps.map((step, index) => ({
      ...step,
      status:
        index === approvalIndex
          ? "Completed"
          : failureIndex > approvalIndex && index === failureIndex
            ? "Failed"
            : failureIndex > approvalIndex && index > failureIndex
              ? "Pending"
              : index > approvalIndex
                ? "Completed"
                : step.status,
    })),
  };
}
