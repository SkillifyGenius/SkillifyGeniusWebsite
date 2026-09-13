import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import apiRouter from "./routes/api.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const configuredFrontendOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const allowedProductionOrigins = new Set([
  "https://www.skillifygenius.com",
  "https://skillifygenius.com",
  ...configuredFrontendOrigins,
]);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isLocalNetwork =
        origin.includes("localhost") ||
        origin.includes("127.0.0.1") ||
        origin.includes("192.168.") ||
        origin.includes("10.") ||
        origin.includes("172.");

      if (
        isLocalNetwork ||
        allowedProductionOrigins.has(origin) ||
        process.env.NODE_ENV !== "production"
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  message: { error: "Too many requests from this IP, please try again later." },
});
app.use("/api", limiter);

app.use("/api/v1", apiRouter);

app.get("/", (_req, res) => {
  res.json({
    platform: "Skillify Genius API Gateway",
    status: "online",
    docs: "/api/v1/health",
  });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Skillify Genius API running on port ${PORT} (0.0.0.0:${PORT})`);
    console.log(`Health endpoint: http://localhost:${PORT}/api/v1/health`);
  });
}

export default app;
