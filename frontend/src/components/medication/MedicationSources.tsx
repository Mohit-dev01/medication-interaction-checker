import type { MedicationSource } from "@/types/medication.types";

interface MedicationSourcesProps {
  sources: MedicationSource[];
}

export function MedicationSources({ sources }: MedicationSourcesProps) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-slate-900">
        Retrieved Mock Sources
      </h3>

      <div className="space-y-2">
        {sources.map((source) => (
          <div
            key={source.id}
            className="rounded-md border bg-slate-50 p-3 text-sm"
          >
            <p className="font-medium text-slate-800">{source.title}</p>
            <p className="text-slate-500">Medication: {source.medication}</p>
          </div>
        ))}
      </div>
    </div>
  );
}