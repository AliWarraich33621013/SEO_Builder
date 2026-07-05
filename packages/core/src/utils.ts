export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function getMediaUrl(
  media: { url?: string | null; filename?: string | null } | string | null | undefined,
): string | undefined {
  if (!media) return undefined
  if (typeof media === 'string') return undefined
  return media.url ?? undefined
}
