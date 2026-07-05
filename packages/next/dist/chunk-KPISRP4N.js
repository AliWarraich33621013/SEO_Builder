import {
  withAiRoute
} from "./chunk-OTSMQ3YN.js";

// src/routes/generate-alt-text/route.ts
import { generateAltText } from "@seo-builder/core/ai";
import { parseBody, generateAltTextSchema } from "@seo-builder/core/ai";
async function POST(request) {
  const body = await parseBody(request, generateAltTextSchema);
  return withAiRoute(request, "generate-alt-text", async () => {
    const result = await generateAltText(body.imageContext, body.focusKeyword || "");
    return { ...result, data: { altText: result.data } };
  });
}

export {
  POST
};
//# sourceMappingURL=chunk-KPISRP4N.js.map