import {
  withAiRoute
} from "./chunk-OTSMQ3YN.js";

// src/routes/generate-slug/route.ts
import { generateSlug } from "@seo-builder/core/ai";
import { parseBody, generateSlugSchema } from "@seo-builder/core/ai";
async function POST(request) {
  const body = await parseBody(request, generateSlugSchema);
  return withAiRoute(request, "generate-slug", async () => {
    const result = await generateSlug(body.postTitle, body.focusKeyword || "");
    return { ...result, data: { slug: result.data } };
  });
}

export {
  POST
};
//# sourceMappingURL=chunk-6DS525MB.js.map