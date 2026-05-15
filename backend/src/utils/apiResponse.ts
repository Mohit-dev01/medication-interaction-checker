export function successResponse<T>(data: T) {
  return {
    success: true,
    data,
  };
}

export function errorResponse(
  message: string,
  statusCode: number,
  details?: unknown,
) {
  return {
    success: false,
    error: {
      message,
      statusCode,
      details,
    },
  };
}
