// Skopiuj do: src/modules/zephyr/hooks/useArtifact.ts
import { useState } from 'react'
import type { AIMessage } from '../types'

type ViewMode = 'desktop' | 'mobile'
type ActiveTab = 'preview' | 'html' | 'chat'

export function useArtifact(initialHtml: string) {
  const [html, setHtml] = useState(initialHtml)
  const [viewMode, setViewMode] = useState<ViewMode>('desktop')
  const [activeTab, setActiveTab] = useState<ActiveTab>('preview')
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyHtml = () => {
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadHtml = (subject: string) => {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${subject.replace(/\s+/g, '-').toLowerCase()}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const sendMessage = async (
    content: string,
    apiCall?: (msgs: AIMessage[], currentHtml: string) => Promise<string>
  ) => {
    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    try {
      const reply = apiCall
        ? await apiCall([...messages, userMsg], html)
        : 'Demo: skonfiguruj Anthropic API key.'

      // Jeśli odpowiedź zawiera HTML - zaktualizuj podgląd
      const htmlMatch = reply.match(/```html\n([\s\S]*?)\n```/)
      if (htmlMatch) {
        setHtml(htmlMatch[1])
      }

      const assistantMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        createdAt: new Date().toISOString(),
      }
      setMessages(prev => [...prev, assistantMsg])
    } finally {
      setIsLoading(false)
    }
  }

  return {
    html, setHtml,
    viewMode, setViewMode,
    activeTab, setActiveTab,
    messages,
    isLoading,
    copied,
    copyHtml,
    downloadHtml,
    sendMessage,
  }
}
