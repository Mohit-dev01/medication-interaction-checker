import { Card, CardContent } from "@/components/ui/card";

export function MedicationEmptyState() {
  return (
    <Card className="mt-6 border-dashed">
      <CardContent className="py-10 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          No medication checked yet
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Search for atorvastatin, semaglutide, metformin, amoxicillin, or
          ibuprofen to view a mock AI-generated medication summary.
        </p>
      </CardContent>
    </Card>
  );
}