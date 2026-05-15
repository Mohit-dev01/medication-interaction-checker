import { z } from "zod";

export const MedicationCheckRequestSchema = z.object({
  medication: z
    .string()
    .trim()
    .min(2, "Medication name must be at least 2 characters.")
    .max(100, "Medication name must be less than 100 characters.")
    .regex(
      /^[a-zA-Z0-9\s-]+$/,
      "Only letters, numbers, spaces, and hyphens are allowed.",
    ),
});

export const MedicationSummarySchema = z.object({
  medication: z.string(),
  indications: z.array(z.string()),
  contraindications: z.array(z.string()),
  commonSideEffects: z.array(z.string()),
  majorInteractions: z.array(z.string()),
  eligibilityChecks: z.array(z.string()),
  safetyNotes: z.array(z.string()),
  disclaimer: z.string(),
});

export const MedicationSourceSchema = z.object({
  id: z.string(),
  title: z.string(),
  medication: z.string(),
});

export const MedicationCheckResponseSchema = z.object({
  query: z.string(),
  sources: z.array(MedicationSourceSchema),
  summary: MedicationSummarySchema,
});

export type MedicationCheckRequest = z.infer<
  typeof MedicationCheckRequestSchema
>;

export type MedicationSummary = z.infer<typeof MedicationSummarySchema>;

export type MedicationCheckResponse = z.infer<
  typeof MedicationCheckResponseSchema
>;
