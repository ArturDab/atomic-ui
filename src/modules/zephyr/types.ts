// ── Zephyr – typy domenowe ────────────────────────────────────────────────────
// Skopiuj do: src/modules/zephyr/types.ts

// ── Klienci ───────────────────────────────────────────────────────────────────

export type ClientStatus = 'active' | 'paused'

export interface Client {
  id: string
  name: string
  slug: string
  color: string            // hex, używany jako accent w UI i w generowanym HTML
  status: ClientStatus
  newsletterCount: number
  lastSentAt: string | null
  nextScheduled?: string
  createdAt: string
}

// ── Konfiguracja klienta ──────────────────────────────────────────────────────

export interface ClientAppearance {
  primaryColor: string     // hex
  secondaryColor: string   // hex
  font: 'inter' | 'dm-sans' | 'georgia' | 'merriweather'
  logoUrl?: string
}

export interface ClientAIConfig {
  systemPrompt: string     // instrukcje dla modelu
  guidelines: string       // wytyczne copywriterskie
}

export interface UTMPreset {
  id: string
  name: string             // np. "Kampania wiosenna"
  source: string           // newsletter
  medium: string           // email
  campaign: string         // wiosna-2025
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
  htmlContent: string      // surowy HTML sekcji
  scope: SectionScope
  clientId?: string        // null gdy globalna
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
  cfUrl: string            // Cloudflare CDN URL
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
  brief: string            // opis tematu dla AI
  selectedSections: SelectedSection[]
  uploadedImages: UploadedImage[]
  urls: URLEntry[]
  campaignSlug: string
}

// ── Newsletter (wynik) ────────────────────────────────────────────────────────

export type NewsletterStatus = 'draft' | 'generated' | 'exported'

export interface Newsletter {
  id: string
  clientId: string
  subject: string
  preheader: string
  brief: string
  htmlOutput: string       // wygenerowany HTML
  status: NewsletterStatus
  sectionsUsed: { sectionId: string; order: number }[]
  tokensUsed: number
  campaignSlug: string
  createdAt: string
}

// ── AI ────────────────────────────────────────────────────────────────────────

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

export interface GenerationRequest {
  brief: NewsletterBrief
  clientConfig: ClientConfig
  sectionsHtml: string[]   // HTML każdej wybranej sekcji
}

export interface GenerationResult {
  html: string
  tokensUsed: number
  model: string
}
