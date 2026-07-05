'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useForm, useFormFields } from '@payloadcms/ui'

type ProviderInfo = {
  provider: string
  model: string
}

type ApiSuccess<T> = {
  success: true
  provider?: string
  model?: string
  data: T
}

type ApiError = {
  success: false
  error: { code: string; message: string }
}

type ResultItem = {
  id: string
  label: string
  content: string
  applyField?: string
  applyValue?: unknown
}

function extractTextFromContent(content: unknown): string {
  if (!content) return ''
  if (typeof content === 'string') return content

  try {
    const json = typeof content === 'object' ? content : JSON.parse(String(content))
    const texts: string[] = []

    const walk = (node: unknown) => {
      if (!node || typeof node !== 'object') return
      const n = node as Record<string, unknown>
      if (typeof n.text === 'string') texts.push(n.text)
      if (Array.isArray(n.children)) n.children.forEach(walk)
      if (Array.isArray(n.root)) n.root.forEach(walk)
      if (n.root && typeof n.root === 'object') walk(n.root)
    }

    walk(json)
    return texts.join(' ')
  } catch {
    return ''
  }
}

function formatOutline(outline: {
  h1?: string
  introAngle?: string
  structure?: { heading: string; subheadings?: string[] }[]
  faqSuggestions?: string[]
  ctaSuggestion?: string
}): string {
  const lines: string[] = []
  if (outline.h1) lines.push(`H1: ${outline.h1}`)
  if (outline.introAngle) lines.push(`\nIntro angle: ${outline.introAngle}`)
  if (outline.structure?.length) {
    lines.push('\nStructure:')
    outline.structure.forEach((s) => {
      lines.push(`- ${s.heading}`)
      s.subheadings?.forEach((sub) => lines.push(`  - ${sub}`))
    })
  }
  if (outline.faqSuggestions?.length) {
    lines.push('\nFAQ suggestions:')
    outline.faqSuggestions.forEach((q) => lines.push(`- ${q}`))
  }
  if (outline.ctaSuggestion) lines.push(`\nCTA: ${outline.ctaSuggestion}`)
  return lines.join('\n')
}

function formatSocial(data: { linkedin?: string; twitter?: string; facebook?: string }): string {
  return [
    data.linkedin && `LinkedIn:\n${data.linkedin}`,
    data.twitter && `Twitter/X:\n${data.twitter}`,
    data.facebook && `Facebook:\n${data.facebook}`,
  ]
    .filter(Boolean)
    .join('\n\n')
}

