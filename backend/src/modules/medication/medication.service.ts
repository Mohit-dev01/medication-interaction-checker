import { AppError } from "../../errors/AppError.js";
import { retrieveRelevantDocuments } from "../../rag/retriever.service.js";
import { sanitizeMedicationQuery } from "../../utils/sanitize.js";
import { generateStructuredMedicationSummary } from "../../llm/llm.service.js";
import { buildMedicationSummaryPrompt } from "./medication.prompts.js";
import {
  MedicationCheckResponseSchema,
  type MedicationCheckResponse,
} from "./medication.schema.js";

export async function checkMedication(
  medication: string,
): Promise<MedicationCheckResponse> {
  const sanitizedQuery = sanitizeMedicationQuery(medication);

  if (!sanitizedQuery) {
    throw new AppError("Medication query is required.", 400);
  }

  const documents = retrieveRelevantDocuments(sanitizedQuery);

  if (documents.length === 0) {
    throw new AppError("Medication not found in mock clinical database.", 404, {
      medication: sanitizedQuery,
      suggestion:
        "Try atorvastatin, semaglutide, metformin, amoxicillin, or ibuprofen.",
    });
  }

  const prompt = buildMedicationSummaryPrompt({
    query: sanitizedQuery,
    documents,
  });

  const summary = await generateStructuredMedicationSummary(prompt);

  const response = {
    query: sanitizedQuery,
    sources: documents.map((doc) => ({
      id: doc.id,
      title: doc.title,
      medication: doc.medication,
    })),
    summary,
  };

  const validatedResponse = MedicationCheckResponseSchema.safeParse(response);

  if (!validatedResponse.success) {
    throw new AppError("Internal response validation failed.", 500, {
      validationError: validatedResponse.error.flatten(),
    });
  }

  return validatedResponse.data;
}
