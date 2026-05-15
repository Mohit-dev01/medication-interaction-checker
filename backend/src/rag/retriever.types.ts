export type ClinicalDocument = {
  id: string;
  medication: string;
  aliases: string[];
  title: string;
  content: string;
  tags: string[];
};

export type RetrievedClinicalDocument = ClinicalDocument & {
  score: number;
};
