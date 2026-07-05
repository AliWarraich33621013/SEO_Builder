import {
  withAiRouteSimple
} from "./chunk-OTSMQ3YN.js";

// src/routes/seo-score/route.ts
import { calculateSeoScore } from "@seo-builder/core/seo";
import { parseBody } from "@seo-builder/core/ai";
import { seoScoreSchema } from "@seo-builder/core/validation";
async function POST(request) {
  const body = await parseBody(request, seoScoreSchema);
  return withAiRouteSimple(request, "seo-score", async () => {
    const post = body.post ?? body;
    const siteSettings = body.siteSettings;
    return calculateSeoScore(post, siteSettings);
  });
}

export {
  POST
};
//# sourceMappingURL=chunk-3VDV7PXO.js.map