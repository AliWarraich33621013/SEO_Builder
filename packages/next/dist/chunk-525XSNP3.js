import {
  withAiRoute
} from "./chunk-OTSMQ3YN.js";

// src/routes/improve-readability/route.ts
import { improveReadability } from "@seo-builder/core/ai";
import { parseBody, improveReadabilitySchema } from "@seo-builder/core/ai";
async function POST(request) {
  const body = await parseBody(request, improveReadabilitySchema);
  return withAiRoute(request, "improve-readability", async () => {
    const result = await improveReadability(body.content, body.focusKeyword || "");
    return { ...result, data: result.data };
  });
}

export {
  POST
};
//# sourceMappingURL=chunk-525XSNP3.js.map