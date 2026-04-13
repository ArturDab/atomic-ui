import { useState, useCallback, useEffect } from 'react'
import type { ClientConfig, ClientAppearance, ClientAIConfig, UTMPreset, ClientConfigAdapter } from '../types'

const DEFAULT_CONFIG: Omit<ClientConfig, 'clientId' | 'updatedAt'> = {
  appearance: {
    primaryColor:   '#0ea5e9',
    accentColor:    '#0284c7',
    emailBackground:'#f8fafc',
    textColor:      '#0f172a',
    font:           'inter',
    logoUrl:        '',
  },
  ai: {
    systemPrompt: 'Jesteś doświadczonym copywriterem email marketingowym. Piszesz po polsku, w tonie przyjaznym i sprzedażowym.',
    guidelines:   '',
  },
  utmPresets: [],
}

export function useClientConfig(clientId: string, adapter?: ClientConfigAdapter) {
  const [config, setConfig]     = useState<ClientConfig>({
    ...DEFAULT_CONFIG,
    clientId,
    updatedAt: new Date().toISOString(),
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving]   = useState(false)
  const [isDirty, setIsDirty]     = useState(false)
  const [error, setError]         = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    const load = adapter
      ? adapter.fetchConfig(clientId)
      : Promise.resolve({ ...DEFAULT_CONFIG, clientId, updatedAt: new Date().toISOString() })

    load
      .then(data => { setConfig(data); setError(null) })
      .catch(e  => setError(e.message))
      .finally(() => setIsLoading(false))
  }, [clientId]) // eslint-disable-line react-hooks/exhaustive-deps

  const updateAppearance = useCallback((patch: Partial<ClientAppearance>) => {
    setConfig(prev => ({ ...prev, appearance: { ...prev.appearance, ...patch } }))
    setIsDirty(true)
  }, [])

  const updateAI = useCallback((patch: Partial<ClientAIConfig>) => {
    setConfig(prev => ({ ...prev, ai: { ...prev.ai, ...patch } }))
    setIsDirty(true)
  }, [])

  const addUTMPreset = useCallback((preset: Omit<UTMPreset, 'id'>) => {
    setConfig(prev => ({
      ...prev,
      utmPresets: [...prev.utmPresets, { ...preset, id: Date.now().toString() }],
    }))
    setIsDirty(true)
  }, [])

  const removeUTMPreset = useCallback((id: string) => {
    setConfig(prev => ({ ...prev, utmPresets: prev.utmPresets.filter(p => p.id !== id) }))
    setIsDirty(true)
  }, [])

  const save = useCallback(async () => {
    setIsSaving(true)
    setError(null)
    try {
      if (adapter) {
        const { clientId: _cid, updatedAt: _ts, ...data } = config
        const saved = await adapter.saveConfig(clientId, data)
        setConfig(saved)
      } else {
        setConfig(prev => ({ ...prev, updatedAt: new Date().toISOString() }))
      }
      setIsDirty(false)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Błąd zapisu')
    } finally {
      setIsSaving(false)
    }
  }, [config, clientId, adapter])

  return {
    config,
    isLoading, isSaving, isDirty, error,
    updateAppearance, updateAI,
    addUTMPreset, removeUTMPreset,
    save,
  }
}
