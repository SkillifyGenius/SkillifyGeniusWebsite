import test from "node:test";
import assert from "node:assert";
import { store } from "../server/src/services/store.js";

test("Skillify Genius 2.0 Telemetry Calculation", () => {
  const telemetry = store.calculateTelemetry("student-101");
  assert.ok(telemetry.problemSolving >= 60, "Problem solving score should be >= 60");
  assert.ok(telemetry.selfLearning >= 65, "Self learning score should be >= 65");
  assert.ok(telemetry.programming >= 55, "Programming score should be >= 55");
  assert.ok(telemetry.systemThinking >= 50, "System thinking score should be >= 50");
  assert.ok(telemetry.creativity >= 70, "Creativity score should be >= 70");
  assert.ok(telemetry.engineeringMindset >= 58, "Engineering mindset score should be >= 58");
});

test("Socratic AI Mentor: Infinite loop detection", () => {
  const response = store.aiMentorRespond({
    studentId: "student-101",
    moduleId: "module-1",
    codeSnippet: "while (true) { console.log('infinite'); }",
    userPrompt: "Why does my code freeze?",
    chatHistory: [],
  });

  assert.ok(
    response.detectedMistakePattern?.includes("Infinite Loop"),
    "Should detect infinite loop"
  );
  assert.ok(
    response.reply.includes("termination condition"),
    "Should provide Socratic termination hint"
  );
});

test("Socratic AI Mentor: Physics velocity tunneling detection", () => {
  const response = store.aiMentorRespond({
    studentId: "student-101",
    moduleId: "module-1",
    codeSnippet: "ball.y += ball.vy;",
    userPrompt: "The ball is falling through the floor!",
    chatHistory: [],
  });

  assert.ok(
    response.detectedMistakePattern?.includes("Physics Velocity Tunneling"),
    "Should detect physics tunneling"
  );
  assert.ok(
    response.reply.includes("clamp"),
    "Should prompt to clamp boundary position"
  );
});

test("Project Verification Lifecycle", () => {
  const project = store.addProject({
    studentId: "student-101",
    studentName: "Liam Vance",
    studentAge: 13,
    phase: 2,
    title: "Test Verification Project",
    slug: "test-verification-project",
    description: "Testing verification workflow",
    skillsDemonstrated: ["TypeScript", "Appwrite"],
    frameworkStage: "defend",
    status: "submitted",
  });

  assert.strictEqual(project.status, "submitted");

  const approved = store.updateProjectStatus(
    project.id,
    "approved",
    "Code verified for production."
  );

  assert.strictEqual(approved?.status, "approved");
  assert.strictEqual(approved?.mentorFeedback, "Code verified for production.");
});
