export interface MedicationSummary {
  medication: string;
  indications: string[];
  contraindications: string[];
  commonSideEffects: string[];
  majorInteractions: string[];
  eligibilityChecks: string[];
  safetyNotes: string[];
  disclaimer: string;
}

export interface MedicationSource {
  id: string;
  title: string;
  medication: string;
}

export interface MedicationCheckData {
  query: string;
  sources: MedicationSource[];
  summary: MedicationSummary;
}

export interface MedicationCheckApiResponse {
  success: true;
  data: MedicationCheckData;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    statusCode: number;
    details?: {
      suggestion?: string;
      medication?: string;
    };
  };
}