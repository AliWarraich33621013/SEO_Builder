import {
  withAiRoute
} from "./chunk-OTSMQ3YN.js";

// src/routes/generate-meta-title/route.ts
import { generateMetaTitles } from "@seo-builder/core/ai";
import { parseBody, generateMetaTitleSchema } from "@seo-builder/core/ai";
async function POST(request) {
  const body = await parseBody(request, generateMetaTitleSchema);
  return withAiRoute(request, "generate-meta-title", async () => {
    const result = await generateMetaTitles(body.postTitle, body.focusKeyword);
    return { ...result, data: { suggestions: result.data } };
  });
}

export {
  POST
};
//# sourceMappingURL=chunk-YFG6LQTP.js.map