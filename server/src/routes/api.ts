import { Router, Request, Response } from "express";
import { store } from "../services/store.js";
import { 
  validateTrialBooking, 
  validateLeadInquiry, 
  validateProjectEvidence, 
  validateRCALog 
} from "../middleware/validate.js";

const router = Router();

// ==============================================================================
// 1. HEALTH & METADATA
// ==============================================================================

router.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    theme: "Premium Light UI Standard",
  });
});

// ==============================================================================
// 2. AUTHENTICATION & USERS
// ==============================================================================

router.post("/auth/register", (req: Request, res: Response) => {
  const { name, email, age = 12, country = "United States", experienceLevel = "Beginner", interests = ["Foundations & Problem Solving"] } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ success: false, error: "Name and email are required" });
  }

  const { user, profile } = store.registerStudent({
    name,
    email,
    age: Number(age) || 12,
    country,
    experienceLevel,
    interests,
  });

  res.status(201).json({
    success: true,
    user,
    profile,
    token: `sg_session_${user.userId}_${Date.now()}`,
  });
});

router.post("/auth/login", (req: Request, res: Response) => {
  const { email, role } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, error: "Email is required" });
  }

  const user = store.loginUser(email, role);
  if (!user) {
    return res.status(401).json({ success: false, error: "Invalid credentials" });
  }

  res.json({
    success: true,
    user,
    token: `sg_session_${user.userId}_${Date.now()}`,
  });
});

router.get("/users", (req: Request, res: Response) => {
  const users = store.getUsers();
  res.json(users);
});

router.get("/users/:id", (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const user = store.getUserById(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json(user);
});

// ==============================================================================
// 3. STUDENT TELEMETRY & GROWTH PROFILES
// ==============================================================================

router.get("/student/profiles", (req: Request, res: Response) => {
  const profiles = store.getStudentProfiles();
  res.json(profiles);
});

router.get("/student/profile", (req: Request, res: Response) => {
  const studentId = (req.query.studentId as string) || "student-101";
  const profile = store.getStudentProfile(studentId);
  res.json(profile);
});

router.post("/student/metrics", (req: Request, res: Response) => {
  const { studentId = "student-101", metrics, mentorNotes } = req.body;
  const updated = store.updateStudentMetrics(studentId, metrics, mentorNotes);
  res.json(updated);
});

router.post("/student/telemetry/calculate", (req: Request, res: Response) => {
  const { studentId = "student-101" } = req.body;
  const calculated = store.calculateTelemetry(studentId);
  res.json(calculated);
});

router.get("/student/timeline", (req: Request, res: Response) => {
  const studentId = (req.query.studentId as string) || "student-101";
  const timeline = store.getParentTimeline(studentId);
  res.json(timeline);
});

// ==============================================================================
// 4. PROJECT EVIDENCE & VERIFICATION WORKFLOW
// ==============================================================================

router.get("/projects", (req: Request, res: Response) => {
  const status = req.query.status as string;
  if (status === "verified" || status === "public") {
    return res.json(store.getPublicVerifiedProjects());
  }
  res.json(store.getProjects());
});

router.get("/projects/:slug", (req: Request, res: Response) => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const project = store.getProjectBySlug(slug);
  if (!project) {
    return res.status(404).json({ error: "Project evidence not found" });
  }
  res.json(project);
});

router.post("/projects", validateProjectEvidence, (req: Request, res: Response) => {
  try {
    const project = store.addProject(req.body);
    res.status(201).json(project);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Mentor Project Review & Approval Endpoint
router.post("/projects/:id/status", (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { status, mentorFeedback, mentorName } = req.body;
  const updated = store.updateProjectStatus(id, status, mentorFeedback, mentorName);
  if (!updated) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json(updated);
});

// ==============================================================================
// 5. RCA JOURNAL (ROOT CAUSE ANALYSIS)
// ==============================================================================

router.get("/rca", (req: Request, res: Response) => {
  const studentId = (req.query.studentId as string) || "student-101";
  const logs = store.getRCALogs(studentId);
  res.json(logs);
});

router.post("/rca", validateRCALog, (req: Request, res: Response) => {
  try {
    const log = store.addRCALog(req.body);
    res.status(201).json(log);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ==============================================================================
// 6. GENIUSAI SOCRATIC LEARNING MENTOR
// ==============================================================================

router.post("/ai/mentor", (req: Request, res: Response) => {
  try {
    const { studentId = "student-101", moduleId = "module-1", codeSnippet = "", userPrompt = "", chatHistory = [] } = req.body;
    const response = store.aiMentorRespond({
      studentId,
      moduleId,
      codeSnippet,
      userPrompt,
      chatHistory,
    });
    res.json(response);
  } catch (err: any) {
    res.status(500).json({ error: "AI Mentor inference error" });
  }
});

// ==============================================================================
// 7. COURSES & CURRICULUM MODULES
// ==============================================================================

router.get("/courses", (req: Request, res: Response) => {
  res.json(store.getCourses());
});

router.get("/courses/:slug", (req: Request, res: Response) => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const course = store.getCourseBySlug(slug);
  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }
  res.json(course);
});

router.get("/modules", (req: Request, res: Response) => {
  res.json(store.getModules());
});

router.get("/modules/:id", (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const mod = store.getModuleById(id);
  if (!mod) {
    return res.status(404).json({ error: "Module not found" });
  }
  res.json(mod);
});

// ==============================================================================
// 8. TRIAL BOOKINGS & CRM
// ==============================================================================

router.get("/trials", (req: Request, res: Response) => {
  res.json(store.getTrials());
});

router.post("/trials", validateTrialBooking, (req: Request, res: Response) => {
  try {
    const trial = store.addTrial(req.body);
    res.status(201).json(trial);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.patch("/trials/:id/status", (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { status } = req.body;
  const updated = store.updateTrialStatus(id, status);
  if (!updated) {
    return res.status(404).json({ error: "Trial not found" });
  }
  res.json(updated);
});

// ==============================================================================
// 9. LEADS & CONTACT INQUIRIES
// ==============================================================================

router.get("/leads", (req: Request, res: Response) => {
  res.json(store.getLeads());
});

router.post("/leads", validateLeadInquiry, (req: Request, res: Response) => {
  try {
    const lead = store.addLead(req.body);
    res.status(201).json(lead);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// ==============================================================================
// 10. REVIEWS, BLOGS & ADMIN ANALYTICS
// ==============================================================================

router.get("/reviews", (req: Request, res: Response) => {
  res.json(store.getReviews());
});

router.get("/blog", (req: Request, res: Response) => {
  res.json(store.getBlogs());
});

router.get("/blog/:slug", (req: Request, res: Response) => {
  const slug = Array.isArray(req.params.slug) ? req.params.slug[0] : req.params.slug;
  const post = store.getBlogBySlug(slug);
  if (!post) {
    return res.status(404).json({ error: "Blog post not found" });
  }
  res.json(post);
});

router.get("/admin/analytics", (req: Request, res: Response) => {
  const analytics = store.getPlatformAnalytics();
  res.json(analytics);
});

// ==============================================================================
// 11. PRODUCT FEEDBACK & LIGHTWEIGHT EVENT TELEMETRY
// ==============================================================================

router.get("/feedback", (req: Request, res: Response) => {
  const role = req.query.role as string;
  res.json(store.getFeedback(role));
});

router.post("/feedback", (req: Request, res: Response) => {
  try {
    const feedback = store.addFeedback(req.body);
    res.status(201).json(feedback);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/events", (req: Request, res: Response) => {
  try {
    const event = store.trackEvent(req.body);
    res.status(201).json(event);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
