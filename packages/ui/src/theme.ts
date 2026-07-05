import type { CSSProperties } from 'react'
import type { SeoBuilderBrandingConfig } from '@seo-builder/core/config'

export function seoBuilderCssVars(branding: SeoBuilderBrandingConfig): CSSProperties {
  return {
    '--seo-builder-primary': branding.primaryColor,
    '--seo-builder-secondary': branding.secondaryColor,
    '--seo-builder-bg': branding.backgroundColor,
    '--seo-builder-text': branding.textColor,
    '--seo-builder-muted': branding.mutedTextColor,
    '--seo-builder-border': branding.borderColor,
    '--seo-builder-radius': branding.borderRadius,
    '--seo-builder-font': branding.fontFamily,
  } as CSSProperties
}
