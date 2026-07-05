import {
  withAiRoute
} from "./chunk-OTSMQ3YN.js";

// src/routes/generate-meta-description/route.ts
import { generateMetaDescriptions } from "@seo-builder/core/ai";
import { parseBody, generateMetaDescriptionSchema } from "@seo-builder/core/ai";
async function POST(request) {
  const body = await parseBody(request, generateMetaDescriptionSchema);
  return withAiRoute(request, "generate-meta-description", async () => {
    const result = await generateMetaDescriptions(
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
//# sourceMappingURL=chunk-KNWZJHYE.js.map