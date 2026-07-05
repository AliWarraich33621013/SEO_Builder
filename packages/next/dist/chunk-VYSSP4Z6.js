import {
  withAiRoute
} from "./chunk-OTSMQ3YN.js";

// src/routes/generate-excerpt/route.ts
import { generateExcerpt } from "@seo-builder/core/ai";
import { parseBody, generateExcerptSchema } from "@seo-builder/core/ai";
async function POST(request) {
  const body = await parseBody(request, generateExcerptSchema);
  return withAiRoute(request, "generate-excerpt", async () => {
    const result = await generateExcerpt(
      body.postTitle,
      body.focusKeyword,
      body.content || ""
    );
    return { ...result, data: { excerpts: result.data } };
  });
}

export {
  POST
};
//# sourceMappingURL=chunk-VYSSP4Z6.js.map