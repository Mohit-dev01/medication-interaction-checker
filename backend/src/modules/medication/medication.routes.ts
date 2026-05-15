import { Router } from "express";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { MedicationCheckRequestSchema } from "./medication.schema.js";
import { checkMedicationController } from "./medication.controller.js";

const router = Router();

router.post(
  "/check",
  validateBody(MedicationCheckRequestSchema),
  asyncHandler(checkMedicationController),
);

export default router;
