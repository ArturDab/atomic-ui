import { useState, useMemo, useEffect, useCallback } from 'react'
import type { Section, SectionType, SectionScope, SectionAdapter } from '../types'

const DEMO_SECTIONS: Section[] = [
  { id: '1', name: 'Nagłówek standardowy',   type: 'header',  description: 'Logo + nawigacja + przycisk CTA',       scope: 'global', usedCount: 8,  htmlContent: '<table><!-- nagłówek --></table>', createdAt: '2025-12-01T00:00:00Z' },
  { id: '2', name: 'Hero full-width',         type: 'hero',    description: 'Duży baner z tłem i CTA',               scope: 'global', usedCount: 5,  htmlContent: '<table><!-- hero --></table>',     createdAt: '2025-12-01T00:00:00Z' },
  { id: '3', name: 'Sekcja CTA prosta',       type: 'cta',     description: 'Tekst + przycisk wyśrodkowany',         scope: 'global', usedCount: 12, htmlContent: '<table><!-- cta --></table>',      createdAt: '2025-12-01T00:00:00Z' },
  { id: '4', name: 'Stopka standardowa',      type: 'footer',  description: 'Dane firmy + linki + dane kontaktowe',  scope: 'global', usedCount: 9,  htmlContent: '<table><!-- stopka --></table>',   createdAt: '2025-12-01T00:00:00Z' },
  { id: '5', name: 'Nagłówek Animails',       type: 'header',  description: 'Logo Animails + tagline',               scope: 'client', clientId: '1', usedCount: 3, htmlContent: '<table><!-- animails header --></table>', createdAt: '2026-01-10T00:00:00Z' },
  { id: '6', name: 'Produkty 3 kolumny',      type: 'product', description: 'Siatka 3 produktów z cenami',           scope: 'client', clientId: '1', usedCount: 6, htmlContent: '<table><!-- produkty --></table>',        createdAt: '2026-01-15T00:00:00Z' },
]

export function useSectionLibrary(clientId?: string, adapter?: SectionAdapter) {
  const [sections, setSections]               = useState<Section[]>([])
  const [isLoading, setIsLoading]             = useState(true)
  const [error, setError]                     = useState<string | null>(null)
  const [search, setSearch]                   = useState('')
  const [typeFilter, setTypeFilter]           = useState<SectionType | 'all'>('all')
  const [activeScope, setActiveScope]         = useState<SectionScope>('global')

  useEffect(() => {
    setIsLoading(true)
    const load = adapter
      ? adapter.fetchSections(activeScope, clientId)
      : Promise.resolve(
          DEMO_SECTIONS.filter(s =>
            s.scope === activeScope &&
            (activeScope === 'global' || s.clientId === clientId)
          )
        )

    load
      .then(data => { setSections(data); setError(null) })
      .catch(e  => setError(e.message))
      .finally(() => setIsLoading(false))
  }, [activeScope, clientId]) // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() =>
    sections
      .filter(s => typeFilter === 'all' || s.type === typeFilter)
      .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase())),
  [sections, typeFilter, search])

  const createSection = useCallback(async (data: Omit<Section, 'id' | 'createdAt'>) => {
    if (adapter) {
      const created = await adapter.createSection(data)
      setSections(prev => [...prev, created])
      return created
    }
    const mock: Section = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() }
    setSections(prev => [...prev, mock])
    return mock
  }, [adapter])

  const deleteSection = useCallback(async (id: string) => {
    if (adapter) await adapter.deleteSection(id)
    setSections(prev => prev.filter(s => s.id !== id))
  }, [adapter])

  const getForCreator = useCallback((scope: SectionScope) =>
    sections.filter(s => s.scope === scope),
  [sections])

  return {
    sections: filtered, allSections: sections,
    isLoading, error,
    search, setSearch,
    typeFilter, setTypeFilter,
    activeScope, setActiveScope,
    createSection, deleteSection,
    getForCreator,
  }
}
