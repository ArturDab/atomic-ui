import { useState, useMemo } from 'react'
import type { BookPart, ContentBlock, ChapterStatus } from '../types'

export function useBookEditor(initialParts: BookPart[], initialBlocks: Record<string, ContentBlock[]> = {}) {
  const [parts, setParts] = useState<BookPart[]>(initialParts)
  const [activeId, setActiveId] = useState<string | null>(() => {
    for (const p of initialParts) { const c = p.chapters.find(ch => ch.status === 'in-progress'); if (c) return c.id }
    return initialParts[0]?.chapters[0]?.id ?? null
  })
  const [blocks, setBlocks] = useState(initialBlocks)
  const [expanded, setExpanded] = useState<Set<string>>(new Set(initialParts.slice(0, 2).map(p => p.id)))
  const [showStructure, setShowStructure] = useState(true)
  const [showOutline, setShowOutline] = useState(true)
  const [showAI, setShowAI] = useState(true)
  const [fullscreen, setFullscreen] = useState(false)

  const allChapters = useMemo(() => parts.flatMap(p => p.chapters), [parts])
  const activeChapter = useMemo(() => allChapters.find(c => c.id === activeId) ?? null, [allChapters, activeId])
  const activeBlocks = useMemo(() => activeId ? (blocks[activeId] ?? []) : [], [activeId, blocks])
  const totalWords = allChapters.reduce((n, c) => n + c.words, 0)

  const togglePart = (id: string) => setExpanded(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })
  const updateStatus = (id: string, status: ChapterStatus) => setParts(p => p.map(pt => ({ ...pt, chapters: pt.chapters.map(c => c.id === id ? { ...c, status } : c) })))
  const updateNotes = (id: string, notes: string) => setParts(p => p.map(pt => ({ ...pt, chapters: pt.chapters.map(c => c.id === id ? { ...c, notes } : c) })))
  const updateBlock = (id: string, content: string) => {
    if (!activeId) return
    setBlocks(p => ({ ...p, [activeId]: (p[activeId] ?? []).map(b => b.id === id ? { ...b, content } : b) }))
  }

  return { parts, activeChapter, activeBlocks, totalWords, expanded, togglePart, showStructure, setShowStructure, showOutline, setShowOutline, showAI, setShowAI, fullscreen, setFullscreen, setActiveId, updateStatus, updateNotes, updateBlock }
}
