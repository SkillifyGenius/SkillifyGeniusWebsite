import { fallbackCourses, fallbackPosts } from "@/data/content";
import type { BlogPost, Course, CourseRegistration, LeadInquiry, ParentReview, TrialBooking } from "@/types";

const endpoint = (import.meta.env.VITE_APPWRITE_ENDPOINT || "https://api.attanjil.com/v1").replace(/\/+$/, "");
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID || "6aa5f4880020ee2b7f5b";
const rawDb = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// Map the display name "skillify_genius_db" to the actual Appwrite database ID "6aa5fbd8001e67a857e3"
const databaseId = (!rawDb || rawDb === "skillify_genius_db") ? "6aa5fbd8001e67a857e3" : rawDb;

function newDocumentId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

async function createDocument<T extends { id: string }>(collectionId: string | undefined, data: T): Promise<T> {
  const targetCollection = collectionId || "trial_bookings";
  if (!endpoint || !projectId || !databaseId || !targetCollection) {
    throw new Error("The submission service is not configured yet. Please contact the educator directly.");
  }

  let response: Response;
  try {
    response = await fetch(
      `${endpoint}/databases/${encodeURIComponent(databaseId)}/collections/${encodeURIComponent(targetCollection)}/documents`,
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
    const errorBody = await response.text().catch(() => "");
    console.error(`[Appwrite submission error] Status ${response.status}:`, errorBody);
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
