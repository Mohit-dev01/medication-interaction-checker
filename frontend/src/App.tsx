import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { AppLayout } from "@/components/layout/AppLayout";
import { MedicationSearchForm } from "@/components/medication/MedicationSearchForm";
import { MedicationResultCard } from "@/components/medication/MedicationResultCard";
import { MedicationEmptyState } from "@/components/medication/MedicationEmptyState";
import { MedicationLoadingSkeleton } from "@/components/medication/MedicationLoadingSkeleton";
import { MedicationErrorState } from "@/components/medication/MedicationErrorState";
import { RecentSearchesSidebar, type RecentSearch } from "@/components/medication/RecentSearchesSidebar";

import { checkMedication } from "@/services/medicationApi";
import type { MedicationCheckData } from "@/types/medication.types";
import type { MedicationSearchFormValues } from "@/schemas/medication.schema";

function App() {
  const [result, setResult] = useState<MedicationCheckData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [lastQuery, setLastQuery] = useState("");

  
  useEffect(() => {
    const saved = localStorage.getItem("recentMedChecks");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
       
        const formatted = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setRecentSearches(formatted);
      } catch (e) {
        console.error("Failed to parse recent searches", e);
      }
    }
  }, []);

  const saveRecentSearch = (query: string) => {
    const newSearch: RecentSearch = {
      id: uuidv4(),
      query,
      timestamp: new Date()
    };
    
    setRecentSearches(prev => {
     
      const filtered = prev.filter(s => s.query.toLowerCase() !== query.toLowerCase());
      const updated = [newSearch, ...filtered].slice(0, 10); 
      localStorage.setItem("recentMedChecks", JSON.stringify(updated));
      return updated;
    });
  };

  const handleClearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentMedChecks");
  };

  async function handleMedicationSearch(values: MedicationSearchFormValues | string) {
    const query = typeof values === "string" ? values : values.medication;
    
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError("");
      setResult(null);
      setLastQuery(query);

      const data = await checkMedication(query);
      setResult(data);
      saveRecentSearch(query);
      
      
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const apiError = err.response?.data;
        const message =
          apiError?.error?.details?.suggestion ||
          apiError?.error?.message ||
          "Unable to check medication. Please verify the spelling and try again.";
        setError(message);
      } else {
        setError("An unexpected network error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleRetry = () => {
    if (lastQuery) {
      handleMedicationSearch(lastQuery);
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
        
        {/* Main Content Area */}
        <div className="flex-1 min-w-0 order-2 lg:order-1">
          <section className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Medication Intelligence
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              Evaluate drug interactions, eligibility checks, and safety guidelines instantly.
            </p>
          </section>

          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <MedicationSearchForm
              onSubmit={handleMedicationSearch}
              loading={loading}
              defaultMedication={lastQuery}
            />
          </section>

          <div className="mt-8">
            {loading && <MedicationLoadingSkeleton />}
            
            {error && !loading && (
              <MedicationErrorState error={error} onRetry={handleRetry} />
            )}
            
            {result && !loading && !error && (
              <MedicationResultCard data={result} />
            )}
            
            {!result && !loading && !error && (
              <MedicationEmptyState onExampleClick={handleMedicationSearch} />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-80 shrink-0 order-1 lg:order-2 h-auto lg:h-[calc(100vh-8rem)] lg:sticky lg:top-24">
          <RecentSearchesSidebar 
            searches={recentSearches} 
            onSelectSearch={handleMedicationSearch}
            onClearHistory={handleClearHistory}
          />
        </div>
        
      </div>
    </AppLayout>
  );
}

export default App;