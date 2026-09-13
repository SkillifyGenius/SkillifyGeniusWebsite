import { Router } from "express";
import { APPWRITE_SERVER_CONFIG } from "../config/appwrite.js";
import { validateCourseRegistration, validateLeadInquiry, validateTrialBooking } from "../middleware/validate.js";
import { store } from "../services/store.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "healthy", service: "skillify-api", appwriteConfigured: APPWRITE_SERVER_CONFIG.isConfigured, timestamp: new Date().toISOString() });
});

router.get("/courses", (_req, res) => res.json(store.getCourses()));
router.get("/courses/:slug", (req, res) => {
  const course = store.getCourseBySlug(String(req.params.slug));
  return course ? res.json(course) : res.status(404).json({ error: "Course not found" });
});

router.get("/reviews", (_req, res) => res.json(store.getVerifiedReviews()));
router.get("/blog", (_req, res) => res.json(store.getBlogPosts()));
router.get("/blog/:slug", (req, res) => {
  const post = store.getBlogPostBySlug(String(req.params.slug));
  return post ? res.json(post) : res.status(404).json({ error: "Article not found" });
});

router.post("/registrations", validateCourseRegistration, async (req, res) => {
  try {
    res.status(201).json(await store.addRegistration(req.body));
  } catch (error) {
    console.error("Registration persistence failed", error);
    res.status(503).json({ error: "Registration is temporarily unavailable. Please contact the teacher directly." });
  }
});

router.post("/leads", validateLeadInquiry, async (req, res) => {
  try {
    res.status(201).json(await store.addLead(req.body));
  } catch (error) {
    console.error("Lead persistence failed", error);
    res.status(503).json({ error: "The contact service is temporarily unavailable. Please email the teacher directly." });
  }
});

router.post("/trials", validateTrialBooking, async (req, res) => {
  try {
    res.status(201).json(await store.addTrial(req.body));
  } catch (error) {
    console.error("Trial persistence failed", error);
    res.status(503).json({ error: "Trial booking is temporarily unavailable. Please contact the teacher directly." });
  }
});

export default router;
