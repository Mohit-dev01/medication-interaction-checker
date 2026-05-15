import { Pill, Search, ShieldCheck } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface MedicationEmptyStateProps {
  onExampleClick: (medication: string) => void;
}

export function MedicationEmptyState({ onExampleClick }: MedicationEmptyStateProps) {
  const examples = ["atorvastatin", "semaglutide", "metformin", "amoxicillin", "ibuprofen"]

  return (
    <Card className="mt-6 border-dashed border-border/60 bg-muted/30 shadow-none">
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
          <ShieldCheck className="h-10 w-10" />
        </div>
        
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Check Medication Interactions
        </h2>
        
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Enter a medication above to get an AI-generated clinical summary, including eligibility checks, contraindications, and potential risks.
        </p>

        <div className="mt-8 flex flex-col items-center">
          <p className="mb-3 text-sm font-medium text-foreground flex items-center gap-2">
            <Pill className="h-4 w-4 text-primary" />
            Try checking these examples
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {examples.map((item) => (
              <button
                key={item}
                onClick={() => onExampleClick(item)}
                className="inline-flex items-center rounded-full border border-border/50 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <Search className="mr-1.5 h-3 w-3" />
                {item}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}