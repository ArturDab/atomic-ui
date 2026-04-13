// Zephyr – publiczne API modułu
// Skopiuj cały folder src/modules/zephyr/ do docelowego repo Next.js

// ── Typy ──────────────────────────────────────────────────────────────────────
export type {
  // Encje
  Client, ClientStatus,
  ClientConfig, ClientAppearance, ClientAIConfig,
  UTMPreset,
  Section, SectionType, SectionScope,
  Newsletter, NewsletterStatus,
  NewsletterBrief, SelectedSection, UploadedImage, URLEntry,
  AIMessage, GenerationRequest, GenerationResult,
  // Adaptery API (implementuj w Next.js, podaj do hooków)
  ClientsAdapter,
  NewsletterAdapter,
  SectionAdapter,
  ClientConfigAdapter,
  UploadAdapter,
} from './types'

// ── Hooki ─────────────────────────────────────────────────────────────────────
export { useClients }           from './hooks/useClients'
export { useNewsletterCreator } from './hooks/useNewsletterCreator'
export { useArtifact }          from './hooks/useArtifact'
export { useHistory }           from './hooks/useHistory'
export { useSectionLibrary }    from './hooks/useSectionLibrary'
export { useClientConfig }      from './hooks/useClientConfig'
