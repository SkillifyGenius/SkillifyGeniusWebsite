import type { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

export const courseRegistrationSchema = z.object({
  studentName: z.string().trim().min(2).max(80),
  parentName: z.string().trim().min(2).max(80),
  phone: z.string().trim().min(6).max(30),
  email: z.union([z.string().trim().email(), z.literal("")]).optional().transform((value) => value || undefined),
  courseSlug: z.string().trim().min(1).max(120),
  message: z.string().trim().max(500).optional(),
});

export const leadInquirySchema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().min(2).max(120),
  message: z.string().trim().min(5).max(1000),
});

export const trialBookingSchema = z.object({
  parentName: z.string().trim().min(2).max(80),
  studentName: z.string().trim().min(2).max(80),
  studentAge: z.number().int().min(6).max(18),
  email: z.string().trim().email(),
  phone: z.string().trim().min(6).max(30),
  courseSlug: z.string().trim().min(1).max(120),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid preferred date").refine((date) => date >= new Date().toISOString().slice(0, 10), "Preferred date cannot be in the past"),
  preferredTime: z.string().trim().min(2).max(120),
  timezone: z.string().trim().min(1).max(80),
  message: z.string().trim().max(500).optional(),
});

export function validateBody(schema: z.ZodTypeAny) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: "Validation failed", details: error.errors.map((issue) => ({ field: issue.path.join("."), message: issue.message })) });
      }
      return res.status(500).json({ error: "Validation failed unexpectedly" });
    }
  };
}

export const validateCourseRegistration = validateBody(courseRegistrationSchema);
export const validateLeadInquiry = validateBody(leadInquirySchema);
export const validateTrialBooking = validateBody(trialBookingSchema);
