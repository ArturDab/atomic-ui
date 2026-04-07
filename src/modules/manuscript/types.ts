// ── Wspólne ───────────────────────────────────────────────────────────────────

export type ContentType = 'article' | 'study' | 'book'
export type ContentStatus = 'draft' | 'in-progress' | 'review' | 'done'
export type PublishMode = 'publish' | 'schedule' | 'draft'

// ── Dashboard ─────────────────────────────────────────────────────────────────

export interface ContentItem {
  id: string
  type: ContentType
  title: string
  status: ContentStatus
  words: number
  updatedAt: string
  starred: boolean
  tags?: string[]
  chapters?: number
  sections?: number
  progress?: number // 0-100
}

export interface DashboardProps {
  items: ContentItem[]
  onOpen: (id: string) => void
  onCreate: (type: ContentType) => void
  onDelete: (id: string) => void
  onToggleStar: (id: string) => void
}

// ── Edytor artykułu ───────────────────────────────────────────────────────────

export type BlockType =
  | 'h1' | 'h2' | 'h3'
  | 'paragraph'
  | 'quote' | 'list' | 'divider'
  | 'image'
  | 'html'
  | 'ai-generated'

export interface ContentBlock {
  id: string
  type: BlockType
  content: string
  caption?: string
  metadata?: Record<string, string>
}

export interface ArticleEditorProps {
  title: string
  status: ContentStatus
  blocks: ContentBlock[]
  wordCount: number
  tags?: string[]
  onSave: (blocks: ContentBlock[]) => void
  onPublish: () => void
  onExportWP: () => void
  onBlockChange: (id: string, content: string) => void
  onBlockInsert: (afterId: string, type: BlockType) => void
  onBlockDelete: (id: string) => void
  onBlockMove: (id: string, direction: 'up' | 'down') => void
}

// ── Edytor opracowania ────────────────────────────────────────────────────────

export interface StudySection {
  id: string
  title: string
  status: ContentStatus
  words: number
  order: number
}

export interface StudyEditorProps {
  title: string
  status: ContentStatus
  sections: StudySection[]
  activeSection: StudySection | null
  activeBlocks: ContentBlock[]
  wordCount: number
  wordGoal: number
  onSectionSelect: (id: string) => void
  onSectionAdd: () => void
  onSectionDelete: (id: string) => void
  onSectionReorder: (from: number, to: number) => void
  onBlockChange: (id: string, content: string) => void
  onSave: () => void
  onExportWP: () => void
}

// ── Edytor książki ────────────────────────────────────────────────────────────

export type ChapterStatus = ContentStatus

export interface BookChapter {
  id: string
  title: string
  status: ChapterStatus
  words: number
  wordGoal: number
  order: number
  partId: string
  notes?: string
}

export interface BookPart {
  id: string
  title: string
  status: ChapterStatus
  order: number
  chapters: BookChapter[]
}

export interface BookEditorProps {
  bookTitle: string
  bookWordGoal: number
  parts: BookPart[]
  activeChapter: BookChapter | null
  activeBlocks: ContentBlock[]
  headings: { id: string; level: 1 | 2 | 3; title: string }[]
  onChapterSelect: (id: string) => void
  onChapterStatusChange: (id: string, status: ChapterStatus) => void
  onChapterNotesChange: (id: string, notes: string) => void
  onBlockChange: (id: string, content: string) => void
  onSave: () => void
}

// ── Przegląd książki ──────────────────────────────────────────────────────────

export interface BookMeta {
  id: string
  title: string
  author: string
  wordGoal: number
  aiInstructions?: string
}

export interface BookOverviewProps {
  book: BookMeta
  parts: BookPart[]
  onEditChapter: (id: string) => void
  onAddPart: () => void
  onAddChapter: (partId: string) => void
  onUpdateMeta: (meta: Partial<BookMeta>) => void
}

// ── AI Panel ──────────────────────────────────────────────────────────────────

export type AIContextLevel = 'document' | 'book'
export type AIProvider = 'openai' | 'claude' | 'gemini'

export interface AIMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  tokens?: number
  createdAt: string
}

export interface AIConversation {
  id: string
  documentId: string
  level: AIContextLevel
  messages: AIMessage[]
  createdAt: string
}

export interface AIPanelProps {
  contextTitle: string
  contextType: 'article' | 'study' | 'chapter' | 'book'
  conversation: AIConversation | null
  onSendMessage: (content: string) => Promise<void>
  onClearConversation: () => void
  onNewConversation: () => void
  onInsertText?: (text: string) => void
  onClose?: () => void
  isLoading?: boolean
  apiConfigured?: boolean
}

// ── WordPress Export ──────────────────────────────────────────────────────────

export interface WPSite {
  url: string
  user: string
  connected: boolean
}

export interface WPExportOptions {
  mode: PublishMode
  scheduleDate?: string
  scheduleTime?: string
  categories: string[]
  tags: string[]
  excerpt: string
  featuredImageId?: string
}

export interface WordPressExportProps {
  title: string
  wordCount: number
  blocks: ContentBlock[]
  wpSite: WPSite | null
  onExport: (options: WPExportOptions) => Promise<{ url: string }>
  onClose: () => void
}

// ── New Content Modal ─────────────────────────────────────────────────────────

export interface NewContentConfig {
  type: ContentType
  title: string
  template: string
  wordGoal: number
  generateWithAI: boolean
}

export interface NewContentModalProps {
  onConfirm: (config: NewContentConfig) => void
  onClose: () => void
}
