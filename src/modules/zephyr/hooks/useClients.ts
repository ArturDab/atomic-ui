import { useState, useMemo, useCallback, useEffect } from 'react'
import type { Client, ClientStatus, ClientsAdapter } from '../types'

type SortOption = 'name' | 'lastSent' | 'newsletterCount'

// Demo data – używane w Atomic UI (gdy adapter nie jest przekazany)
const DEMO_CLIENTS: Client[] = [
  { id: '1', name: 'Animails',      slug: 'animails',      color: '#0ea5e9', status: 'active', newsletterCount: 24, lastSentAt: '2026-04-12T09:00:00Z', nextScheduled: 'w piątek',  createdAt: '2025-01-15T00:00:00Z' },
  { id: '2', name: 'Beezu',         slug: 'beezu',         color: '#10b981', status: 'active', newsletterCount: 12, lastSentAt: '2026-04-08T14:00:00Z',                              createdAt: '2025-02-10T00:00:00Z' },
  { id: '3', name: 'Kosmik Studio', slug: 'kosmik-studio', color: '#8b5cf6', status: 'paused', newsletterCount: 7,  lastSentAt: '2026-03-22T10:00:00Z',                              createdAt: '2025-03-01T00:00:00Z' },
  { id: '4', name: 'Growthers',     slug: 'growthers',     color: '#f59e0b', status: 'active', newsletterCount: 31, lastSentAt: '2026-04-13T09:00:00Z', nextScheduled: 'za 2 tyg.', createdAt: '2024-11-20T00:00:00Z' },
]

export function useClients(adapter?: ClientsAdapter) {
  const [clients, setClients]       = useState<Client[]>([])
  const [isLoading, setIsLoading]   = useState(true)
  const [error, setError]           = useState<string | null>(null)
  const [search, setSearch]         = useState('')
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all')
  const [sort, setSort]             = useState<SortOption>('name')

  // Załaduj klientów
  useEffect(() => {
    setIsLoading(true)
    const load = adapter
      ? adapter.fetchClients()
      : Promise.resolve(DEMO_CLIENTS)

    load
      .then(data => { setClients(data); setError(null) })
      .catch(e  => setError(e.message))
      .finally(() => setIsLoading(false))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() =>
    clients
      .filter(c => statusFilter === 'all' || c.status === statusFilter)
      .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sort === 'name')            return a.name.localeCompare(b.name, 'pl')
        if (sort === 'newsletterCount') return b.newsletterCount - a.newsletterCount
        if (sort === 'lastSent') {
          if (!a.lastSentAt) return 1
          if (!b.lastSentAt) return -1
          return new Date(b.lastSentAt).getTime() - new Date(a.lastSentAt).getTime()
        }
        return 0
      }),
  [clients, search, statusFilter, sort])

  const stats = useMemo(() => ({
    total:            clients.length,
    active:           clients.filter(c => c.status === 'active').length,
    paused:           clients.filter(c => c.status === 'paused').length,
    totalNewsletters: clients.reduce((n, c) => n + c.newsletterCount, 0),
  }), [clients])

  const toggleStatus = useCallback(async (id: string) => {
    const client = clients.find(c => c.id === id)
    if (!client) return
    const newStatus = client.status === 'active' ? 'paused' : 'active'
    if (adapter) {
      const updated = await adapter.updateClient(id, { status: newStatus })
      setClients(prev => prev.map(c => c.id === id ? updated : c))
    } else {
      setClients(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c))
    }
  }, [clients, adapter])

  const deleteClient = useCallback(async (id: string) => {
    if (adapter) await adapter.deleteClient(id)
    setClients(prev => prev.filter(c => c.id !== id))
  }, [adapter])

  const createClient = useCallback(async (data: Omit<Client, 'id' | 'newsletterCount' | 'createdAt'>) => {
    if (adapter) {
      const created = await adapter.createClient(data)
      setClients(prev => [...prev, created])
      return created
    }
    const mock: Client = { ...data, id: Date.now().toString(), newsletterCount: 0, createdAt: new Date().toISOString() }
    setClients(prev => [...prev, mock])
    return mock
  }, [adapter])

  return {
    clients: filtered, allClients: clients, stats,
    isLoading, error,
    search, setSearch,
    statusFilter, setStatusFilter,
    sort, setSort,
    toggleStatus, deleteClient, createClient,
  }
}
