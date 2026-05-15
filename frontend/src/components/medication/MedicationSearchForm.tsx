"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { Loader2, Search } from "lucide-react"

import {
  medicationSearchSchema,
  type MedicationSearchFormValues,
} from "@/schemas/medication.schema"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface MedicationSearchFormProps {
  onSubmit: (values: MedicationSearchFormValues) => void
  loading: boolean
  defaultMedication?: string
}

export function MedicationSearchForm({
  onSubmit,
  loading,
  defaultMedication = "",
}: MedicationSearchFormProps) {
  const form = useForm<MedicationSearchFormValues>({
    resolver: zodResolver(medicationSearchSchema),
    defaultValues: {
      medication: defaultMedication,
    },
    values: {
      medication: defaultMedication,
    }
  })

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <Controller
          name="medication"
          control={form.control}
          render={({ field, fieldState }) => (
            <div className="flex-1 space-y-2">
              <Label htmlFor="medication" className="text-sm font-medium text-foreground">
                Enter Medication
              </Label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
                  <Search className="h-4 w-4" />
                </div>
                <Input
                  {...field}
                  id="medication"
                  placeholder="e.g. atorvastatin, semaglutide, metformin..."
                  className={`pl-10 h-11 text-base ${
                    fieldState.invalid 
                      ? "border-destructive focus-visible:ring-destructive" 
                      : "border-input focus-visible:ring-primary"
                  }`}
                  aria-invalid={fieldState.invalid}
                  disabled={loading}
                  autoComplete="off"
                />
              </div>

              {fieldState.invalid ? (
                <p className="text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1">
                  {fieldState.error?.message}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Enter a generic or brand name medication.
                </p>
              )}
            </div>
          )}
        />

        <Button 
          type="submit" 
          disabled={loading} 
          className="h-11 px-8 shadow-sm transition-all sm:w-auto w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking...
            </>
          ) : (
            "Check Interaction"
          )}
        </Button>
      </div>
    </form>
  )
}