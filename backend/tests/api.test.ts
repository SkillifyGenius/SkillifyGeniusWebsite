import assert from "node:assert/strict";
import test from "node:test";
import { courseRegistrationSchema, leadInquirySchema, trialBookingSchema } from "../src/middleware/validate.js";
import { store } from "../src/services/store.js";

test("public course catalog has complete enrollment information", () => {
  const courses = store.getCourses();
  assert.ok(courses.length >= 3);
  for (const course of courses) {
    assert.ok(course.title && course.slug && course.primaryOutcome);
    assert.ok(course.skillsDeveloped.length > 0);
  }
});

test("registration schema accepts a minimal parent-friendly submission", () => {
  const result = courseRegistrationSchema.safeParse({ studentName: "Sam Lee", parentName: "Jordan Lee", phone: "+880 1700 000000", courseSlug: "web-creator-lab" });
  assert.equal(result.success, true);
});

test("registration schema rejects incomplete submissions", () => {
  const result = courseRegistrationSchema.safeParse({ studentName: "S", phone: "12" });
  assert.equal(result.success, false);
});

test("contact schema validates email and message length", () => {
  assert.equal(leadInquirySchema.safeParse({ fullName: "Jordan Lee", email: "parent@example.com", subject: "Course fit", message: "Could we discuss the best starting point?" }).success, true);
  assert.equal(leadInquirySchema.safeParse({ fullName: "Jordan Lee", email: "invalid", subject: "Hi", message: "No" }).success, false);
});

test("trial schema accepts a complete booking request with dynamic slot format", () => {
  const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const result = trialBookingSchema.safeParse({
    parentName: "Jordan Lee", studentName: "Sam Lee", studentAge: 12,
    email: "parent@example.com", phone: "+880 1700 000000",
    courseSlug: "web-creator-lab", preferredDate: futureDate,
    preferredTime: "Morning: 6:00 AM - 7:00 AM (6:00 AM - 7:00 AM BD)", timezone: "Asia/Dhaka",
  });
  assert.equal(result.success, true);
});

test("trial schema rejects an invalid age and date format", () => {
  const result = trialBookingSchema.safeParse({
    parentName: "Jordan Lee", studentName: "Sam Lee", studentAge: 4,
    email: "parent@example.com", phone: "+880 1700 000000",
    courseSlug: "web-creator-lab", preferredDate: "tomorrow",
    preferredTime: "x", timezone: "Asia/Dhaka",
  });
  assert.equal(result.success, false);
});
