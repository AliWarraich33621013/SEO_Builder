import {
  withAiRoute
} from "./chunk-OTSMQ3YN.js";

// src/routes/detect-search-intent/route.ts
import { detectSearchIntent } from "@seo-builder/core/ai";
import { parseBody, detectSearchIntentSchema } from "@seo-builder/core/ai";
async function POST(request) {
  const body = await parseBody(request, detectSearchIntentSchema);
  return withAiRoute(request, "detect-search-intent", async () => {
    const result = await detectSearchIntent(body.topic, body.focusKeyword);
    return { ...result, data: result.data };
  });
}

export {
  POST
};
//# sourceMappingURL=chunk-JS3XU4KN.js.map