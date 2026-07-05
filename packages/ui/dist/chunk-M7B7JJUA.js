var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/theme.ts
function seoBuilderCssVars(branding) {
  return {
    "--seo-builder-primary": branding.primaryColor,
    "--seo-builder-secondary": branding.secondaryColor,
    "--seo-builder-bg": branding.backgroundColor,
    "--seo-builder-text": branding.textColor,
    "--seo-builder-muted": branding.mutedTextColor,
    "--seo-builder-border": branding.borderColor,
    "--seo-builder-radius": branding.borderRadius,
    "--seo-builder-font": branding.fontFamily
  };
}

export {
  __require,
  seoBuilderCssVars
};
