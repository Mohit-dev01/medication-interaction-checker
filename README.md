# Medication Interaction & Eligibility Checker

## Objective

A lightweight pharmacist-facing demo application that allows a user to search a medication and receive a structured summary of indications, contraindications, side effects, interactions, and eligibility checks.

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- React Hook Form
- Zod
- shadcn/ui
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- TypeScript
- Zod
- LLM API integration
- Mock RAG using hardcoded clinical documents

## RAG Approach

This project simulates a RAG pipeline using hardcoded mock clinical documents and keyword-based retrieval.

For the demo, no real vector database is used. In production, this layer could be replaced with Pinecone, pgvector, Qdrant, Weaviate, or another vector database.

## Safety Notes

- No real patient data is used.
- No real clinical decision is made.
- The application uses mock clinical documents only.
- The LLM is instructed to answer only from retrieved context.
- The LLM output is validated using Zod.
- The app displays a medical disclaimer.

## Demo Medications

- atorvastatin
- semaglutide
- metformin
- amoxicillin
- ibuprofen

## Run Backend

```bash
cd backend
npm install
npm run dev
```
