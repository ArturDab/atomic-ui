// Zephyr – publiczne API modułu
export type {
  Client, ClientStatus,
  ClientConfig, ClientAppearance, ClientAIConfig,
  UTMPreset,
  Section, SectionType, SectionScope,
  SelectedSection, UploadedImage, URLEntry,
  NewsletterBrief, Newsletter, NewsletterStatus,
  AIMessage, GenerationRequest, GenerationResult,
} from './types'

export { useClients }           from './hooks/useClients'
export { useNewsletterCreator } from './hooks/useNewsletterCreator'
export { useArtifact }          from './hooks/useArtifact'
