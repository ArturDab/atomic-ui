import { useState, useCallback } from 'react'
import type { ContentBlock, BlockType } from '../types'

export function useArticleEditor(initialBlocks: ContentBlock[]) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialBlocks)
  const [dirty, setDirty] = useState(false)
  const [showAI, setShowAI] = useState(true)
  const [showBlocks, setShowBlocks] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)

  const wordCount = blocks
    .filter(b => ['h1','h2','h3','paragraph','quote','list','ai-generated'].includes(b.type))
    .reduce((n, b) => n + b.content.split(/\s+/).filter(Boolean).length, 0)

  const updateBlock = useCallback((id: string, content: string) => {
    setBlocks(p => p.map(b => b.id === id ? { ...b, content } : b)); setDirty(true)
  }, [])

  const insertBlock = useCallback((afterId: string, type: BlockType) => {
    const nb: ContentBlock = { id: Date.now().toString(), type, content: '' }
    setBlocks(p => { const i = p.findIndex(b => b.id === afterId); const n = [...p]; n.splice(i + 1, 0, nb); return n })
    setDirty(true)
  }, [])

  const deleteBlock = useCallback((id: string) => {
    setBlocks(p => p.filter(b => b.id !== id)); setDirty(true)
  }, [])

  return { blocks, wordCount, dirty, showAI, setShowAI, showBlocks, setShowBlocks, fullscreen, setFullscreen, updateBlock, insertBlock, deleteBlock, markSaved: () => setDirty(false) }
}
