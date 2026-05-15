import { useState } from "react";
import axios from "axios";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { MedicationSearchForm } from "@/components/medication/MedicationSearchForm";
import { MedicationResultCard } from "@/components/medication/MedicationResultCard";
import { MedicationEmptyState } from "@/components/medication/MedicationEmptyState";

import { checkMedication } from "@/services/medicationApi";
import type { MedicationCheckData } from "@/types/medication.types";
import type { MedicationSearchFormValues } from "@/schemas/medication.schema";

function App() {
  const [result, setResult] = useState<MedicationCheckData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleMedicationSearch(values: MedicationSearchFormValues) {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const data = await checkMedication(values.medication);
      setResult(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const apiError = err.response?.data;

        const message =
          apiError?.error?.details?.suggestion ||
          apiError?.error?.message ||
          "Unable to check medication.";

        setError(message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <section className="mb-8 text-center">
          <p className="mb-2 text-sm font-medium text-blue-600">
            Pharmacist Demo Application
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Medication Interaction & Eligibility Checker
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
            Search a medication and receive a structured mock clinical summary
            generated using an LLM and a simulated RAG pipeline.
          </p>
        </section>

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <MedicationSearchForm
            onSubmit={handleMedicationSearch}
            loading={loading}
          />

          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="text-slate-500">Try:</span>

            {["atorvastatin", "semaglutide", "metformin", "amoxicillin", "ibuprofen"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-100 px-3 py-1 text-slate-700"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </section>

        {error && (
          <Alert variant="destructive" className="mt-5">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result ? <MedicationResultCard data={result} /> : <MedicationEmptyState />}
      </div>
    </main>
  );
}

export default App;