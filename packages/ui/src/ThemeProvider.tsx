'use client'

import type { ReactNode } from 'react'
import type { SeoBuilderConfig } from '@seo-builder/core/config'
import { seoBuilderCssVars } from './theme'

export function SeoBuilderThemeProvider({
  config,
  children,
}: {
  config: SeoBuilderConfig
  children: ReactNode
}) {
  return (
    <div style={seoBuilderCssVars(config.branding)} className="seo-builder-theme">
      {children}
    </div>
  )
}

export { seoBuilderCssVars }
