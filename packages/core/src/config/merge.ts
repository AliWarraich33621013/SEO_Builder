import { defaultSeoBuilderConfig } from './defaults'
import type { SeoBuilderConfig } from './types'

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function deepMerge<T extends Record<string, unknown>>(base: T, partial?: Partial<T>): T {
  if (!partial) return base
  const result = { ...base }
  for (const key of Object.keys(partial) as (keyof T)[]) {
    const value = partial[key]
    if (value === undefined) continue
    const baseValue = base[key]
    if (isPlainObject(baseValue) && isPlainObject(value)) {
      result[key] = deepMerge(baseValue as Record<string, unknown>, value as Record<string, unknown>) as T[keyof T]
    } else {
      result[key] = value as T[keyof T]
    }
  }
  return result
}

export function resolveSeoBuilderConfig(partial?: Partial<SeoBuilderConfig>): SeoBuilderConfig {
  return deepMerge(defaultSeoBuilderConfig as unknown as Record<string, unknown>, partial as Record<string, unknown>) as SeoBuilderConfig
}
