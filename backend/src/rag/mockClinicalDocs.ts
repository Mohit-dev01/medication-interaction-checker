import type { ClinicalDocument } from "./retriever.types.js";

export const mockClinicalDocs: ClinicalDocument[] = [
  {
    id: "doc-atorvastatin-1",
    medication: "atorvastatin",
    aliases: ["lipitor"],
    title: "Mock Prescribing Guideline for Atorvastatin",
    tags: ["statin", "cholesterol", "cardiovascular", "ldl"],
    content: `
Atorvastatin is a statin used for hyperlipidemia and cardiovascular risk reduction.
Indications include elevated LDL cholesterol, primary prevention in high-risk patients, and secondary prevention after cardiovascular events.
Contraindications include active liver disease, pregnancy, breastfeeding, and hypersensitivity.
Common side effects include muscle pain, headache, nausea, diarrhea, and elevated liver enzymes.
Major interactions include strong CYP3A4 inhibitors, cyclosporine, gemfibrozil, clarithromycin, itraconazole, and grapefruit juice.
Eligibility checks include liver function review, pregnancy status, current medication interaction review, and history of statin intolerance.
Safety notes include verifying liver function before use, reviewing current medications for interactions, avoiding use during pregnancy or breastfeeding, and advising the patient to report unexplained muscle pain or weakness.
`,
  },
  {
    id: "doc-semaglutide-1",
    medication: "semaglutide",
    aliases: ["ozempic", "wegovy", "rybelsus"],
    title: "Mock Prescribing Guideline for Semaglutide",
    tags: ["glp-1", "diabetes", "weight management"],
    content: `
Semaglutide is a GLP-1 receptor agonist used for type 2 diabetes and chronic weight management in eligible patients.
Indications include type 2 diabetes mellitus and chronic weight management.
Contraindications include personal or family history of medullary thyroid carcinoma, MEN2 syndrome, and hypersensitivity.
Common side effects include nausea, vomiting, diarrhea, constipation, abdominal pain, and reduced appetite.
Warnings include pancreatitis risk, gallbladder disease, dehydration, and possible worsening of diabetic retinopathy.
Eligibility checks include diabetes status, BMI criteria, thyroid cancer history, pregnancy status, and pancreatitis history.
Safety notes include checking for thyroid cancer history, reviewing pancreatitis history, monitoring for severe abdominal pain, advising hydration if gastrointestinal symptoms occur, and verifying pregnancy status before use.
`,
  },
  {
    id: "doc-metformin-1",
    medication: "metformin",
    aliases: ["glucophage"],
    title: "Mock Prescribing Guideline for Metformin",
    tags: ["diabetes", "biguanide", "insulin resistance"],
    content: `
Metformin is commonly used as first-line therapy for type 2 diabetes.
Indications include type 2 diabetes management and insulin resistance in selected patients.
Contraindications include severe renal impairment, metabolic acidosis, and hypersensitivity.
Common side effects include diarrhea, nausea, abdominal discomfort, metallic taste, and vitamin B12 deficiency with long-term use.
Interactions include iodinated contrast agents, alcohol, and drugs affecting renal function.
Eligibility checks include kidney function, liver disease history, alcohol use, and risk of lactic acidosis.
Safety notes include checking kidney function before use, reviewing alcohol intake, monitoring for symptoms of lactic acidosis, considering vitamin B12 monitoring with long-term use, and reviewing contrast imaging plans.
`,
  },
  {
    id: "doc-amoxicillin-1",
    medication: "amoxicillin",
    aliases: ["amoxil"],
    title: "Mock Prescribing Guideline for Amoxicillin",
    tags: ["antibiotic", "penicillin", "infection"],
    content: `
Amoxicillin is a penicillin-class antibiotic used for selected bacterial infections.
Indications include susceptible respiratory tract infections, ear infections, and certain skin or urinary infections.
Contraindications include serious hypersensitivity to penicillins or beta-lactam antibiotics.
Common side effects include diarrhea, nausea, rash, and abdominal discomfort.
Major interactions include warfarin and some other anticoagulants.
Eligibility checks include allergy history, infection type, renal function, and current anticoagulant use.
Safety notes include confirming penicillin or beta-lactam allergy history, monitoring for rash or allergic reaction, reviewing anticoagulant use, and ensuring the medication is appropriate for a suspected bacterial infection.
`,
  },
  {
    id: "doc-ibuprofen-1",
    medication: "ibuprofen",
    aliases: ["advil", "motrin"],
    title: "Mock Prescribing Guideline for Ibuprofen",
    tags: ["nsaid", "pain", "fever", "inflammation"],
    content: `
Ibuprofen is a nonsteroidal anti-inflammatory drug used for pain, fever, and inflammation.
Indications include mild to moderate pain, fever, and inflammatory conditions.
Contraindications include NSAID hypersensitivity, active gastrointestinal bleeding, severe heart failure, and high-risk late pregnancy use.
Common side effects include stomach upset, heartburn, nausea, dizziness, and fluid retention.
Major interactions include anticoagulants, antiplatelet drugs, ACE inhibitors, ARBs, diuretics, lithium, and methotrexate.
Eligibility checks include gastrointestinal bleeding risk, kidney function, cardiovascular risk, pregnancy status, and anticoagulant use.
Safety notes include reviewing gastrointestinal bleeding risk, checking kidney function, avoiding high-risk late pregnancy use, monitoring fluid retention, and reviewing anticoagulant or antiplatelet therapy.
`,
  },
];
