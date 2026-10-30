export type SimulationStepStatus =
  "Pending" | "Running" | "Completed" | "Waiting for Approval" | "Rejected" | "Failed";

export type SimulationCompletionStatus =
  "In progress" | "Waiting for approval" | "Completed" | "Rejected" | "Failed";

export type SimulationEventType =
  | "workflow_started"
  | "step_completed"
  | "approval_requested"
  | "approval_granted"
  | "approval_rejected"
  | "step_failed"
  | "workflow_completed"
  | "workflow_failed";

export interface SimulationStep {
  nodeId: string;
  label: string;
  status: SimulationStepStatus;
}

export interface SimulationEvent {
  id: string;
  timestamp: string;
  type: SimulationEventType;
  nodeId?: string;
  message: string;
}

export interface SimulationRun {
  id: string;
  startedAt: string;
  completionStatus: SimulationCompletionStatus;
  failureReason?: string;
  steps: SimulationStep[];
  events: SimulationEvent[];
}

type WorkflowNode = { id: string; label: string };

function createEvent(
  runId: string,
  eventIndex: number,
  startedAt: string,
  type: SimulationEventType,
  message: string,
  nodeId?: string,
): SimulationEvent {
  return {
    id: `${runId}-EVENT-${eventIndex + 1}`,
    timestamp: new Date(new Date(startedAt).getTime() + eventIndex * 1000).toISOString(),
    type,
    ...(nodeId ? { nodeId } : {}),
    message,
  };
}

export function startSimulation(
  nodes: readonly WorkflowNode[],
  id: string,
  startedAt: string,
): SimulationRun {
  const approvalIndex = nodes.findIndex((node) => node.id === "approval");

  const steps = nodes.map((node, index) => ({
    nodeId: node.id,
    label: node.label,
    status: (approvalIndex === -1
      ? index === 0
        ? "Failed"
        : "Pending"
      : index < approvalIndex
        ? "Completed"
        : index === approvalIndex
          ? "Waiting for Approval"
          : "Pending") as SimulationStepStatus,
  }));

  const events: SimulationEvent[] = [
    createEvent(id, 0, startedAt, "workflow_started", "Workflow simulation started."),
  ];

  if (approvalIndex === -1) {
    const reason = "Workflow cannot start because it has no approval step.";

    events.push(
      createEvent(id, 1, startedAt, "step_failed", reason, steps[0]?.nodeId),
      createEvent(id, 2, startedAt, "workflow_failed", reason),
    );

    return {
      id,
      startedAt,
      completionStatus: "Failed",
      failureReason: reason,
      steps,
      events,
    };
  }

  for (let index = 0; index < approvalIndex; index += 1) {
    events.push(
      createEvent(
        id,
        events.length,
        startedAt,
        "step_completed",
        `${steps[index].label} completed successfully.`,
        steps[index].nodeId,
      ),
    );
  }

  events.push(
    createEvent(
      id,
      events.length,
      startedAt,
      "approval_requested",
      "Human approval is required before downstream steps can continue.",
      "approval",
    ),
  );

  return {
    id,
    startedAt,
    completionStatus: "Waiting for approval",
    steps,
    events,
  };
}

export function resolveApproval(
  run: SimulationRun,
  decision: "approve" | "reject",
  failAtNodeId?: string,
): SimulationRun {
  const approvalIndex = run.steps.findIndex((step) => step.nodeId === "approval");

  if (run.completionStatus !== "Waiting for approval" || approvalIndex === -1) {
    return run;
  }

  const events = [...run.events];

  if (decision === "reject") {
    const updatedRun: SimulationRun = {
      ...run,
      completionStatus: "Rejected",
      steps: run.steps.map((step, index) =>
        index === approvalIndex ? { ...step, status: "Rejected" } : step,
      ),
      events: [
        ...events,
        createEvent(
          run.id,
          events.length,
          run.startedAt,
          "approval_rejected",
          "Human approval was rejected. Downstream steps were not executed.",
          "approval",
        ),
      ],
    };

    return updatedRun;
  }

  const failureIndex =
    failAtNodeId !== undefined ? run.steps.findIndex((step) => step.nodeId === failAtNodeId) : -1;

  const approvalEvent = createEvent(
    run.id,
    events.length,
    run.startedAt,
    "approval_granted",
    "Human approval was granted.",
    "approval",
  );

  events.push(approvalEvent);

  if (failAtNodeId !== undefined && failureIndex <= approvalIndex) {
    const failureReason = `Failure step "${failAtNodeId}" must identify a workflow step after approval.`;

    events.push(
      createEvent(run.id, events.length, run.startedAt, "workflow_failed", failureReason),
    );

    return {
      ...run,
      completionStatus: "Failed",
      failureReason,
      steps: run.steps.map((step, index) =>
        index === approvalIndex ? { ...step, status: "Completed" } : step,
      ),
      events,
    };
  }

  if (failureIndex > approvalIndex) {
    const failedStep = run.steps[failureIndex];

    events.push(
      createEvent(
        run.id,
        events.length,
        run.startedAt,
        "step_failed",
        `${failedStep.label} failed during simulation.`,
        failedStep.nodeId,
      ),
      createEvent(
        run.id,
        events.length,
        run.startedAt,
        "workflow_failed",
        `Workflow failed at ${failedStep.label}.`,
        failedStep.nodeId,
      ),
    );
  } else {
    for (let index = approvalIndex + 1; index < run.steps.length; index += 1) {
      events.push(
        createEvent(
          run.id,
          events.length,
          run.startedAt,
          "step_completed",
          `${run.steps[index].label} completed successfully.`,
          run.steps[index].nodeId,
        ),
      );
    }

    events.push(
      createEvent(
        run.id,
        events.length,
        run.startedAt,
        "workflow_completed",
        "All workflow steps completed successfully.",
      ),
    );
  }

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
    events,
  };
}
