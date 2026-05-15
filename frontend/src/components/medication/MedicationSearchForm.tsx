"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"

import {
  medicationSearchSchema,
  type MedicationSearchFormValues,
} from "@/schemas/medication.schema"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface MedicationSearchFormProps {
  onSubmit: (values: MedicationSearchFormValues) => void
  loading: boolean
}

export function MedicationSearchForm({
  onSubmit,
  loading,
}: MedicationSearchFormProps) {
  const form = useForm<MedicationSearchFormValues>({
    resolver: zodResolver(medicationSearchSchema),
    defaultValues: {
      medication: "",
    },
  })

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <FieldGroup>
        <Controller
          name="medication"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex-1">
              <FieldLabel htmlFor="medication">
                Medication
              </FieldLabel>

              <Input
                {...field}
                id="medication"
                placeholder="Try atorvastatin, semaglutide, or metformin"
                aria-invalid={fieldState.invalid}
              />

              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Check Medication"}
        </Button>
      </FieldGroup>
    </form>
  )
}