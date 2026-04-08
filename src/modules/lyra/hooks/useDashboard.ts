import { useState, useMemo } from 'react'
import type { ContentItem, ContentType } from '../types'

type FilterType = 'all' | ContentType
type SortOption = 'updated' | 'title' | 'words'
type ViewMode = 'list' | 'grid'

export function useDashboard(initialItems: ContentItem[]) {
  const [items, setItems] = useState<ContentItem[]>(initialItems)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [sort, setSort] = useState<SortOption>('updated')
  const [view, setView] = useState<ViewMode>('list')

  const filtered = useMemo(() => items
    .filter(i => filter === 'all' || i.type === filter)
    .filter(i => !search || i.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title, 'pl') : sort === 'words' ? b.words - a.words : 0),
    [items, search, filter, sort])

  const stats = useMemo(() => ({
    total: items.length,
    totalWords: items.reduce((n, i) => n + i.words, 0),
    done: items.filter(i => i.status === 'done').length,
    inProgress: items.filter(i => i.status === 'in-progress').length,
    drafts: items.filter(i => i.status === 'draft').length,
    recent: items.filter(i => i.updatedAt.includes('dziś') || i.updatedAt.includes('wczoraj')).length,
  }), [items])

  const toggleStar = (id: string) => setItems(p => p.map(i => i.id === id ? { ...i, starred: !i.starred } : i))
  const deleteItem = (id: string) => setItems(p => p.filter(i => i.id !== id))

  return { filtered, stats, search, setSearch, filter, setFilter, sort, setSort, view, setView, toggleStar, deleteItem }
}
