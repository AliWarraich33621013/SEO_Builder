import {
  withAiRoute
} from "./chunk-OTSMQ3YN.js";

// src/routes/generate-faq/route.ts
import { generateFAQ } from "@seo-builder/core/ai";
import { parseBody, generateFaqSchema } from "@seo-builder/core/ai";
async function POST(request) {
  const body = await parseBody(request, generateFaqSchema);
  return withAiRoute(request, "generate-faq", async () => {
    const result = await generateFAQ(body.postTitle, body.focusKeyword, body.content || "");
    return { ...result, data: { faqs: result.data } };
  });
}

export {
  POST
};
//# sourceMappingURL=chunk-F3WNH7EU.js.map