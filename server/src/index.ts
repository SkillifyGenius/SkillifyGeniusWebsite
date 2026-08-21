import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import apiRouter from "./routes/api.js";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Security & Middlewares
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Dynamic CORS allowing Localhost, 127.0.0.1, Local Network IPs, and Production Domain
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, server-to-server)
      if (!origin) return callback(null, true);

      const isLocalhost =
        origin.includes("localhost") ||
        origin.includes("127.0.0.1") ||
        origin.includes("192.168.") ||
        origin.includes("10.") ||
        origin.includes("172.");

      const isProduction =
        origin === "https://www.skillifygenius.com" ||
        origin === "https://skillifygenius.com";

      if (isLocalhost || isProduction || process.env.NODE_ENV !== "production") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "2mb" }));

// Rate Limiting (150 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  message: { error: "Too many requests from this IP, please try again later." },
});
app.use("/api", limiter);

// Mount API Gateway
app.use("/api/v1", apiRouter);

// Root Health
app.get("/", (req, res) => {
  res.json({
    platform: "Skillify Genius 2.0 API Gateway",
    status: "online",
    docs: "/api/v1/health",
  });
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Skillify Genius 2.0 API Server running on port ${PORT} (0.0.0.0:${PORT})`);
    console.log(`📡 Health endpoint: http://localhost:${PORT}/api/v1/health`);
  });
}

export default app;
