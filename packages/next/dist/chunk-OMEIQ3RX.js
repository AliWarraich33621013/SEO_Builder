// src/routes/provider-info/route.ts
import { getProviderInfo } from "@seo-builder/core/ai";
import { getProviderDisplayName } from "@seo-builder/core/ai";
import { apiSuccessResponse } from "@seo-builder/core/api-response";
async function GET() {
  const info = getProviderInfo();
  return apiSuccessResponse({
    provider: info.provider,
    providerLabel: getProviderDisplayName(info.provider),
    model: info.model
  });
}

export {
  GET
};
//# sourceMappingURL=chunk-OMEIQ3RX.js.map