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

test("a rejected approval stops the simulation", () => {
  const run = resolveApproval(
    startSimulation(nodes, "SIM-002", "2026-10-27T12:01:00.000Z"),
    "reject",
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
