import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  llmModel: process.env.LLM_MODEL || "gpt-4o-mini",
};
