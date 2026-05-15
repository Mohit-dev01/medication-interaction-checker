import { AlertCircle, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface MedicationErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function MedicationErrorState({ error, onRetry }: MedicationErrorStateProps) {
  return (
    <Alert variant="destructive" className="mt-6 animate-in slide-in-from-top-2 fade-in duration-300 shadow-sm border-destructive/20 bg-destructive/5">
      <AlertCircle className="h-5 w-5" />
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <AlertTitle className="text-base font-semibold">Unable to fetch medication details</AlertTitle>
          <AlertDescription className="mt-1 text-sm text-destructive/90">
            {error}
          </AlertDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="w-fit border-destructive/20 bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    </Alert>
  )
}
