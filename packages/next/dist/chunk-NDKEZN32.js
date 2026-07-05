import {
  withAiRoute
} from "./chunk-OTSMQ3YN.js";

// src/routes/generate-meta/route.ts
import { generateMetaDescriptions, generateMetaTitles } from "@seo-builder/core/ai";
import { parseBody, generateMetaSchema } from "@seo-builder/core/ai";
async function POST(request) {
  const body = await parseBody(request, generateMetaSchema);
  return withAiRoute(request, "generate-meta", async () => {
    if (body.type === "description") {
      const result2 = await generateMetaDescriptions(
        body.postTitle,
        body.focusKeyword,
        body.excerpt || body.content || ""
      );
      return { ...result2, data: { suggestions: result2.data } };
    }
    const result = await generateMetaTitles(body.postTitle, body.focusKeyword);
    return { ...result, data: { suggestions: result.data } };
  });
}

export {
  POST
};
//# sourceMappingURL=chunk-NDKEZN32.js.map