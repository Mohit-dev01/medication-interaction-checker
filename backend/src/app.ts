import express from "express";
import cors from "cors";
import helmet from "helmet";
import medicationRoutes from "./modules/medication/medication.routes.js";
import { env } from "./config/env.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { requestLogger } from "./middlewares/requestLogger.middleware.js";

export const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.frontendUrl,
  }),
);

app.use(express.json({ limit: "1mb" }));

app.use(requestLogger);

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    service: "Medication Interaction & Eligibility Checker API",
    status: "ok",
  });
});

app.use("/api/medications", medicationRoutes);

app.use(errorMiddleware);
