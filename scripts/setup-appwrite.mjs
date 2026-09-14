import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Client, Databases, Functions, Permission, Role } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function readEnv(path) {
  if (!existsSync(path)) return {};
  return Object.fromEntries(
    readFileSync(path, "utf8")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#") && line.includes("="))
      .map((line) => {
        const at = line.indexOf("=");
        return [line.slice(0, at).trim(), line.slice(at + 1).trim().replace(/^("|')|("|')$/g, "")];
      }),
  );
}

const frontend = { ...readEnv(resolve(root, "frontend/.env")), ...readEnv(resolve(root, "frontend/.env.local")) };
const privateEnv = readEnv(resolve(root, "scripts/.env"));
const endpoint = frontend.NEXT_PUBLIC_APPWRITE_ENDPOINT || frontend.VITE_APPWRITE_ENDPOINT;
const projectId = frontend.NEXT_PUBLIC_APPWRITE_PROJECT_ID || frontend.VITE_APPWRITE_PROJECT_ID;
const databaseId = frontend.NEXT_PUBLIC_APPWRITE_DATABASE_ID || frontend.VITE_APPWRITE_DATABASE_ID;
const key = process.env.APPWRITE_API_KEY || privateEnv.APPWRITE_API_KEY;

if (!endpoint || !projectId || !databaseId || !key) {
  throw new Error("Set the frontend Appwrite IDs and a current-project APPWRITE_API_KEY in scripts/.env first.");
}

const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(key);
const databases = new Databases(client);
const functions = new Functions(client);
const createAny = Permission.create(Role.any());

const string = (key, size, required = true) => ({ key, type: "string", size, required });
const email = (key, required = true) => ({ key, type: "email", required });
const integer = (key, required = true) => ({ key, type: "integer", required });
const datetime = (key, required = true) => ({ key, type: "datetime", required });
const status = (value) => ({ key: "status", type: "enum", elements: [value], required: true });

const collections = [
  {
    id: frontend.NEXT_PUBLIC_APPWRITE_TRIALS_COLLECTION_ID || frontend.VITE_APPWRITE_TRIALS_COLLECTION_ID,
    name: "Trial bookings",
    fields: [
      string("id", 64), string("parentName", 80), string("studentName", 80),
      integer("studentAge"), email("email"), string("phone", 30),
      string("courseSlug", 120), string("preferredDate", 10),
      string("preferredTime", 120), string("timezone", 80),
      string("message", 500, false), status("pending"), datetime("createdAt"),
    ],
  },
  {
    id: frontend.NEXT_PUBLIC_APPWRITE_REGISTRATIONS_COLLECTION_ID || frontend.VITE_APPWRITE_REGISTRATIONS_COLLECTION_ID,
    name: "Course registrations",
    fields: [
      string("id", 64), string("studentName", 80), string("parentName", 80),
      string("phone", 30), email("email", false), string("courseSlug", 120),
      string("message", 500, false), status("new"), datetime("createdAt"),
    ],
  },
  {
    id: frontend.NEXT_PUBLIC_APPWRITE_LEADS_COLLECTION_ID || frontend.VITE_APPWRITE_LEADS_COLLECTION_ID,
    name: "Contact inquiries",
    fields: [
      string("id", 64), string("fullName", 80), email("email"),
      string("phone", 30, false), string("subject", 120), string("message", 1000),
      status("new"), datetime("createdAt"),
    ],
  },
];

if (collections.some((collection) => !collection.id)) {
  throw new Error("All three collection IDs must be set in frontend/.env.");
}

function isNotFound(error) {
  return error?.code === 404;
}

async function waitForAttribute(collectionId, field) {
  for (let attempt = 0; attempt < 90; attempt += 1) {
    let attribute;
    try {
      attribute = await databases.getAttribute(databaseId, collectionId, field.key);
    } catch (error) {
      if (!isNotFound(error)) throw error;
      await new Promise((done) => setTimeout(done, 1000));
      continue;
    }
    if (attribute.status === "available") return;
    if (attribute.status === "failed" || attribute.status === "stuck") {
      throw new Error(`${collectionId}.${field.key}: ${attribute.error || attribute.status}`);
    }
    await new Promise((done) => setTimeout(done, 1000));
  }
  throw new Error(`${collectionId}.${field.key} was not ready after 90 seconds.`);
}

async function createAttribute(collectionId, field) {
  const args = [databaseId, collectionId, field.key];
  switch (field.type) {
    case "string":
      await databases.createStringAttribute(...args, field.size, field.required);
      break;
    case "email":
      await databases.createEmailAttribute(...args, field.required);
      break;
    case "integer":
      await databases.createIntegerAttribute(...args, field.required);
      break;
    case "datetime":
      await databases.createDatetimeAttribute(...args, field.required);
      break;
    case "enum":
      await databases.createEnumAttribute(...args, field.elements, field.required);
      break;
    default:
      throw new Error(`Unsupported attribute type: ${field.type}`);
  }
  await waitForAttribute(collectionId, field);
  console.log(`  Added ${field.key}`);
}

async function ensureCollection(spec) {
  let collection;
  try {
    collection = await databases.getCollection(databaseId, spec.id);
    console.log(`Collection ${spec.id} already exists`);
  } catch (error) {
    if (!isNotFound(error)) throw error;
    collection = await databases.createCollection(databaseId, spec.id, spec.name, [createAny], false);
    console.log(`Created collection ${spec.id}`);
  }

  if (!collection.$permissions.includes(createAny)) {
    collection = await databases.updateCollection(
      databaseId, spec.id, collection.name,
      [...collection.$permissions, createAny], collection.documentSecurity, collection.enabled,
    );
    console.log(`  Granted guest Create on ${spec.id}`);
  }
  if (collection.$permissions.some((permission) => /^(read|update|delete)\("any"\)$/.test(permission))) {
    throw new Error(`${spec.id} has public Read, Update, or Delete permission; remove it in Appwrite Console.`);
  }

  const current = new Map((await databases.listAttributes(databaseId, spec.id)).attributes.map((item) => [item.key, item]));
  for (const field of spec.fields) {
    const existing = current.get(field.key);
    if (existing) {
      if (existing.type !== field.type || existing.required !== field.required ||
          (field.size && existing.size < field.size)) {
        throw new Error(`${spec.id}.${field.key} exists with an incompatible type, required flag, or size.`);
      }
      await waitForAttribute(spec.id, field);
    } else {
      await createAttribute(spec.id, field);
    }
  }
}

async function ensureFunction() {
  const configuredId = process.env.APPWRITE_TRIAL_FUNCTION_ID || privateEnv.APPWRITE_TRIAL_FUNCTION_ID;
  const listed = await functions.list();
  const selected = configuredId
    ? await functions.get(configuredId)
    : listed.total === 1 ? listed.functions[0] : undefined;
  if (!selected) {
    throw new Error("Set APPWRITE_TRIAL_FUNCTION_ID in scripts/.env because this project has more than one Function.");
  }

  const variables = (await functions.listVariables(selected.$id)).variables;
  let configChanged = false;
  for (const secretName of ["TELEGRAM_BOT_TOKEN", "TELEGRAM_CHAT_ID"]) {
    if (!variables.some((variable) => variable.key === secretName)) {
      throw new Error(`${secretName} is missing from Appwrite Function settings.`);
    }
  }
  const values = {
    TRIAL_DATABASE_ID: databaseId,
    TRIAL_COLLECTION_ID: frontend.VITE_APPWRITE_TRIALS_COLLECTION_ID,
  };
  for (const [name, value] of Object.entries(values)) {
    const existing = variables.find((variable) => variable.key === name);
    if (existing) {
      if (existing.value !== value) {
        await functions.updateVariable(selected.$id, existing.$id, name, value);
        configChanged = true;
      }
    } else {
      await functions.createVariable(selected.$id, name, value);
      configChanged = true;
    }
    console.log(`Function variable ${name} set`);
  }

  const event = `databases.${databaseId}.collections.${frontend.VITE_APPWRITE_TRIALS_COLLECTION_ID}.documents.*.create`;
  if (selected.events.length !== 1 || selected.events[0] !== event) {
    await functions.update(selected.$id, selected.name, undefined, undefined, [event]);
    configChanged = true;
    console.log(`Function event set to ${event}`);
  }

  if (!configChanged) {
    console.log("Function configuration already matches; no redeployment needed.");
    return;
  }
  const archive = resolve(root, "dist/telegram-trial-alert.tar.gz");
  if (!existsSync(archive)) {
    throw new Error("The Function archive is missing. Recreate dist/telegram-trial-alert.tar.gz before redeploying.");
  }
  await functions.createDeployment(selected.$id, InputFile.fromPath(archive, "telegram-trial-alert.tar.gz"), true, "src/main.js");
  console.log("New Function deployment uploaded; check Appwrite for an active build.");
}

try {
  await databases.get(databaseId);
  console.log(`Database ${databaseId} exists`);
  for (const spec of collections) await ensureCollection(spec);
  await ensureFunction();
  console.log("Appwrite setup complete.");
} catch (error) {
  console.error(`Appwrite setup stopped: ${error.message}`);
  process.exitCode = 1;
}
