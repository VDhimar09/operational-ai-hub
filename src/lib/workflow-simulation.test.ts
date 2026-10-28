import assert from "node:assert/strict";
import test from "node:test";
import { resolveApproval, startSimulation } from "./workflow-simulation.ts";

const nodes = [
  { id: "trigger", label: "Trigger" },
  { id: "ai", label: "AI Analysis" },
  { id: "risk", label: "Risk Assessment" },
  { id: "approval", label: "Human Approval" },
  { id: "tasks", label: "Task Creation" },
  { id: "notify", label: "Notifications" },
  { id: "resolve", label: "Resolution" },
];

test("a successful simulation completes all seven workflow steps", () => {
  const waitingRun = startSimulation(nodes, "SIM-001", "2026-10-27T12:00:00.000Z");
  const run = resolveApproval(waitingRun, "approve");
  assert.equal(waitingRun.completionStatus, "Waiting for approval");
  assert.equal(run.completionStatus, "Completed");
  assert.equal(run.steps.length, 7);
  assert.ok(run.steps.every((step) => step.status === "Completed"));
});

test("a rejected approval stops the simulation despite an invalid failure step", () => {
  const run = resolveApproval(
    startSimulation(nodes, "SIM-002", "2026-10-27T12:01:00.000Z"),
    "reject",
    "missing-step",
  );
  assert.equal(run.completionStatus, "Rejected");
  assert.equal(run.steps[3].status, "Rejected");
  assert.ok(run.steps.slice(4).every((step) => step.status === "Pending"));
});

test("a deterministic step failure is recorded and stops later steps", () => {
  const run = resolveApproval(
    startSimulation(nodes, "SIM-003", "2026-10-27T12:02:00.000Z"),
    "approve",
    "tasks",
  );
  assert.equal(run.completionStatus, "Failed");
  assert.equal(run.steps[4].status, "Failed");
  assert.ok(run.steps.slice(5).every((step) => step.status === "Pending"));
});

test("an unknown failure step fails the run without executing downstream steps", () => {
  const run = resolveApproval(
    startSimulation(nodes, "SIM-004", "2026-10-27T12:03:00.000Z"),
    "approve",
    "missing-step",
  );

  assert.equal(run.completionStatus, "Failed");
  assert.equal(
    run.failureReason,
    'Failure step "missing-step" must identify a workflow step after approval.',
  );
  assert.equal(run.steps[3].status, "Completed");
  assert.ok(run.steps.slice(4).every((step) => step.status === "Pending"));
});

test("failure steps before approval, at approval, or empty are invalid", () => {
  for (const [index, failAtNodeId] of ["trigger", "approval", ""].entries()) {
    const run = resolveApproval(
      startSimulation(nodes, `SIM-00${index + 5}`, "2026-10-27T12:04:00.000Z"),
      "approve",
      failAtNodeId,
    );

    assert.equal(run.completionStatus, "Failed", `failure step: "${failAtNodeId}"`);
    assert.equal(run.steps[3].status, "Completed");
    assert.ok(run.steps.slice(4).every((step) => step.status === "Pending"));
  }
});

test("a workflow without approval fails to start and leaves later steps pending", () => {
  const run = startSimulation(
    nodes.filter((node) => node.id !== "approval"),
    "SIM-008",
    "2026-10-27T12:05:00.000Z",
  );

  assert.equal(run.completionStatus, "Failed");
  assert.equal(run.steps[0].status, "Failed");
  assert.ok(run.steps.slice(1).every((step) => step.status === "Pending"));
});
