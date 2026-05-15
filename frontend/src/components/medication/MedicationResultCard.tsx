import type { MedicationCheckData } from "@/types/medication.types";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { MedicationResultSection } from "./MedicationResultSection";
import { MedicationSources } from "./MedicationSources";

interface MedicationResultCardProps {
  data: MedicationCheckData;
}

export function MedicationResultCard({ data }: MedicationResultCardProps) {
  const { summary, sources } = data;

  return (
    <Card className="mt-6 border-slate-200 shadow-sm">
      <CardHeader>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="capitalize">
            {summary.medication}
          </CardTitle>

          <Badge variant="secondary">AI + Mock RAG Result</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <MedicationResultSection
          title="Indications"
          items={summary.indications}
        />

        <MedicationResultSection
          title="Contraindications"
          items={summary.contraindications}
        />

        <MedicationResultSection
          title="Common Side Effects"
          items={summary.commonSideEffects}
        />

        <MedicationResultSection
          title="Major Interactions"
          items={summary.majorInteractions}
        />

        <MedicationResultSection
          title="Eligibility Checks"
          items={summary.eligibilityChecks}
        />

        <MedicationResultSection
          title="Safety Notes"
          items={summary.safetyNotes}
        />

        <Separator />

        <MedicationSources sources={sources} />

        <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-900">
          {summary.disclaimer}
        </div>
      </CardContent>
    </Card>
  );
}