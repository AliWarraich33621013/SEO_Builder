import {
  POST as POST12
} from "./chunk-JS3XU4KN.js";
import {
  POST as POST13
} from "./chunk-GBBABQOA.js";
import {
  POST as POST14
} from "./chunk-525XSNP3.js";
import {
  POST as POST15
} from "./chunk-3VDV7PXO.js";
import {
  GET
} from "./chunk-OMEIQ3RX.js";
import {
  POST as POST5
} from "./chunk-NDKEZN32.js";
import {
  POST as POST6
} from "./chunk-6DS525MB.js";
import {
  POST as POST7
} from "./chunk-F3WNH7EU.js";
import {
  POST as POST8
} from "./chunk-VYSSP4Z6.js";
import {
  POST as POST9
} from "./chunk-KPISRP4N.js";
import "./chunk-G4TQAMRH.js";
import {
  POST as POST10
} from "./chunk-N6QM7K66.js";
import {
  POST as POST11
} from "./chunk-7HHDW26K.js";
import {
  createSitemap
} from "./chunk-3OGMX7JM.js";
import {
  createRobots
} from "./chunk-FVPJFQYV.js";
import {
  POSTS_PER_PAGE,
  createQueryHelpers
} from "./chunk-3SRILUZC.js";
import {
  POST
} from "./chunk-R7ZLUPMR.js";
import {
  POST as POST2
} from "./chunk-IDUKFYM3.js";
import {
  POST as POST3
} from "./chunk-YFG6LQTP.js";
import {
  POST as POST4
} from "./chunk-KNWZJHYE.js";
import {
  withAiRoute,
  withAiRouteSimple
} from "./chunk-OTSMQ3YN.js";

// src/routes/posts/createPostsHandler.ts
import { apiErrorResponse, apiSuccessResponse } from "@seo-builder/core/api-response";
function createPostsHandler(payloadConfig) {
  const { getPublishedPosts } = createQueryHelpers(payloadConfig);
  return async function GET2(request) {
    try {
      const { searchParams } = new URL(request.url);
      const page = Number(searchParams.get("page") || "1");
      const limit = Number(searchParams.get("limit") || "12");
      const result = await getPublishedPosts({ page, limit });
      return apiSuccessResponse({
        posts: result.docs,
        totalDocs: result.totalDocs,
        totalPages: result.totalPages,
        page: result.page
      });
    } catch (error) {
      return apiErrorResponse(error);
    }
  };
}
export {
  POSTS_PER_PAGE,
  createPostsHandler,
  createQueryHelpers,
  createRobots,
  createSitemap,
  POST12 as detectSearchIntentPOST,
  POST9 as generateAltTextPOST,
  POST11 as generateContentBriefPOST,
  POST13 as generateCtaPOST,
  POST8 as generateExcerptPOST,
  POST7 as generateFaqPOST,
  POST4 as generateMetaDescriptionPOST,
  POST5 as generateMetaPOST,
  POST3 as generateMetaTitlePOST,
  POST2 as generateOutlinePOST,
  POST6 as generateSlugPOST,
  POST10 as generateSocialCaptionsPOST,
  POST10 as generateSocialPOST,
  POST as generateTitlePOST,
  POST14 as improveReadabilityPOST,
  GET as providerInfoGET,
  POST15 as seoScorePOST,
  withAiRoute,
  withAiRouteSimple
};
//# sourceMappingURL=index.js.map