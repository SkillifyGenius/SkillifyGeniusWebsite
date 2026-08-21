import { Client, Databases, Users, Storage } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config();

const endpoint =
  process.env.APPWRITE_ENDPOINT ||
  process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
  process.env.VITE_APPWRITE_ENDPOINT ||
  "https://api.attanjil.com/v1";

const projectId =
  process.env.APPWRITE_PROJECT_ID ||
  process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ||
  process.env.VITE_APPWRITE_PROJECT_ID ||
  "6a888ff500009da26174";

const apiKey = process.env.APPWRITE_API_KEY || "";

export const isAppwriteConfigured = Boolean(
  apiKey &&
  apiKey !== "YOUR_APPWRITE_API_KEY" &&
  projectId !== "YOUR_PROJECT_ID"
);

const client = new Client();
if (isAppwriteConfigured) {
  client
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);
}

export const appwriteDatabases = isAppwriteConfigured ? new Databases(client) : null;
export const appwriteUsers = isAppwriteConfigured ? new Users(client) : null;
export const appwriteStorage = isAppwriteConfigured ? new Storage(client) : null;

export const APPWRITE_DB_ID = process.env.APPWRITE_DATABASE_ID || "skillify_genius_db";

export const APPWRITE_SERVER_CONFIG = {
  endpoint,
  projectId,
  projectName: "Skillify Genius - EdTech",
  isConfigured: isAppwriteConfigured,
};
