// Skopiuj do: src/modules/zephyr/hooks/useNewsletterCreator.ts
import { useState, useCallback } from 'react'
import type {
  NewsletterBrief, SelectedSection, UploadedImage,
  URLEntry, SectionType
} from '../types'

export function useNewsletterCreator(clientId: string) {
  const [subject, setSubject] = useState('')
  const [preheader, setPreheader] = useState('')
  const [brief, setBrief] = useState('')
  const [campaignSlug, setCampaignSlug] = useState('')
  const [selectedSections, setSelectedSections] = useState<SelectedSection[]>([])
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [urls, setUrls] = useState<URLEntry[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const addSection = useCallback((section: Omit<SelectedSection, 'order'>) => {
    setSelectedSections(prev => [
      ...prev,
      { ...section, order: prev.length }
    ])
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

  const addImage = useCallback((image: UploadedImage) => {
    setUploadedImages(prev => [...prev, image])
  }, [])

  const removeImage = useCallback((id: string) => {
    setUploadedImages(prev => prev.filter(i => i.id !== id))
  }, [])

  const addUrl = useCallback((url: Omit<URLEntry, 'id'>) => {
    setUrls(prev => [...prev, { ...url, id: Date.now().toString() }])
  }, [])

  const removeUrl = useCallback((id: string) => {
    setUrls(prev => prev.filter(u => u.id !== id))
  }, [])

  const isValid = subject.trim().length > 0 && selectedSections.length > 0

  const getBrief = (): NewsletterBrief => ({
    clientId,
    subject,
    preheader,
    brief,
    campaignSlug,
    selectedSections,
    uploadedImages,
    urls,
  })

  return {
    subject, setSubject,
    preheader, setPreheader,
    brief, setBrief,
    campaignSlug, setCampaignSlug,
    selectedSections,
    uploadedImages,
    urls,
    isGenerating, setIsGenerating,
    isValid,
    addSection, removeSection, reorderSections,
    addImage, removeImage,
    addUrl, removeUrl,
    getBrief,
  }
}
