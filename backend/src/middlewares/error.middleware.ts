import type { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { errorResponse } from "../utils/apiResponse.js";
import { env } from "../config/env.js";

export function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json(errorResponse(error.message, error.statusCode, error.details));
  }

  console.error("Unexpected error:", error);

  return res
    .status(500)
    .json(
      errorResponse(
        "Something went wrong while processing your request.",
        500,
        env.nodeEnv === "development" ? error.message : undefined,
      ),
    );
}
