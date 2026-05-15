import { mockClinicalDocs } from "./mockClinicalDocs.js";
import type { RetrievedClinicalDocument } from "./retriever.types.js";

export function retrieveRelevantDocuments(
  query: string,
): RetrievedClinicalDocument[] {
  const normalizedQuery = query.toLowerCase().trim();

  const results = mockClinicalDocs
    .map((doc) => {
      let score = 0;

      const medication = doc.medication.toLowerCase();
      const title = doc.title.toLowerCase();
      const content = doc.content.toLowerCase();
      const aliases = doc.aliases.map((alias) => alias.toLowerCase());
      const tags = doc.tags.map((tag) => tag.toLowerCase());

      if (medication === normalizedQuery) score += 10;
      if (medication.includes(normalizedQuery)) score += 7;
      if (aliases.includes(normalizedQuery)) score += 8;
      if (title.includes(normalizedQuery)) score += 5;
      if (tags.some((tag) => tag.includes(normalizedQuery))) score += 3;
      if (content.includes(normalizedQuery)) score += 1;

      return {
        ...doc,
        score,
      };
    })
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score);

  return results.slice(0, 2);
}
