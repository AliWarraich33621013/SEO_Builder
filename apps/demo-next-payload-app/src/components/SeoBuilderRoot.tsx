'use client'

import type { ReactNode } from 'react'
import { SeoBuilderThemeProvider } from '@seo-builder/ui'
import seoBuilderConfig from '../../seo-builder.config'

export function SeoBuilderRoot({ children }: { children: ReactNode }) {
  return <SeoBuilderThemeProvider config={seoBuilderConfig}>{children}</SeoBuilderThemeProvider>
}
