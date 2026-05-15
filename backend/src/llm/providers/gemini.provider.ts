import { GoogleGenAI } from "@google/genai";
import { env } from "../../config/env.js";

export async function callGemini(prompt: string): Promise<string> {
  if (!env.geminiApiKey) {
    throw new Error("GEMINI_API_KEY is missing.");
  }

  const ai = new GoogleGenAI({
    apiKey: env.geminiApiKey,
  });

  const response = await ai.models.generateContent({
    model: env.llmModel,
    contents: prompt,
    config: {
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  });

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  return text;
}
