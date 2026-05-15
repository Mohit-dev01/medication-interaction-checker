import type { RetrievedClinicalDocument } from "../../rag/retriever.types.js";

export function buildMedicationSummaryPrompt(params: {
  query: string;
  documents: RetrievedClinicalDocument[];
}) {
  const context = params.documents
    .map((doc) => {
      return `
Source ID: ${doc.id}
Title: ${doc.title}
Medication: ${doc.medication}
Content:
${doc.content}
`;
    })
    .join("\n---\n");

  return `
You are a healthcare information assistant for a pharmacist-facing demo application.

Important rules:
- Use ONLY the provided mock clinical context.
- Do not invent facts outside the provided context.
- Do not diagnose patients.
- Do not provide final treatment decisions.
- Do not include dosage unless explicitly present in the context.
- Return valid JSON only.
- Do not wrap JSON in markdown.

Medication query:
${params.query}

Retrieved mock clinical context:
${context}

Return the response in this exact JSON structure:

{
  "medication": "",
  "indications": [],
  "contraindications": [],
  "commonSideEffects": [],
  "majorInteractions": [],
  "eligibilityChecks": [],
  "safetyNotes": [],
  "disclaimer": "This is a mock educational summary and not medical advice. A licensed healthcare professional should verify all medication decisions."
}
`;
}
