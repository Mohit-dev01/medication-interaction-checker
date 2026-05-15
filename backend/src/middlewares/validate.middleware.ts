import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { AppError } from "../errors/AppError.js";

export function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError("Invalid request body.", 400, result.error.flatten()),
      );
    }

    req.body = result.data;
    next();
  };
}