async function postApi<T>(endpoint: string, body: Record<string, unknown>): Promise<ApiSuccess<T>> {
  const res = await fetch(`/api/seo-builder/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  let json: ApiSuccess<T> | ApiError
  try {
    json = (await res.json()) as ApiSuccess<T> | ApiError
  } catch {
    throw new Error(`Request failed (${res.status}). Check server logs and AI provider configuration.`)
  }

  if (!json.success) {
    const err = json as ApiError
    throw new Error(err.error?.message || `Request failed (${res.status})`)
  }

  return json as ApiSuccess<T>
}

const panelStyle: React.CSSProperties = {
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: 'var(--style-radius-m)',
  padding: '1.25rem',
  background: 'var(--theme-elevation-50)',
}

const badgeStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '0.25rem 0.6rem',
  borderRadius: 'var(--style-radius-s)',
  background: 'var(--theme-elevation-100)',
  fontSize: '0.8rem',
  marginBottom: '1rem',
}

const buttonStyle: React.CSSProperties = {
  margin: '0.25rem',
  padding: '0.45rem 0.75rem',
  fontSize: '0.85rem',
  cursor: 'pointer',
  border: '1px solid var(--theme-elevation-200)',
  borderRadius: 'var(--style-radius-s)',
  background: 'var(--theme-elevation-0)',
}

const cardStyle: React.CSSProperties = {
  border: '1px solid var(--theme-elevation-150)',
  borderRadius: 'var(--style-radius-s)',
  padding: '0.75rem',
  marginTop: '0.5rem',
  background: 'var(--theme-elevation-0)',
  whiteSpace: 'pre-wrap',
  fontSize: '0.9rem',
}

export const AiAssistantPanel: React.FC = () => {
  const { dispatchFields, setModified } = useForm()

  const formValues = useFormFields(([fields]) => ({
    title: (fields.title?.value as string) || '',
    excerpt: (fields.excerpt?.value as string) || '',
    content: fields.content?.value,
    focusKeyword: (fields.focusKeyword?.value as string) || '',
    metaTitle: (fields.metaTitle?.value as string) || '',
    metaDescription: (fields.metaDescription?.value as string) || '',
    slug: (fields.slug?.value as string) || '',
  }))

  const [providerInfo, setProviderInfo] = useState<ProviderInfo | null>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<ResultItem[]>([])

  useEffect(() => {
    fetch('/api/seo-builder/provider-info')
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) setProviderInfo(json.data)
      })
      .catch(() => {})
  }, [])

  const applyField = useCallback(
    (path: string, value: unknown) => {
      dispatchFields({ type: 'UPDATE', path, value })
      setModified(true)
    },
    [dispatchFields, setModified],
  )

  const addResults = useCallback((items: ResultItem[]) => {
    setResults(items.map((item, i) => ({ ...item, id: `${Date.now()}-${i}` })))
  }, [])

  const runAction = useCallback(
    async (actionId: string, fn: () => Promise<void>) => {
      setLoading(actionId)
      setError(null)
      try {
        await fn()
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Something went wrong')
      } finally {
        setLoading(null)
      }
    },
    [],
  )

  const topic = formValues.title || 'Untitled post'
  const focusKeyword = formValues.focusKeyword
  const contentText = extractTextFromContent(formValues.content)

  const requireKeyword = () => {
    if (!focusKeyword.trim()) {
      setError('Set a focus keyword in the SEO tab first.')
      return false
    }
    return true
  }

  const saveSuggestions = () => {
    if (results.length === 0) return
    const payload = results.map(({ label, content }) => ({ label, content }))
    applyField('aiSuggestions', payload)
  }

  return (
    <div style={panelStyle}>
      <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem' }}>SEO Builder AI Assistant</h3>
      <p style={{ margin: '0 0 1rem', color: 'var(--theme-elevation-800)', fontSize: '0.9rem' }}>
        Generate SEO content suggestions. Review results, then copy or apply to fields. Save the document
        when you are ready — nothing is auto-saved.
      </p>

      {providerInfo && (
        <div style={badgeStyle}>
          Using {providerInfo.provider.charAt(0).toUpperCase() + providerInfo.provider.slice(1)} (
          {providerInfo.model})
        </div>
      )}

      {error && (
        <div
          style={{
            ...cardStyle,
            borderColor: 'var(--theme-error-500)',
            color: 'var(--theme-error-500)',
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginBottom: '1rem' }}>
        <button
          type="button"
          style={buttonStyle}
          disabled={!!loading}
          onClick={() =>
            runAction('titles', async () => {
              if (!requireKeyword()) return
              const res = await postApi<{ titles: string[] }>('generate-title', {
                topic,
                focusKeyword,
              })
              addResults(
                (res.data.titles || []).map((t, i) => ({
                  id: `title-${i}`,
                  label: `Title option ${i + 1}`,
                  content: t,
                  applyField: 'title',
                  applyValue: t,
                })),
              )
            })
          }
        >
          {loading === 'titles' ? 'Generating…' : 'Generate titles'}
        </button>

        <button
          type="button"
          style={buttonStyle}
          disabled={!!loading}
          onClick={() =>
            runAction('outline', async () => {
              if (!requireKeyword()) return
              const res = await postApi<Record<string, unknown>>('generate-outline', {
                topic,
                focusKeyword,
              })
              const text = formatOutline(res.data as Parameters<typeof formatOutline>[0])
              addResults([{ id: 'outline', label: 'Content outline', content: text }])
            })
          }
        >
          {loading === 'outline' ? 'Generating…' : 'Generate outline'}
        </button>

        <button
          type="button"
          style={buttonStyle}
          disabled={!!loading}
          onClick={() =>
            runAction('meta-title', async () => {
              if (!requireKeyword()) return
              const res = await postApi<{ suggestions: string[] }>('generate-meta-title', {
                postTitle: topic,
                focusKeyword,
              })
              addResults(
                (res.data.suggestions || []).map((t, i) => ({
                  id: `meta-title-${i}`,
                  label: `Meta title ${i + 1}`,
                  content: t,
                  applyField: 'metaTitle',
                  applyValue: t,
                })),
              )
            })
          }
        >
          {loading === 'meta-title' ? 'Generating…' : 'Meta title'}
        </button>

        <button
          type="button"
          style={buttonStyle}
          disabled={!!loading}
          onClick={() =>
            runAction('meta-desc', async () => {
              if (!requireKeyword()) return
              const res = await postApi<{ suggestions: string[] }>('generate-meta-description', {
                postTitle: topic,
                focusKeyword,
                excerpt: formValues.excerpt,
                content: contentText,
              })
              addResults(
                (res.data.suggestions || []).map((t, i) => ({
                  id: `meta-desc-${i}`,
                  label: `Meta description ${i + 1}`,
                  content: t,
                  applyField: 'metaDescription',
                  applyValue: t,
                })),
              )
            })
          }
        >
          {loading === 'meta-desc' ? 'Generating…' : 'Meta description'}
        </button>

        <button
          type="button"
          style={buttonStyle}
          disabled={!!loading}
          onClick={() =>
            runAction('slug', async () => {
              const res = await postApi<{ slug: string }>('generate-slug', {
                postTitle: topic,
                focusKeyword: focusKeyword || undefined,
              })
              const slug = res.data.slug
              addResults([
                {
                  id: 'slug',
                  label: 'Suggested slug',
                  content: slug,
                  applyField: 'slug',
                  applyValue: slug,
                },
              ])
            })
          }
        >
          {loading === 'slug' ? 'Generating…' : 'Generate slug'}
        </button>

        <button
          type="button"
          style={buttonStyle}
          disabled={!!loading}
          onClick={() =>
            runAction('faq', async () => {
              if (!requireKeyword()) return
              const res = await postApi<{ faqs: { question: string; answer: string }[] }>(
                'generate-faq',
                {
                  postTitle: topic,
                  focusKeyword,
                  content: contentText,
                },
              )
              const faqs = res.data.faqs || []
              const text = faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join('\n\n')
              addResults([
                {
                  id: 'faq',
                  label: 'FAQ suggestions',
                  content: text,
                  applyField: 'faqItems',
                  applyValue: faqs,
                },
              ])
            })
          }
        >
          {loading === 'faq' ? 'Generating…' : 'Generate FAQ'}
        </button>

        <button
          type="button"
          style={buttonStyle}
          disabled={!!loading}
          onClick={() =>
            runAction('excerpt', async () => {
              if (!requireKeyword()) return
              const res = await postApi<{ excerpts: string[] }>('generate-excerpt', {
                postTitle: topic,
                focusKeyword,
                content: contentText,
              })
              addResults(
                (res.data.excerpts || []).map((t, i) => ({
                  id: `excerpt-${i}`,
                  label: `Excerpt ${i + 1}`,
                  content: t,
                  applyField: 'excerpt',
                  applyValue: t,
                })),
              )
            })
          }
        >
          {loading === 'excerpt' ? 'Generating…' : 'Generate excerpt'}
        </button>

        <button
          type="button"
          style={buttonStyle}
          disabled={!!loading}
          onClick={() =>
            runAction('social', async () => {
              const res = await postApi<{ linkedin: string; twitter: string; facebook: string }>(
                'generate-social-captions',
                {
                  postTitle: topic,
                  excerpt: formValues.excerpt,
                  content: contentText,
                },
              )
              addResults([
                {
                  id: 'social',
                  label: 'Social captions',
                  content: formatSocial(res.data),
                },
              ])
            })
          }
        >
          {loading === 'social' ? 'Generating…' : 'Social captions'}
        </button>

        <button
          type="button"
          style={buttonStyle}
          disabled={!!loading}
          onClick={() =>
            runAction('readability', async () => {
              const source = contentText || formValues.excerpt
              if (!source.trim()) {
                setError('Add content or an excerpt to improve readability.')
                return
              }
              const res = await postApi<{ improvedText: string; changesSummary: string }>(
                'improve-readability',
                {
                  content: source,
                  focusKeyword: focusKeyword || undefined,
                },
              )
              addResults([
                {
                  id: 'readability',
                  label: 'Improved text',
                  content: `${res.data.improvedText}\n\n---\nChanges: ${res.data.changesSummary}`,
                  applyField: 'excerpt',
                  applyValue: res.data.improvedText,
                },
              ])
            })
          }
        >
          {loading === 'readability' ? 'Generating…' : 'Improve readability'}
        </button>
      </div>

      {results.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Results</strong>
            <button type="button" style={buttonStyle} onClick={saveSuggestions}>
              Save suggestions to JSON field
            </button>
          </div>
          {results.map((item) => (
            <div key={item.id} style={cardStyle}>
              <div style={{ fontWeight: 600, marginBottom: '0.35rem' }}>{item.label}</div>
              <div>{item.content}</div>
              <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  style={buttonStyle}
                  onClick={() => navigator.clipboard.writeText(item.content)}
                >
                  Copy
                </button>
                {item.applyField && (
                  <button
                    type="button"
                    style={buttonStyle}
                    onClick={() => applyField(item.applyField!, item.applyValue ?? item.content)}
                  >
                    Apply to {item.applyField}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
