import { Client, Account, Databases, Storage } from "appwrite";

const endpoint =
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
  process.env.VITE_APPWRITE_ENDPOINT ||
  "https://api.attanjil.com/v1";

const projectId =
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ||
  process.env.VITE_APPWRITE_PROJECT_ID ||
  "6a888ff500009da26174";

export const client = new Client();

if (typeof window !== "undefined" && projectId && endpoint) {
  client.setEndpoint(endpoint).setProject(projectId);
}

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const APPWRITE_CONFIG = {
  endpoint,
  projectId,
  projectName: "Skillify Genius - EdTech",
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || "skillify_genius_db",
  collections: {
    courses: "courses",
    modules: "curriculum_modules",
    projects: "project_evidence",
    trials: "trial_bookings",
    leads: "lead_inquiries",
    rcaLogs: "rca_logs",
    profiles: "student_profiles",
  },
};
