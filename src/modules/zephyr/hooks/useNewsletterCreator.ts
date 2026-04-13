import { useState, useCallback, useMemo } from 'react'
import type {
  NewsletterBrief, SelectedSection, UploadedImage,
  URLEntry, NewsletterAdapter, UploadAdapter, GenerationResult
} from '../types'

export function useNewsletterCreator(
  clientId: string,
  adapters?: { newsletter?: NewsletterAdapter; upload?: UploadAdapter }
) {
  const [subject, setSubject]         = useState('')
  const [preheader, setPreheader]     = useState('')
  const [brief, setBrief]             = useState('')
  const [campaignSlug, setCampaignSlug] = useState('')
  const [selectedSections, setSelectedSections] = useState<SelectedSection[]>([])
  const [uploadedImages, setUploadedImages]     = useState<UploadedImage[]>([])
  const [urls, setUrls]               = useState<URLEntry[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationResult, setGenerationResult] = useState<GenerationResult | null>(null)
  const [error, setError]             = useState<string | null>(null)

  // ── Sekcje ────────────────────────────────────────────────────────────────
  const addSection = useCallback((section: Omit<SelectedSection, 'order'>) => {
    setSelectedSections(prev => [...prev, { ...section, order: prev.length }])
  }, [])

  const removeSection = useCallback((id: string) => {
    setSelectedSections(prev =>
      prev.filter(s => s.id !== id).map((s, i) => ({ ...s, order: i }))
    )
  }, [])

  const reorderSections = useCallback((fromIndex: number, toIndex: number) => {
    setSelectedSections(prev => {
      const next = [...prev]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next.map((s, i) => ({ ...s, order: i }))
    })
  }, [])

  // ── Obrazy ────────────────────────────────────────────────────────────────
  const uploadImage = useCallback(async (file: File) => {
    if (adapters?.upload) {
      const image = await adapters.upload.uploadImage(file)
      setUploadedImages(prev => [...prev, image])
      return image
    }
    // Demo: fake upload
    const demo: UploadedImage = {
      id: Date.now().toString(),
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
    }
    setUploadedImages(prev => [...prev, demo])
    return demo
  }, [adapters])

  const removeImage = useCallback(async (id: string) => {
    if (adapters?.upload) await adapters.upload.deleteImage(id)
    setUploadedImages(prev => prev.filter(i => i.id !== id))
  }, [adapters])

  // ── URL-e ─────────────────────────────────────────────────────────────────
  const addUrl = useCallback((url: Omit<URLEntry, 'id'>) => {
    setUrls(prev => [...prev, { ...url, id: Date.now().toString() }])
  }, [])

  const removeUrl = useCallback((id: string) => {
    setUrls(prev => prev.filter(u => u.id !== id))
  }, [])

  // ── Walidacja ─────────────────────────────────────────────────────────────
  const isValid = useMemo(() =>
    subject.trim().length > 0 && selectedSections.length > 0,
  [subject, selectedSections])

  const getBrief = useCallback((): NewsletterBrief => ({
    clientId, subject, preheader, brief,
    campaignSlug, selectedSections, uploadedImages, urls,
  }), [clientId, subject, preheader, brief, campaignSlug, selectedSections, uploadedImages, urls])

  // ── Reset ─────────────────────────────────────────────────────────────────
  const reset = useCallback(() => {
    setSubject(''); setPreheader(''); setBrief(''); setCampaignSlug('')
    setSelectedSections([]); setUploadedImages([]); setUrls([])
    setGenerationResult(null); setError(null)
  }, [])

  return {
    // Pola
    subject, setSubject,
    preheader, setPreheader,
    brief, setBrief,
    campaignSlug, setCampaignSlug,
    // Sekcje
    selectedSections,
    addSection, removeSection, reorderSections,
    // Obrazy
    uploadedImages,
    uploadImage, removeImage,
    // URL-e
    urls, addUrl, removeUrl,
    // Stan generacji
    isGenerating, setIsGenerating,
    generationResult, setGenerationResult,
    error, setError,
    // Helpers
    isValid, getBrief, reset,
  }
}
