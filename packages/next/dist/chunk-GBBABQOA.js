import {
  withAiRoute
} from "./chunk-OTSMQ3YN.js";

// src/routes/generate-cta/route.ts
import { generateCta } from "@seo-builder/core/ai";
import { parseBody, generateCtaSchema } from "@seo-builder/core/ai";
async function POST(request) {
  const body = await parseBody(request, generateCtaSchema);
  return withAiRoute(request, "generate-cta", async () => {
    const result = await generateCta(
      body.postTitle,
      body.focusKeyword,
      body.excerpt || body.content || ""
    );
    return { ...result, data: { suggestions: result.data } };
  });
}

export {
  POST
};
//# sourceMappingURL=chunk-GBBABQOA.js.map