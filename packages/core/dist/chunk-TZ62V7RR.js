import {
  isAIError
} from "./chunk-MBZD5R4K.js";

// src/api-response.ts
import { NextResponse } from "next/server";
function apiErrorResponse(error) {
  if (isAIError(error)) {
    return NextResponse.json(
      {
        success: false,
        error: { code: error.code, message: error.message }
      },
      { status: error.status }
    );
  }
  const message = error instanceof Error ? error.message : "Request failed";
  return NextResponse.json(
    {
      success: false,
      error: { code: "AI_REQUEST_FAILED", message }
    },
    { status: 500 }
  );
}
function apiSuccessResponse(data, meta) {
  return NextResponse.json({
    success: true,
    provider: meta?.provider,
    model: meta?.model,
    data
  });
}
var aiErrorResponse = apiErrorResponse;
var aiSuccessResponse = apiSuccessResponse;

export {
  apiErrorResponse,
  apiSuccessResponse,
  aiErrorResponse,
  aiSuccessResponse
};
//# sourceMappingURL=chunk-TZ62V7RR.js.map