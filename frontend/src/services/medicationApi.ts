import axios from "axios";
import type { MedicationCheckApiResponse } from "@/types/medication.types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function checkMedication(medication: string) {
  const response = await axios.post<MedicationCheckApiResponse>(
    `${API_BASE_URL}/medications/check`,
    {
      medication,
    }
  );

  return response.data.data;
}