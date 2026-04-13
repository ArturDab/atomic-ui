// Skopiuj do: src/modules/zephyr/hooks/useClients.ts
import { useState, useMemo } from 'react'
import type { Client, ClientStatus } from '../types'

type SortOption = 'name' | 'lastSent' | 'newsletterCount'

export function useClients(initialClients: Client[]) {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all')
  const [sort, setSort] = useState<SortOption>('name')

  const filtered = useMemo(() => {
    return clients
      .filter(c => statusFilter === 'all' || c.status === statusFilter)
      .filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => {
        if (sort === 'name') return a.name.localeCompare(b.name, 'pl')
        if (sort === 'newsletterCount') return b.newsletterCount - a.newsletterCount
        if (sort === 'lastSent') {
          if (!a.lastSentAt) return 1
          if (!b.lastSentAt) return -1
          return new Date(b.lastSentAt).getTime() - new Date(a.lastSentAt).getTime()
        }
        return 0
      })
  }, [clients, search, statusFilter, sort])

  const toggleStatus = (id: string) =>
    setClients(prev => prev.map(c =>
      c.id === id
        ? { ...c, status: c.status === 'active' ? 'paused' : 'active' }
        : c
    ))

  const deleteClient = (id: string) =>
    setClients(prev => prev.filter(c => c.id !== id))

  const stats = useMemo(() => ({
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    paused: clients.filter(c => c.status === 'paused').length,
    totalNewsletters: clients.reduce((n, c) => n + c.newsletterCount, 0),
  }), [clients])

  return {
    filtered, stats,
    search, setSearch,
    statusFilter, setStatusFilter,
    sort, setSort,
    toggleStatus, deleteClient,
  }
}
