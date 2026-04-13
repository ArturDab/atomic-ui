import { useState, useCallback } from 'react'
import type { AIMessage, NewsletterAdapter, Newsletter, NewsletterStatus } from '../types'

type ViewMode = 'desktop' | 'mobile'

export function useArtifact(
  initialNewsletter: Pick<Newsletter, 'id' | 'subject' | 'htmlOutput' | 'status'>,
  adapter?: NewsletterAdapter
) {
  const [html, setHtml]               = useState(initialNewsletter.htmlOutput)
  const [viewMode, setViewMode]       = useState<ViewMode>('desktop')
  const [activeTab, setActiveTab]     = useState<'preview' | 'html'>('preview')
  const [messages, setMessages]       = useState<AIMessage[]>([])
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [status, setStatus]           = useState<NewsletterStatus>(initialNewsletter.status)
  const [copied, setCopied]           = useState(false)

  // ── Kopiuj / pobierz ──────────────────────────────────────────────────────
  const copyHtml = useCallback(() => {
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [html])

  const downloadHtml = useCallback(() => {
    const blob = new Blob([html], { type: 'text/html' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `${initialNewsletter.subject.replace(/\s+/g, '-').toLowerCase()}.html`
    a.click()
    URL.revokeObjectURL(url)
  }, [html, initialNewsletter.subject])

  // ── Eksport (zmiana statusu) ──────────────────────────────────────────────
  const markExported = useCallback(async () => {
    if (adapter) await adapter.updateStatus(initialNewsletter.id, 'exported')
    setStatus('exported')
  }, [adapter, initialNewsletter.id])

  // ── AI chat ───────────────────────────────────────────────────────────────
  const sendMessage = useCallback(async (
    content: string,
    apiCall?: (msgs: AIMessage[], currentHtml: string) => Promise<string>
  ) => {
    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: 'user', content,
      createdAt: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMsg])
    setIsAiLoading(true)

    try {
      const reply = apiCall
        ? await apiCall([...messages, userMsg], html)
        : '[Demo] Skonfiguruj ANTHROPIC_API_KEY aby używać asystenta AI.'

      // Jeśli odpowiedź zawiera HTML – zaktualizuj podgląd
      const htmlMatch = reply.match(/```html\n([\s\S]*?)\n```/)
      if (htmlMatch) setHtml(htmlMatch[1])

      const assistantMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant', content: reply,
        createdAt: new Date().toISOString(),
      }
      setMessages(prev => [...prev, assistantMsg])
      return assistantMsg
    } finally {
      setIsAiLoading(false)
    }
  }, [html, messages])

  const clearMessages = useCallback(() => setMessages([]), [])

  return {
    html, setHtml,
    viewMode, setViewMode,
    activeTab, setActiveTab,
    messages, isAiLoading,
    status,
    copied,
    copyHtml, downloadHtml, markExported,
    sendMessage, clearMessages,
  }
}
