import { fallbackCourses, fallbackPosts } from "@/data/content";
import type { BlogPost, Course, CourseRegistration, LeadInquiry, ParentReview, TrialBooking } from "@/types";

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT?.replace(/\/+$/, "");
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;

function newDocumentId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

async function createDocument<T extends { id: string }>(collectionId: string | undefined, data: T): Promise<T> {
  if (!endpoint || !projectId || !databaseId || !collectionId) {
    throw new Error("The submission service is not configured yet. Please contact the educator directly.");
  }

  let response: Response;
  try {
    response = await fetch(
      `${endpoint}/databases/${encodeURIComponent(databaseId)}/collections/${encodeURIComponent(collectionId)}/documents`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Project": projectId,
        },
        body: JSON.stringify({ documentId: data.id, data, permissions: [] }),
      },
    );
  } catch {
    throw new Error("The submission service is temporarily unavailable. Please try again shortly.");
  }

  if (!response.ok) {
    throw new Error("Your request could not be saved. Please try again or contact the educator directly.");
  }

  return data;
}

export const api = {
  getCourses: async (): Promise<Course[]> => fallbackCourses,
  getReviews: async (): Promise<ParentReview[]> => [],
  getBlogPosts: async (): Promise<BlogPost[]> => fallbackPosts,
  submitRegistration: (payload: Omit<CourseRegistration, "id" | "status" | "createdAt">) =>
    createDocument(import.meta.env.VITE_APPWRITE_REGISTRATIONS_COLLECTION_ID, { ...payload, id: newDocumentId(), status: "new" as const, createdAt: new Date().toISOString() }),
  submitLead: (payload: Omit<LeadInquiry, "id" | "status" | "createdAt">) =>
    createDocument(import.meta.env.VITE_APPWRITE_LEADS_COLLECTION_ID, { ...payload, id: newDocumentId(), status: "new" as const, createdAt: new Date().toISOString() }),
  bookTrial: (payload: Omit<TrialBooking, "id" | "status" | "createdAt">) =>
    createDocument(import.meta.env.VITE_APPWRITE_TRIALS_COLLECTION_ID, { ...payload, id: newDocumentId(), status: "pending" as const, createdAt: new Date().toISOString() }),
};
