import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validateBody = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: err.errors.map((e) => ({
            field: e.path.join("."),
            message: e.message,
          })),
        });
      }
      return res.status(500).json({ error: "Internal validation error" });
    }
  };
};

export const trialBookingSchema = z.object({
  parentName: z.string().min(2, "Parent name is required"),
  parentEmail: z.string().email("Valid email required"),
  parentPhone: z.string().min(6, "Valid phone number required"),
  childName: z.string().min(2, "Child name is required"),
  childAge: z.number().int().min(5).max(19),
  country: z.string().default("United States"),
  timezone: z.string().default("America/New_York"),
  preferredSlot: z.string().min(1, "Preferred slot is required"),
  interests: z.array(z.string()).default([]),
});

export const leadInquirySchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

export const projectEvidenceSchema = z.object({
  studentId: z.string().default("student-101"),
  title: z.string().min(3, "Title required"),
  slug: z.string().min(3, "Slug required"),
  studentName: z.string().min(2, "Student name required"),
  studentAge: z.number().int().min(5).max(19),
  phase: z.number().int().min(1).max(4),
  description: z.string().min(10, "Description required"),
  skillsDemonstrated: z.array(z.string()).min(1),
  demoUrl: z.string().url("Valid demo URL required").optional().or(z.literal("")),
  repoUrl: z.string().url("Valid repository URL required").optional().or(z.literal("")),
  frameworkStage: z.enum(["deconstruct", "architect", "build", "automate", "defend"]).default("defend"),
  mentorFeedback: z.string().default("Project verified for code quality and autonomous execution."),
  mentorName: z.string().default("Alex (Senior Technology Mentor)"),
});

export const rcaLogSchema = z.object({
  studentId: z.string().default("student-101"),
  moduleId: z.string().min(1, "Module ID required"),
  moduleTitle: z.string().min(1, "Module title required"),
  bugSummary: z.string().min(5, "Bug summary required"),
  rootCause: z.string().min(5, "Root cause explanation required"),
  solution: z.string().min(5, "Solution details required"),
  preventionLearned: z.string().min(5, "Prevention reflection required"),
});

export const validateTrialBooking = validateBody(trialBookingSchema);
export const validateLeadInquiry = validateBody(leadInquirySchema);
export const validateProjectEvidence = validateBody(projectEvidenceSchema);
export const validateRCALog = validateBody(rcaLogSchema);
