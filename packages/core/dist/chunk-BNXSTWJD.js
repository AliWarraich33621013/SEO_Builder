// src/validation/seo-score.ts
import { z } from "zod";
var seoScoreSchema = z.object({
  post: z.record(z.unknown()).optional(),
  siteSettings: z.record(z.unknown()).optional()
});

export {
  seoScoreSchema
};
//# sourceMappingURL=chunk-BNXSTWJD.js.map