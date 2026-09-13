import { ID } from "node-appwrite";
import { APPWRITE_DB_ID, appwriteDatabases, isAppwriteConfigured } from "../config/appwrite.js";
import type { BlogPost, Course, CourseRegistration, LeadInquiry, ParentReview, TrialBooking } from "../types/index.js";

const courses: Course[] = [
  {
    id: "course-foundations", phase: 1, title: "Coding & Creative Logic", slug: "coding-creative-logic",
    ageGroup: "Ages 8-12", duration: "12 weeks", classFrequency: "2 or 3 live classes per week", level: "Beginner",
    description: "A friendly first step into coding through games, puzzles, and visual projects.",
    primaryOutcome: "Build and explain an original interactive project.",
    skillsDeveloped: ["Logical thinking", "Creative problem-solving", "Confident debugging"],
  },
  {
    id: "course-creator", phase: 2, title: "Web Creator Lab", slug: "web-creator-lab",
    ageGroup: "Ages 12-18", duration: "16 weeks", classFrequency: "2 or 3 live classes per week", level: "Intermediate",
    description: "Turn ideas into responsive websites while learning how real digital products are made.",
    primaryOutcome: "Design, build, and publish a complete web project.",
    skillsDeveloped: ["HTML, CSS & JavaScript", "Product thinking", "Publishing projects"],
  },
  {
    id: "course-ai", phase: 3, title: "Practical AI for Students", slug: "practical-ai-for-students",
    ageGroup: "Ages 13-18", duration: "10 weeks", classFrequency: "2 or 3 live classes per week", level: "Intermediate",
    description: "Use modern AI responsibly for research, study, creativity, and simple automation.",
    primaryOutcome: "Create a useful AI-supported study workflow.",
    skillsDeveloped: ["Prompt design", "Fact checking", "Responsible AI use"],
  },
];

const posts: BlogPost[] = [
  { id: "post-1", title: "How to help a child become a confident problem-solver", slug: "confident-problem-solver", excerpt: "Three simple habits parents can use to encourage curiosity without giving away every answer.", content: "", author: "Skillify Genius", category: "Parent guide", tags: ["parents", "learning"], publishedAt: "2026-03-10T00:00:00.000Z", readTime: "4 min read" },
  { id: "post-2", title: "Projects make technology learning stick", slug: "project-based-learning", excerpt: "Why creating something meaningful builds deeper understanding than memorising isolated commands.", content: "", author: "Skillify Genius", category: "Learning", tags: ["projects", "coding"], publishedAt: "2026-02-18T00:00:00.000Z", readTime: "5 min read" },
  { id: "post-3", title: "A safe and useful introduction to AI for teenagers", slug: "safe-ai-for-teens", excerpt: "A practical framework for using AI thoughtfully, checking outputs, and protecting personal information.", content: "", author: "Skillify Genius", category: "AI literacy", tags: ["ai", "safety"], publishedAt: "2026-01-24T00:00:00.000Z", readTime: "6 min read" },
];

const reviews: ParentReview[] = [];
const localRegistrations: CourseRegistration[] = [];
const localLeads: LeadInquiry[] = [];
const localTrials: TrialBooking[] = [];

async function persist(collectionId: string, data: Record<string, unknown>) {
  if (!isAppwriteConfigured || !appwriteDatabases) return;
  await appwriteDatabases.createDocument(APPWRITE_DB_ID, collectionId, ID.unique(), data);
}

export const store = {
  getCourses: () => courses,
  getCourseBySlug: (slug: string) => courses.find((course) => course.slug === slug),
  getBlogPosts: () => posts,
  getBlogPostBySlug: (slug: string) => posts.find((post) => post.slug === slug),
  getVerifiedReviews: () => reviews.filter((review) => review.verified),

  async addRegistration(input: Omit<CourseRegistration, "id" | "status" | "createdAt">) {
    const registration: CourseRegistration = { ...input, id: ID.unique(), status: "new", createdAt: new Date().toISOString() };
    await persist(process.env.APPWRITE_REGISTRATIONS_COLLECTION_ID || "course_registrations", registration as unknown as Record<string, unknown>);
    if (!isAppwriteConfigured) localRegistrations.push(registration);
    return registration;
  },

  async addLead(input: Omit<LeadInquiry, "id" | "status" | "createdAt">) {
    const lead: LeadInquiry = { ...input, id: ID.unique(), status: "new", createdAt: new Date().toISOString() };
    await persist(process.env.APPWRITE_LEADS_COLLECTION_ID || "leads", lead as unknown as Record<string, unknown>);
    if (!isAppwriteConfigured) localLeads.push(lead);
    return lead;
  },

  async addTrial(input: Omit<TrialBooking, "id" | "status" | "createdAt">) {
    const trial: TrialBooking = { ...input, id: ID.unique(), status: "pending", createdAt: new Date().toISOString() };
    await persist(process.env.APPWRITE_TRIALS_COLLECTION_ID || "trial_bookings", trial as unknown as Record<string, unknown>);
    if (!isAppwriteConfigured) localTrials.push(trial);
    return trial;
  },

  getLocalCounts: () => ({ registrations: localRegistrations.length, leads: localLeads.length, trials: localTrials.length }),
};
