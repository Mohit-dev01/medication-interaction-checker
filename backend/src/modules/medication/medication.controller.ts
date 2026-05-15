import type { Request, Response } from "express";
import { successResponse } from "../../utils/apiResponse.js";
import { checkMedication } from "./medication.service.js";
import type { MedicationCheckRequest } from "./medication.schema.js";

export async function checkMedicationController(req: Request, res: Response) {
  const body = req.body as MedicationCheckRequest;

  const result = await checkMedication(body.medication);

  return res.status(200).json(successResponse(result));
}
