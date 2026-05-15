# Medication Interaction & Eligibility Checker

A lightweight pharmacist-facing demo app that allows users to search for a medication and receive a structured clinical summary including:

- Indications
- Contraindications
- Side effects
- Drug interactions
- Eligibility checks
- Safety notes

This project demonstrates a simple AI + RAG workflow using mock clinical documents and Gemini.

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Hook Form
- Zod
- Axios

### Backend
- Node.js
- Express
- TypeScript
- Zod
- Gemini API
- Mock RAG (hardcoded clinical documents)

---

## Architecture

```txt
React Frontend
   ↓
React Hook Form + Zod Validation
   ↓
Express Backend API
   ↓
Backend Zod Validation
   ↓
Medication Service
   ↓
Mock RAG Retriever
   ↓
Gemini LLM
   ↓
Zod Response Validation
   ↓
Structured JSON Response
```

---

## Supported Medications (Demo)

- Atorvastatin  
- Semaglutide  
- Metformin  
- Amoxicillin  
- Ibuprofen  

---

## Run Locally

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `/backend`:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

GEMINI_API_KEY=your_gemini_api_key_here
LLM_MODEL=gemini-2.5-flash
```

Run backend:

```bash
npm run dev
```

Backend runs on:
http://localhost:5000

---

### Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file in `/frontend`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:
http://localhost:5173

---

## API Endpoint

### POST /api/medications/check

#### Request

```json
{
  "medication": "atorvastatin"
}
```

#### Response

```json
{
  "success": true,
  "data": {
    "query": "atorvastatin",
    "sources": [
      {
        "id": "doc-atorvastatin-1",
        "title": "Mock Prescribing Guideline for Atorvastatin",
        "medication": "atorvastatin"
      }
    ],
    "summary": {
      "medication": "atorvastatin",
      "indications": [],
      "contraindications": [],
      "commonSideEffects": [],
      "majorInteractions": [],
      "eligibilityChecks": [],
      "safetyNotes": [],
      "disclaimer": "This is a mock educational summary and not medical advice. A licensed healthcare professional should verify all medication decisions."
    }
  }
}
```

---

## Production Considerations

To make this production-ready for healthcare use:

- Integrate a real clinical knowledge base
- Use a vector database (pgvector, Pinecone, Qdrant, Weaviate)
- Add source citations for every response
- Implement authentication and role-based access
- Enable audit logging
- Add human-in-the-loop review
- Strengthen AI safety guardrails
- Ensure HIPAA / SOC 2 compliance
- Monitor:
  - Unsafe outputs  
  - Latency  
  - Retrieval accuracy  

---


