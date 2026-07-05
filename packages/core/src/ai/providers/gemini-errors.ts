/**
 * Detect Gemini 403 / PERMISSION_DENIED / project access denied errors
 * from @google/generative-ai SDK responses and wrapped Error messages.
 */
export function isGeminiAccessDeniedError(error: unknown): boolean {
  if (!error) return false

  if (typeof error === 'object') {
    const e = error as Record<string, unknown>
    if (e.status === 403) return true

    const statusText = String(e.statusText || '').toLowerCase()
    if (statusText === 'forbidden') return true

    const details = e.errorDetails
    if (Array.isArray(details)) {
      const denied = details.some((detail) => {
        if (!detail || typeof detail !== 'object') return false
        const d = detail as Record<string, unknown>
        const reason = String(d.reason || d['@type'] || '').toUpperCase()
        return reason.includes('PERMISSION_DENIED')
      })
      if (denied) return true
    }
  }

  const message = error instanceof Error ? error.message : String(error)
  const lower = message.toLowerCase()

  if (lower.includes('your project has been denied access')) return true
  if (lower.includes('permission_denied')) return true
  if (lower.includes('403 forbidden') && lower.includes('denied')) return true
  if (lower.includes('403') && lower.includes('forbidden') && lower.includes('denied access')) {
    return true
  }

  return false
}
