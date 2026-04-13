// ── Zephyr – typy domenowe ────────────────────────────────────────────────────

// ── Klienci ───────────────────────────────────────────────────────────────────

export type ClientStatus = 'active' | 'paused'

export interface Client {
  id: string
  name: string
  slug: string
  color: string
  status: ClientStatus
  newsletterCount: number
  lastSentAt: string | null
  nextScheduled?: string
  createdAt: string
}

// ── Konfiguracja klienta ──────────────────────────────────────────────────────

export interface ClientAppearance {
  primaryColor: string
  accentColor: string
  emailBackground: string
  textColor: string
  font: 'inter' | 'dm-sans' | 'georgia' | 'merriweather' | 'helvetica'
  logoUrl?: string
}

export interface ClientAIConfig {
  systemPrompt: string
  guidelines: string
}

export interface UTMPreset {
  id: string
  name: string
  source: string
  medium: string
  campaign: string
  content?: string
}

export interface ClientConfig {
  clientId: string
  appearance: ClientAppearance
  ai: ClientAIConfig
  utmPresets: UTMPreset[]
  updatedAt: string
}

// ── Sekcje ────────────────────────────────────────────────────────────────────

export type SectionType =
  | 'header' | 'hero' | 'cta' | 'product'
  | 'content' | 'divider' | 'footer'

export type SectionScope = 'global' | 'client'

export interface Section {
  id: string
  name: string
  type: SectionType
  description: string
  htmlContent: string
  scope: SectionScope
  clientId?: string
  usedCount?: number
  createdAt: string
}

// ── Kreator newslettera ───────────────────────────────────────────────────────

export interface SelectedSection {
  id: string
  name: string
  type: SectionType
  order: number
}

export interface UploadedImage {
  id: string
  name: string
  url: string        // S3-compatible URL (Railway Bucket)
  size: number
}

export interface URLEntry {
  id: string
  label: string
  url: string
  utmPresetId?: string
}

export interface NewsletterBrief {
  clientId: string
  subject: string
  preheader: string
  brief: string
  selectedSections: SelectedSection[]
  uploadedImages: UploadedImage[]
  urls: URLEntry[]
  campaignSlug: string
}

// ── Newsletter ────────────────────────────────────────────────────────────────

export type NewsletterStatus = 'draft' | 'generated' | 'exported'

export interface Newsletter {
  id: string
  clientId: string
  clientName?: string
  subject: string
  preheader: string
  brief: string
  htmlOutput: string
  status: NewsletterStatus
  sectionsUsed: { sectionId: string; order: number }[]
  tokensUsed: number
  campaignSlug: string
  sectionsCount: number
  createdAt: string
}

// ── AI ────────────────────────────────────────────────────────────────────────

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  tokens?: number
  createdAt: string
}

export interface GenerationRequest {
  brief: NewsletterBrief
  clientConfig: ClientConfig
  sectionsHtml: string[]
}

export interface GenerationResult {
  html: string
  tokensUsed: number
  model: string
}

// ── Adaptery API (implementowane w Next.js, mockowane w Atomic UI) ─────────────

export interface ClientsAdapter {
  fetchClients: () => Promise<Client[]>
  createClient: (data: Omit<Client, 'id' | 'newsletterCount' | 'createdAt'>) => Promise<Client>
  updateClient: (id: string, data: Partial<Client>) => Promise<Client>
  deleteClient: (id: string) => Promise<void>
}

export interface NewsletterAdapter {
  fetchNewsletters: (clientId?: string) => Promise<Newsletter[]>
  createNewsletter: (brief: NewsletterBrief) => Promise<Newsletter>
  updateStatus: (id: string, status: NewsletterStatus) => Promise<Newsletter>
  deleteNewsletter: (id: string) => Promise<void>
  generateHTML: (req: GenerationRequest) => Promise<GenerationResult>
}

export interface SectionAdapter {
  fetchSections: (scope?: SectionScope, clientId?: string) => Promise<Section[]>
  createSection: (data: Omit<Section, 'id' | 'createdAt'>) => Promise<Section>
  updateSection: (id: string, data: Partial<Section>) => Promise<Section>
  deleteSection: (id: string) => Promise<void>
}

export interface ClientConfigAdapter {
  fetchConfig: (clientId: string) => Promise<ClientConfig>
  saveConfig: (clientId: string, config: Omit<ClientConfig, 'clientId' | 'updatedAt'>) => Promise<ClientConfig>
}

export interface UploadAdapter {
  uploadImage: (file: File) => Promise<UploadedImage>
  deleteImage: (id: string) => Promise<void>
}
