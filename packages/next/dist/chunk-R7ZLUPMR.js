import {
  withAiRoute
} from "./chunk-OTSMQ3YN.js";

// src/routes/generate-title/route.ts
import { generateTitles } from "@seo-builder/core/ai";
import { parseBody, generateTitleSchema } from "@seo-builder/core/ai";
async function POST(request) {
  const body = await parseBody(request, generateTitleSchema);
  return withAiRoute(request, "generate-title", async () => {
    const result = await generateTitles(body.topic, body.focusKeyword, body.audience || "general audience");
    return { ...result, data: { titles: result.data } };
  });
}

export {
  POST
};
//# sourceMappingURL=chunk-R7ZLUPMR.js.map