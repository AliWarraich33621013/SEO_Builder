import {
  withAiRoute
} from "./chunk-OTSMQ3YN.js";

// src/routes/generate-outline/route.ts
import { generateOutline } from "@seo-builder/core/ai";
import { parseBody, generateOutlineSchema } from "@seo-builder/core/ai";
async function POST(request) {
  const body = await parseBody(request, generateOutlineSchema);
  return withAiRoute(request, "generate-outline", async () => {
    const result = await generateOutline(
      body.topic,
      body.focusKeyword,
      body.audience || "general audience",
      body.searchIntent || "informational"
    );
    return { ...result, data: result.data };
  });
}

export {
  POST
};
//# sourceMappingURL=chunk-IDUKFYM3.js.map