import { useState, useMemo, useEffect, useCallback } from 'react'
import type { Newsletter, NewsletterStatus, NewsletterAdapter } from '../types'

// Demo data
const DEMO_NEWSLETTERS: Newsletter[] = [
  { id: '1', clientId: '1', clientName: 'Animails',  subject: 'Wiosenna promocja – do -40% na karmy!',     preheader: 'Sprawdź, co przygotowaliśmy dla Twojego pupila', brief: '', htmlOutput: '', status: 'generated', sectionsUsed: [], tokensUsed: 3260, campaignSlug: 'wiosna-2026',    sectionsCount: 5, createdAt: '2026-04-13T14:09:00Z' },
  { id: '2', clientId: '1', clientName: 'Animails',  subject: 'Nowości marzec 2026 – karma Royal Canin',   preheader: 'Polecamy produkty, które Twój pupil pokocha',   brief: '', htmlOutput: '', status: 'exported', sectionsUsed: [], tokensUsed: 2840, campaignSlug: 'mar-2026',       sectionsCount: 4, createdAt: '2026-03-12T11:23:00Z' },
  { id: '3', clientId: '1', clientName: 'Animails',  subject: 'Walentynki dla pupili – prezenty do 80 zł', preheader: 'Znajdź idealny prezent dla czworonoga',          brief: '', htmlOutput: '', status: 'exported', sectionsUsed: [], tokensUsed: 4120, campaignSlug: 'walentynki-2026', sectionsCount: 6, createdAt: '2026-02-12T09:00:00Z' },
  { id: '4', clientId: '1', clientName: 'Animails',  subject: 'Nowa karma bezzbożowa – premiera',          preheader: 'Odkryj nową linię karm dla wrażliwych psów',      brief: '', htmlOutput: '', status: 'draft',    sectionsUsed: [], tokensUsed: 0,    campaignSlug: 'bezzbozowa-2026', sectionsCount: 3, createdAt: '2026-02-03T16:45:00Z' },
  { id: '5', clientId: '2', clientName: 'Beezu',     subject: 'Kolekcja wiosna 2026 – nowe modele biżuterii', preheader: 'Złoto, srebro i kryształy na wiosnę',          brief: '', htmlOutput: '', status: 'exported', sectionsUsed: [], tokensUsed: 3100, campaignSlug: 'wiosna-2026',    sectionsCount: 5, createdAt: '2026-04-08T10:00:00Z' },
]

type SortOption = 'date' | 'status' | 'client'

export function useHistory(
  clientId?: string,
  adapter?: NewsletterAdapter
) {
  const [newsletters, setNewsletters]         = useState<Newsletter[]>([])
  const [isLoading, setIsLoading]             = useState(true)
  const [error, setError]                     = useState<string | null>(null)
  const [search, setSearch]                   = useState('')
  const [statusFilter, setStatusFilter]       = useState<NewsletterStatus | 'all'>('all')
  const [sort, setSort]                       = useState<SortOption>('date')

  useEffect(() => {
    setIsLoading(true)
    const load = adapter
      ? adapter.fetchNewsletters(clientId)
      : Promise.resolve(clientId
          ? DEMO_NEWSLETTERS.filter(n => n.clientId === clientId)
          : DEMO_NEWSLETTERS
        )

    load
      .then(data => { setNewsletters(data); setError(null) })
      .catch(e  => setError(e.message))
      .finally(() => setIsLoading(false))
  }, [clientId]) // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() =>
    newsletters
      .filter(n => statusFilter === 'all' || n.status === statusFilter)
      .filter(n => !search || n.subject.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sort === 'date')   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        if (sort === 'client') return (a.clientName || '').localeCompare(b.clientName || '', 'pl')
        if (sort === 'status') return a.status.localeCompare(b.status)
        return 0
      }),
  [newsletters, search, statusFilter, sort])

  const stats = useMemo(() => ({
    total:       newsletters.length,
    exported:    newsletters.filter(n => n.status === 'exported').length,
    generated:   newsletters.filter(n => n.status === 'generated').length,
    drafts:      newsletters.filter(n => n.status === 'draft').length,
    totalTokens: newsletters.reduce((s, n) => s + n.tokensUsed, 0),
    avgSections: newsletters.length
      ? Math.round(newsletters.reduce((s, n) => s + n.sectionsCount, 0) / newsletters.length * 10) / 10
      : 0,
  }), [newsletters])

  const deleteNewsletter = useCallback(async (id: string) => {
    if (adapter) await adapter.deleteNewsletter(id)
    setNewsletters(prev => prev.filter(n => n.id !== id))
  }, [adapter])

  const updateStatus = useCallback(async (id: string, status: NewsletterStatus) => {
    if (adapter) {
      const updated = await adapter.updateStatus(id, status)
      setNewsletters(prev => prev.map(n => n.id === id ? updated : n))
    } else {
      setNewsletters(prev => prev.map(n => n.id === id ? { ...n, status } : n))
    }
  }, [adapter])

  return {
    newsletters: filtered, allNewsletters: newsletters, stats,
    isLoading, error,
    search, setSearch,
    statusFilter, setStatusFilter,
    sort, setSort,
    deleteNewsletter, updateStatus,
  }
}
