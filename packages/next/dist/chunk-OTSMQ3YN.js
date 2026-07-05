// src/route-handler.ts
import { apiErrorResponse, apiSuccessResponse } from "@seo-builder/core/api-response";
import { checkRateLimit } from "@seo-builder/core";
import { aiLogger } from "@seo-builder/core/ai";
async function withAiRoute(request, task, handler) {
  try {
    checkRateLimit(request);
    aiLogger.info("route started", { task });
    const result = await handler();
    return apiSuccessResponse(result.data, {
      provider: result.provider,
      model: result.model
    });
  } catch (error) {
    aiLogger.error("route failed", {
      task,
      error: error instanceof Error ? error.message : "unknown"
    });
    return apiErrorResponse(error);
  }
}
async function withAiRouteSimple(request, task, handler) {
  try {
    checkRateLimit(request);
    aiLogger.info("route started", { task });
    const data = await handler();
    return apiSuccessResponse(data);
  } catch (error) {
    aiLogger.error("route failed", {
      task,
      error: error instanceof Error ? error.message : "unknown"
    });
    return apiErrorResponse(error);
  }
}

export {
  withAiRoute,
  withAiRouteSimple
};
//# sourceMappingURL=chunk-OTSMQ3YN.js.map