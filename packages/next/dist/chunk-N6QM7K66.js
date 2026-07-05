import {
  withAiRoute
} from "./chunk-OTSMQ3YN.js";

// src/routes/generate-social-captions/route.ts
import { generateSocialCaptions } from "@seo-builder/core/ai";
import { parseBody, generateSocialSchema } from "@seo-builder/core/ai";
async function POST(request) {
  const body = await parseBody(request, generateSocialSchema);
  return withAiRoute(request, "generate-social-captions", async () => {
    const result = await generateSocialCaptions(body.postTitle, body.excerpt || body.content || "");
    return { ...result, data: result.data };
  });
}

export {
  POST
};
//# sourceMappingURL=chunk-N6QM7K66.js.map