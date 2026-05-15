interface MedicationResultSectionProps {
  title: string;
  items: string[];
}

export function MedicationResultSection({
  title,
  items,
}: MedicationResultSectionProps) {
  return (
    <section>
      <h3 className="mb-2 text-sm font-semibold text-slate-900">{title}</h3>

      {items.length > 0 ? (
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
          {items.map((item, index) => (
            <li key={`${title}-${index}`}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500">No information available.</p>
      )}
    </section>
  );
}