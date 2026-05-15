import { z } from "zod";

export const medicationSearchSchema = z.object({
  medication: z
    .string()
    .trim()
    .min(2, "Medication name must be at least 2 characters.")
    .max(100, "Medication name must be less than 100 characters.")
    .regex(
      /^[a-zA-Z0-9\s-]+$/,
      "Only letters, numbers, spaces, and hyphens are allowed."
    ),
});

export type MedicationSearchFormValues = z.infer<
  typeof medicationSearchSchema
>;