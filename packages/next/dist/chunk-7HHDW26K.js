import {
  withAiRoute
} from "./chunk-OTSMQ3YN.js";

// src/routes/generate-content-brief/route.ts
import { generateContentBrief } from "@seo-builder/core/ai";
import { parseBody, generateContentBriefSchema } from "@seo-builder/core/ai";
async function POST(request) {
  const body = await parseBody(request, generateContentBriefSchema);
  return withAiRoute(request, "generate-content-brief", async () => {
    const result = await generateContentBrief(
      body.topic,
      body.focusKeyword,
      body.audience || "general audience"
    );
    return { ...result, data: result.data };
  });
}

export {
  POST
};
//# sourceMappingURL=chunk-7HHDW26K.js.map