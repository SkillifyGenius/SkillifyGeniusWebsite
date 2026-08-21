import {
  Course,
  CurriculumModule,
  ProjectEvidence,
  StudentGrowthProfile,
  TrialBooking,
  LeadInquiry,
  BlogPost,
  ParentReview,
  RCALog,
  User,
  ParentGrowthTimelineItem,
  PlatformAnalytics,
  AiMentorRequest,
  AiMentorResponse,
  ProjectStatus,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      cache: options?.method === "POST" || options?.method === "PATCH" ? "no-store" : "default",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `HTTP error! status: ${res.status}`);
    }

    return (await res.json()) as T;
  } catch (error) {
    console.warn(`[Client API] Fetch failed for ${endpoint}, using fallback provider.`, error);
    return getFallbackData<T>(endpoint, options);
  }
}

// ==============================================================================
// TYPED API CLIENT METHODS
// ==============================================================================

export const api = {
  // Users & Auth
  getUsers: () => fetchJson<User[]>("/users"),
  getUserById: (id: string) => fetchJson<User>(`/users/${id}`),
  registerStudent: (payload: import("@/types").StudentRegistrationPayload) =>
    fetchJson<import("@/types").AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  loginUser: (email: string, role?: string) =>
    fetchJson<import("@/types").AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, role }),
    }),

  // Courses & Curriculum
  getCourses: () => fetchJson<Course[]>("/courses"),
  getCourseBySlug: (slug: string) => fetchJson<Course>(`/courses/${slug}`),
  getModules: () => fetchJson<CurriculumModule[]>("/modules"),
  getModuleById: (id: string) => fetchJson<CurriculumModule>(`/modules/${id}`),

  // Student Profiles & Dynamic Telemetry
  getStudentProfiles: () => fetchJson<StudentGrowthProfile[]>("/student/profiles"),
  getStudentProfile: (studentId: string = "student-101") =>
    fetchJson<StudentGrowthProfile>(`/student/profile?studentId=${studentId}`),
  updateStudentMetrics: (
    metrics: Partial<StudentGrowthProfile["metrics"]>,
    mentorNotes?: string,
    studentId: string = "student-101"
  ) =>
    fetchJson<StudentGrowthProfile>("/student/metrics", {
      method: "POST",
      body: JSON.stringify({ studentId, metrics, mentorNotes }),
    }),
  calculateTelemetry: (studentId: string = "student-101") =>
    fetchJson<StudentGrowthProfile["metrics"]>("/student/telemetry/calculate", {
      method: "POST",
      body: JSON.stringify({ studentId }),
    }),
  getParentTimeline: (studentId: string = "student-101") =>
    fetchJson<ParentGrowthTimelineItem[]>(`/student/timeline?studentId=${studentId}`),

  // Project Evidence & Verification Workflow
  getProjects: (status?: string) =>
    fetchJson<ProjectEvidence[]>(status ? `/projects?status=${status}` : "/projects"),
  getProjectBySlug: (slug: string) => fetchJson<ProjectEvidence>(`/projects/${slug}`),
  submitProject: (project: Omit<ProjectEvidence, "id" | "createdAt" | "status">) =>
    fetchJson<ProjectEvidence>("/projects", {
      method: "POST",
      body: JSON.stringify(project),
    }),
  updateProjectStatus: (
    projectId: string,
    status: ProjectStatus,
    mentorFeedback?: string,
    mentorName?: string
  ) =>
    fetchJson<ProjectEvidence>(`/projects/${projectId}/status`, {
      method: "POST",
      body: JSON.stringify({ status, mentorFeedback, mentorName }),
    }),

  // RCA Journal
  getRCALogs: (studentId: string = "student-101") =>
    fetchJson<RCALog[]>(`/rca?studentId=${studentId}`),
  submitRCALog: (log: Omit<RCALog, "id" | "createdAt">) =>
    fetchJson<RCALog>("/rca", {
      method: "POST",
      body: JSON.stringify(log),
    }),

  // GeniusAI Socratic Mentor
  askAiMentor: (req: AiMentorRequest) =>
    fetchJson<AiMentorResponse>("/ai/mentor", {
      method: "POST",
      body: JSON.stringify(req),
    }),

  // Trials & Leads
  getTrials: () => fetchJson<TrialBooking[]>("/trials"),
  bookTrial: (trial: Omit<TrialBooking, "id" | "status" | "createdAt">) =>
    fetchJson<TrialBooking>("/trials", {
      method: "POST",
      body: JSON.stringify(trial),
    }),
  updateTrialStatus: (id: string, status: TrialBooking["status"]) =>
    fetchJson<TrialBooking>(`/trials/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  getLeads: () => fetchJson<LeadInquiry[]>("/leads"),
  submitLead: (lead: Omit<LeadInquiry, "id" | "status" | "createdAt">) =>
    fetchJson<LeadInquiry>("/leads", {
      method: "POST",
      body: JSON.stringify(lead),
    }),

  // Reviews, Blogs & Admin Analytics
  getReviews: () => fetchJson<ParentReview[]>("/reviews"),
  getBlogPosts: () => fetchJson<BlogPost[]>("/blog"),
  getBlogPostBySlug: (slug: string) => fetchJson<BlogPost>(`/blog/${slug}`),
  getAdminAnalytics: () => fetchJson<PlatformAnalytics>("/admin/analytics"),

  // Feedback & Event Telemetry
  getFeedback: (role?: string) =>
    fetchJson<import("@/types").ProductFeedback[]>(role ? `/feedback?role=${role}` : "/feedback"),
  submitFeedback: (feedback: Omit<import("@/types").ProductFeedback, "id" | "createdAt">) =>
    fetchJson<import("@/types").ProductFeedback>("/feedback", {
      method: "POST",
      body: JSON.stringify(feedback),
    }),
  trackEvent: (event: Omit<import("@/types").AnalyticsEvent, "id" | "createdAt">) =>
    fetchJson<import("@/types").AnalyticsEvent>("/events", {
      method: "POST",
      body: JSON.stringify(event),
    }),


  // Pathfinder Diagnostic Quiz Evaluation
  evaluatePathfinder: async (answers: {
    age: number;
    experience: string;
    interest: string;
    goal: string;
  }) => {
    let recommendedPhase = 1;
    let trackName = "Foundational Computational Thinking";
    let startingModule = "module-1";

    if (answers.age >= 12 || answers.experience === "intermediate") {
      recommendedPhase = 2;
      trackName = "Full-Stack Web Apps & Creator Lab";
      startingModule = "module-2";
    }
    if (answers.interest === "ai" || answers.experience === "advanced") {
      recommendedPhase = 3;
      trackName = "AI Tools & Task Automation";
      startingModule = "module-3";
    }
    if (answers.interest === "security") {
      recommendedPhase = 4;
      trackName = "Cyber Safety & Ethical Defense";
      startingModule = "module-4";
    }

    const readinessScore = Math.min(96, Math.max(68, 70 + (answers.age - 6) * 2 + (answers.experience === "advanced" ? 12 : 6)));

    return {
      recommendedPhase,
      recommendedTrack: trackName,
      startingModule,
      readinessScore,
      customRoadmap: [
        `Stage 1: Core Problem Solver Framework Foundations (Ages ${answers.age})`,
        `Stage 2: Hands-On Project Architecture: ${answers.interest.toUpperCase()} Focus`,
        `Stage 3: Cloud Database & Deployment Integration`,
        `Stage 4: Public Portfolio Showcase & Senior Mentor Defense`,
      ],
    };
  },
  getFAQs: async () => [
    {
      id: "faq-1",
      question: "How is Skillify Genius different from typical kid coding apps or drag-and-drop bootcamps?",
      answer: "Most programs focus on teaching syntax memorization or toy games. Skillify Genius is a future skills academy that teaches how to think, deconstruct problems, automate tasks using AI, and write clean, deployable software using our Socratic Problem Solver Framework™."
    },
    {
      id: "faq-2",
      question: "What happens during the free 1-on-1 diagnostic assessment session?",
      answer: "Your child spends 30 minutes solving an interactive logic challenge with a certified technology mentor, followed by 15 minutes of parent consultation where we share cognitive observations and a personalized curriculum roadmap."
    },
    {
      id: "faq-3",
      question: "Can parents verify the software projects their children build?",
      answer: "Yes! Through the Parent Trust Portal, parents can test live deployed web applications, inspect student code repositories, and read qualitative weekly progress notes written by senior software practitioners."
    },
    {
      id: "faq-4",
      question: "What age groups and global timezones do you support?",
      answer: "We support students aged 6-18 worldwide, with scheduling tailored to US Eastern, US Pacific, UK GMT/BST, and Central European Time (CET)."
    }
  ]
};

// ==============================================================================
// RESILIENT LOCAL FALLBACK PROVIDER
// ==============================================================================

function getFallbackData<T>(endpoint: string, options?: RequestInit): T {
  if (endpoint.includes("/student/profile")) {
    return {
      studentId: "student-101",
      studentName: "Liam Vance",
      age: 13,
      grade: "8th Grade",
      currentPhase: 2,
      level: "Full-Stack Creator (Level 2)",
      activeSprint: "Phase 2: Creator Lab - Web Architecture & Appwrite Cloud",
      learningPath: "full-stack-web-apps",
      metrics: {
        problemSolving: 82,
        selfLearning: 88,
        programming: 74,
        systemThinking: 68,
        creativity: 85,
        engineeringMindset: 76,
        updatedAt: new Date().toISOString(),
      },
      verifiedProjectsCount: 5,
      challengesSolved: 34,
      strengths: ["Deconstructing complex logic", "Asynchronous fetch pipelines", "Independent RCA logging"],
      focusAreas: ["Zod input validation", "Database query indexing", "Unit test coverage"],
      recentMentorNotes: "Liam demonstrated superb Socratic independence while resolving an asynchronous race condition.",
      isAtRisk: false,
    } as unknown as T;
  }

  if (endpoint.includes("/student/timeline")) {
    return [
      { id: "pt-1", month: "January", year: 2026, title: "Shipped 2D Physics Game Engine", description: "Architected custom gravity, velocity vectors, and boundary collisions from scratch in JavaScript.", category: "capstone", badgeText: "Phase 1 Capstone", skillImpact: "+12% Problem Solving" },
      { id: "pt-2", month: "February", year: 2026, title: "Resolved 20 Debugging & RCA Challenges", description: "Mastered unassisted debugging and authored Root Cause Analysis reflections for edge case bugs.", category: "debugging", badgeText: "Self-Learning Milestone", skillImpact: "+18% Self-Learning Ability" },
      { id: "pt-3", month: "March", year: 2026, title: "Full-Stack Appwrite Database Integration", description: "Built cloud data synchronization, user session state, and responsive Tailwind layouts.", category: "architecture", badgeText: "Creator Lab Milestone", skillImpact: "+15% System & Cloud Thinking" },
    ] as unknown as T;
  }

  if (endpoint.includes("/admin/analytics")) {
    return {
      totalStudents: 144,
      activeLearners: 128,
      completedProjects: 64,
      trialConversionRate: 78,
      courseCompletionRate: 94,
      activeCohortsCount: 18,
      monthlyEnrollmentGrowth: [
        { month: "Nov", students: 72 },
        { month: "Dec", students: 95 },
        { month: "Jan", students: 118 },
        { month: "Feb", students: 134 },
        { month: "Mar", students: 144 },
      ],
      phaseDistribution: [
        { phase: "Phase 1: Foundation", count: 48, percentage: 33 },
        { phase: "Phase 2: Creator Lab", count: 52, percentage: 36 },
        { phase: "Phase 3: AI Automation", count: 28, percentage: 20 },
        { phase: "Phase 4: Cyber Defense", count: 16, percentage: 11 },
      ],
      challengesSolvedTotal: 482,
      rcaLoggedTotal: 128,
    } as unknown as T;
  }

  if (endpoint.includes("/ai/mentor")) {
    return {
      reply: "Great approach! Let's deconstruct: What is the state of your variables before that function executes?",
      suggestedReflectionPrompt: "How can you test this edge case in the sandbox?",
    } as unknown as T;
  }

  return [] as unknown as T;
}
