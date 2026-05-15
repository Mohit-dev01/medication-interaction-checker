import { callGemini } from "./providers/gemini.provider.js";
import {
  MedicationSummarySchema,
  type MedicationSummary,
} from "../modules/medication/medication.schema.js";
import { AppError } from "../errors/AppError.js";

export async function generateStructuredMedicationSummary(
  prompt: string,
): Promise<MedicationSummary> {
  const rawResponse = await callGemini(prompt);

  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(rawResponse);
  } catch {
    throw new AppError("LLM returned invalid JSON.", 502, {
      rawResponse,
    });
  }

  const validated = MedicationSummarySchema.safeParse(parsedJson);

  if (!validated.success) {
    throw new AppError("LLM response did not match expected schema.", 502, {
      validationError: validated.error.flatten(),
      rawResponse: parsedJson,
    });
  }

  return validated.data;
}
