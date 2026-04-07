import { useState } from 'react'
import type { AIMessage, AIConversation } from '../types'

export function useAIConversation(documentId: string, level: 'document' | 'book' = 'document') {
  const [conversation, setConversation] = useState<AIConversation>({
    id: `${documentId}-${level}`, documentId, level, messages: [], createdAt: new Date().toISOString(),
  })
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (content: string, apiCall?: (msgs: AIMessage[]) => Promise<string>) => {
    const userMsg: AIMessage = { id: Date.now().toString(), role: 'user', content, createdAt: new Date().toISOString() }
    setConversation(p => ({ ...p, messages: [...p.messages, userMsg] }))
    setIsLoading(true)
    try {
      const reply = apiCall ? await apiCall([...conversation.messages, userMsg]) : 'Demo: skonfiguruj klucz API w ustawieniach.'
      const assistantMsg: AIMessage = { id: (Date.now()+1).toString(), role: 'assistant', content: reply, tokens: Math.round(reply.length/4), createdAt: new Date().toISOString() }
      setConversation(p => ({ ...p, messages: [...p.messages, assistantMsg] }))
    } finally { setIsLoading(false) }
  }

  const clear = () => setConversation(p => ({ ...p, messages: [] }))
  const newConv = () => setConversation({ id: `${documentId}-${level}-${Date.now()}`, documentId, level, messages: [], createdAt: new Date().toISOString() })

  return { conversation, isLoading, sendMessage, clear, newConv }
}
