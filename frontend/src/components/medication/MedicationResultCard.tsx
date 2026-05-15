import { CheckCircle2, AlertTriangle, XCircle, Info, Copy, ExternalLink, Calendar, Stethoscope } from "lucide-react"
import type { MedicationCheckData } from "@/types/medication.types"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface MedicationResultCardProps {
  data: MedicationCheckData
}

export function MedicationResultCard({ data }: MedicationResultCardProps) {
  const { summary, sources } = data

  const copyToClipboard = () => {
    const text = `Medication Summary: ${summary.medication}\n\nIndications:\n${summary.indications.join("\n")}\n\nContraindications:\n${summary.contraindications.join("\n")}\n\nMajor Interactions:\n${summary.majorInteractions.join("\n")}`
    navigator.clipboard.writeText(text)
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  })

  return (
    <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight capitalize text-foreground flex items-center gap-2">
            {summary.medication}
            <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary hover:bg-primary/20">
              AI Summary
            </Badge>
          </h2>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Generated on {currentDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={copyToClipboard} className="h-9">
            <Copy className="mr-2 h-4 w-4" />
            Copy Summary
          </Button>
          <Button variant="outline" size="sm" className="h-9">
            <ExternalLink className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <Card className="shadow-sm border-border/60">
            <CardHeader className="pb-3 bg-muted/30">
              <CardTitle className="text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                Indications
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {summary.indications.length > 0 ? (
                <ul className="space-y-2 text-sm text-foreground">
                  {summary.indications.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No indications available.</p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/60">
            <CardHeader className="pb-3 bg-muted/30">
              <CardTitle className="text-base flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" />
                Common Side Effects
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {summary.commonSideEffects.length > 0 ? (
                <ul className="space-y-2 text-sm text-foreground">
                  {summary.commonSideEffects.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-blue-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No side effects listed.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card className="shadow-sm border-destructive/20 ring-1 ring-destructive/10">
            <CardHeader className="pb-3 bg-destructive/5">
              <CardTitle className="text-base flex items-center gap-2 text-destructive">
                <XCircle className="h-4 w-4" />
                Contraindications
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {summary.contraindications.length > 0 ? (
                <ul className="space-y-2 text-sm text-foreground">
                  {summary.contraindications.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-destructive mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No contraindications available.</p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-warning/20 ring-1 ring-warning/10">
            <CardHeader className="pb-3 bg-warning/5">
              <CardTitle className="text-base flex items-center gap-2 text-amber-700 dark:text-amber-500">
                <AlertTriangle className="h-4 w-4" />
                Major Interactions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {summary.majorInteractions.length > 0 ? (
                <ul className="space-y-2 text-sm text-foreground">
                  {summary.majorInteractions.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-amber-600 dark:text-amber-500 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No major interactions listed.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="shadow-sm border-border/60">
        <CardHeader className="pb-3 bg-muted/30">
          <CardTitle className="text-base flex items-center gap-2">
            <Stethoscope className="h-4 w-4 text-primary" />
            Eligibility & Safety Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-6">
          <div>
            <h4 className="text-sm font-semibold mb-2 text-foreground">Eligibility Checks</h4>
            {summary.eligibilityChecks.length > 0 ? (
              <ul className="grid gap-2 sm:grid-cols-2">
                {summary.eligibilityChecks.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 bg-muted/50 p-3 rounded-md text-sm border border-border/50">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">None listed.</p>
            )}
          </div>
          <Separator />
          <div>
            <h4 className="text-sm font-semibold mb-2 text-foreground">Safety Notes</h4>
            {summary.safetyNotes.length > 0 ? (
              <ul className="space-y-2 text-sm text-foreground">
                {summary.safetyNotes.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-muted-foreground mt-0.5">-</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">None listed.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="rounded-lg border border-warning/30 bg-warning/10 p-4 text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3 shadow-sm">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Disclaimer: For informational purposes only</p>
            <p className="opacity-90">{summary.disclaimer}</p>
          </div>
        </div>

        {sources.length > 0 && (
          <div className="rounded-lg border border-border/60 bg-muted/30 p-4">
            <h3 className="mb-3 text-sm font-semibold text-foreground flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              Data Sources (Mock RAG)
            </h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {sources.map((source) => (
                <div key={source.id} className="rounded-md border bg-background p-3 text-xs shadow-sm">
                  <p className="font-medium text-foreground line-clamp-1" title={source.title}>{source.title}</p>
                  <p className="text-muted-foreground mt-1">Ref: {source.medication}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}