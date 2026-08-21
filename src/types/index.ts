// ==============================================================================
// SKILLIFY GENIUS 2.0 - PRODUCTION CORE DOMAIN TYPES
// ==============================================================================

export type UserRole = "student" | "parent" | "mentor" | "admin";

export interface User {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  studentId?: string; // For parents and students
  createdAt: string;
}

export interface EngineeringGrowthMetrics {
  problemSolving: number; // 0-100
  selfLearning: number; // 0-100
  programming: number; // 0-100
  systemThinking: number; // 0-100
  creativity: number; // 0-100
  engineeringMindset: number; // 0-100
  updatedAt?: string;
}

export interface StudentGrowthProfile {
  studentId: string;
  studentName: string;
  age: number;
  grade?: string;
  currentPhase: number;
  level: string;
  activeSprint: string;
  learningPath: string;
  metrics: EngineeringGrowthMetrics;
  metricsHistory?: {
    date: string;
    metrics: EngineeringGrowthMetrics;
  }[];
  verifiedProjectsCount: number;
  challengesSolved: number;
  strengths: string[];
  focusAreas: string[];
  recentMentorNotes: string;
  isAtRisk?: boolean;
  atRiskReason?: string;
}

export interface CurriculumModule {
  id: string;
  phase: number;
  title: string;
  slug: string;
  description: string;
  moduleOrder: number;
  project: string;
  skills: string[];
  challengeBrief?: string;
  hints?: string[];
  initialCode?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  phase: number;
  ageGroup: string;
  duration: string;
  classFrequency: string;
  level: string;
  description: string;
  primaryOutcome: string;
  skillsDeveloped: string[];
  modules: CurriculumModule[];
}

export type ProjectStatus = "submitted" | "under_review" | "approved" | "verified_capstone";

export interface ProjectEvidence {
  id: string;
  title: string;
  slug: string;
  studentId: string;
  studentName: string;
  studentAge: number;
  phase: number;
  description: string;
  skillsDemonstrated: string[];
  demoUrl?: string;
  repoUrl?: string;
  screenshots?: string[];
  frameworkStage: "deconstruct" | "architect" | "build" | "automate" | "defend";
  mentorFeedback?: string;
  mentorName?: string;
  mentorId?: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface RCALog {
  id: string;
  studentId: string;
  moduleId: string;
  moduleTitle: string;
  bugSummary: string;
  rootCause: string;
  solution: string;
  preventionLearned: string;
  createdAt: string;
}

export interface MentorReport {
  id: string;
  studentId: string;
  studentName: string;
  mentorId: string;
  mentorName: string;
  weekEnding: string;
  weeklySummary: string;
  strengthsObserved: string[];
  improvementAreas: string[];
  attendanceRate: string;
  status: "draft" | "published";
  createdAt: string;
}

export interface ParentGrowthTimelineItem {
  id: string;
  month: string;
  year: number;
  title: string;
  description: string;
  category: "capstone" | "debugging" | "architecture" | "milestone";
  badgeText: string;
  skillImpact: string;
}

export interface TrialBooking {
  id: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  childName: string;
  childAge: number;
  country: string;
  timezone: string;
  preferredSlot: string;
  interests: string[];
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface LeadInquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new" | "contacted" | "closed";
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  category?: string;
  publishedAt: string;
  tags: string[];
  readTime: string;
}

export interface ParentReview {
  id: string;
  reviewerName: string;
  role: string;
  location: string;
  studentAge: number;
  rating: number; // 1-5
  comment: string;
  studentProjectHighlight?: string;
  verified?: boolean;
}

export interface PlatformAnalytics {
  totalStudents: number;
  activeLearners: number;
  completedProjects: number;
  trialConversionRate: number; // e.g. 78%
  courseCompletionRate: number; // e.g. 94%
  activeCohortsCount: number;
  monthlyEnrollmentGrowth: { month: string; students: number }[];
  phaseDistribution: { phase: string; count: number; percentage: number }[];
  challengesSolvedTotal: number;
  rcaLoggedTotal: number;
}

export interface AiMentorRequest {
  studentId: string;
  moduleId: string;
  codeSnippet: string;
  userPrompt: string;
  chatHistory: { role: "ai" | "user"; text: string }[];
}

export interface AiMentorResponse {
  reply: string;
  suggestedReflectionPrompt?: string;
  detectedMistakePattern?: string;
  unlockedHintLevel?: number;
}

export interface ProductFeedback {
  id: string;
  userRole: UserRole;
  userName: string;
  category: "ease" | "confusion" | "difficulty" | "suggestion" | "trust";
  message: string;
  rating?: number;
  createdAt: string;
}

export interface AnalyticsEvent {
  id: string;
  eventName: "homepage_visit" | "trial_click" | "pathfinder_complete" | "project_submit" | "module_complete" | "rca_log";
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface StudentRegistrationPayload {
  name: string;
  email: string;
  password?: string;
  age: number;
  country: string;
  experienceLevel: "Beginner" | "Intermediate" | "Advanced";
  interests: string[];
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token?: string;
  error?: string;
}
