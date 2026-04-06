import { BookOpen, FileText, Zap } from 'lucide-react'
import { PageHeader } from '@/components/blocks/page-header'
import { AppSidebar } from '@/components/blocks/app-sidebar'
import { DocumentCard } from '@/components/blocks/document-card'
import { PromptCard } from '@/components/blocks/prompt-card'
import { StatCard } from '@/components/blocks/stat-card'
import { EmptyState } from '@/components/blocks/empty-state'
import { EditorToolbar } from '@/components/blocks/editor-toolbar'
import { ChatMessage } from '@/components/blocks/chat-message'
import { ConnectionCard } from '@/components/blocks/connection-card'
import { FilterBar } from '@/components/blocks/filter-bar'
import { SidePanel, SidePanelHeader, SidePanelAction, SidePanelSearch, SidePanelToolbar, SidePanelNote, SidePanelSection, SidePanelItem, SidePanelItemTitle, SidePanelItemMeta, SidePanelList } from '@/components/blocks/side-panel'
import { Button } from '@/components/ui/button'
import type { RegistryEntry } from './types'

export const blockRegistry: RegistryEntry[] = [

  {
    slug: 'block-page-header',
    title: 'Page Header',
    description: 'Nagłówek widoku z breadcrumb, tytułem i przyciskami akcji.',
    category: 'Blocks',
    props: [
      { name: 'title', type: 'string', description: 'Tytuł strony' },
      { name: 'breadcrumbs', type: 'Breadcrumb[]', description: 'Ścieżka nawigacji' },
      { name: 'actions', type: 'ReactNode', description: 'Przyciski po prawej' },
      { name: 'description', type: 'string', description: 'Podtytuł/opis' },
    ],
    examples: [
      {
        title: 'Z akcjami',
        render: () => (
          <div className="w-full border rounded-xl overflow-hidden">
            <PageHeader
              breadcrumbs={[{ label: 'Dokumenty', href: '/documents' }, { label: 'Nowy' }]}
              title="Artykuł blogowy o SEO"
              description="Ostatnio edytowany 2 godziny temu"
              actions={
                <>
                  <Button variant="outline" size="sm">Zapisz szkic</Button>
                  <Button size="sm">Opublikuj</Button>
                </>
              }
            />
          </div>
        ),
      },
    ],
  },

  {
    slug: 'block-app-sidebar',
    title: 'App Sidebar',
    description: 'Nawigacja boczna aplikacji z linkami, licznikami i profilem użytkownika.',
    category: 'Blocks',
    props: [
      { name: 'activeHref', type: 'string', description: 'Aktywna ścieżka' },
      { name: 'user', type: '{ name, email, initials }', description: 'Dane użytkownika' },
      { name: 'appName', type: 'string', default: 'ContentPilot', description: 'Nazwa aplikacji' },
    ],
    examples: [
      {
        title: 'Z użytkownikiem',
        render: () => (
          <div className="h-96 border rounded-xl overflow-hidden">
            <AppSidebar
              activeHref="/documents"
              user={{ name: 'Artur K.', email: 'artur@simplimo.pl', initials: 'AK' }}
            />
          </div>
        ),
      },
    ],
  },

  {
    slug: 'block-document-card',
    title: 'Document Card',
    description: 'Karta dokumentu z tytułem, statusem, platformą i akcjami.',
    category: 'Blocks',
    props: [
      { name: 'title', type: 'string' },
      { name: 'status', type: 'string', options: ['draft', 'published', 'scheduled'] },
      { name: 'updatedAt', type: 'string' },
      { name: 'platform', type: 'string' },
      { name: 'categories', type: 'string[]' },
    ],
    examples: [
      {
        title: 'Trzy stany',
        render: () => (
          <div className="space-y-3 w-80">
            <DocumentCard
              title="Jak pisać treści SEO, które naprawdę działają w 2025 roku"
              excerpt="Poznaj sprawdzone techniki optymalizacji treści, które pomogą Ci..."
              status="published"
              updatedAt="wczoraj"
              platform="WordPress"
              categories={['SEO', 'Marketing']}
            />
            <DocumentCard
              title="10 narzędzi AI dla marketerów – przegląd"
              status="draft"
              updatedAt="2 godz. temu"
              platform="WordPress"
              categories={['AI', 'Narzędzia']}
            />
            <DocumentCard
              title="Newsletter: Trendy w content marketingu"
              status="scheduled"
              updatedAt="za 3 dni"
              platform="Mailchimp"
            />
          </div>
        ),
      },
    ],
  },

  {
    slug: 'block-prompt-card',
    title: 'Prompt Card',
    description: 'Karta szablonu promptu z kategorią, opisem i licznikiem parametrów.',
    category: 'Blocks',
    props: [
      { name: 'category', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'paramCount', type: 'number' },
    ],
    examples: [
      {
        title: 'Różne kategorie',
        render: () => (
          <div className="grid grid-cols-2 gap-3 w-96">
            {[
              { category: 'SEO', title: 'Artykuł blogowy', description: 'Pełny artykuł z H1, intro, sekcjami i meta description.', paramCount: 3 },
              { category: 'Social', title: 'Post LinkedIn', description: 'Angażujący post z hookiem, treścią i CTA.', paramCount: 2 },
              { category: 'Email', title: 'Newsletter tygodniowy', description: 'Email z podsumowaniem tygodnia i linkami.', paramCount: 4 },
              { category: 'Blog', title: 'Recenzja produktu', description: 'Obiektywna recenzja z plusami, minusami i werdyktem.', paramCount: 5 },
            ].map(p => (
              <PromptCard key={p.title} {...p} />
            ))}
          </div>
        ),
      },
    ],
  },

  {
    slug: 'block-stat-card',
    title: 'Stat Card',
    description: 'Karta metryki z wartością, etykietą i trendem.',
    category: 'Blocks',
    props: [
      { name: 'label', type: 'string' },
      { name: 'value', type: 'string | number' },
      { name: 'trend', type: 'number', description: 'Zmiana – dodatnia lub ujemna' },
      { name: 'trendLabel', type: 'string' },
    ],
    examples: [
      {
        title: 'Dashboard row',
        render: () => (
          <div className="grid grid-cols-2 gap-3 w-96">
            <StatCard label="Dokumenty" value={47} trend={12} trendLabel="ten miesiąc" icon={FileText} />
            <StatCard label="Opublikowane" value={31} trend={8} trendLabel="ten miesiąc" icon={BookOpen} />
            <StatCard label="Prompty" value={18} trend={3} icon={Zap} />
            <StatCard label="Słowa (tys.)" value="124k" trend={-5} trendLabel="vs poprzedni" />
          </div>
        ),
      },
    ],
  },

  {
    slug: 'block-empty-state',
    title: 'Empty State',
    description: 'Pusty stan listy z ikoną, komunikatem i przyciskiem CTA.',
    category: 'Blocks',
    props: [
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'action', type: '{ label, onClick }' },
      { name: 'icon', type: 'ComponentType' },
    ],
    examples: [
      {
        title: 'Przykłady',
        render: () => (
          <div className="grid grid-cols-2 gap-4 w-96">
            <div className="border rounded-xl">
              <EmptyState
                icon={FileText}
                title="Brak dokumentów"
                description="Wygeneruj swój pierwszy dokument używając promptu."
                action={{ label: 'Nowy dokument' }}
              />
            </div>
            <div className="border rounded-xl">
              <EmptyState
                icon={Zap}
                title="Brak promptów"
                description="Dodaj pierwszy szablon promptu do biblioteki."
                action={{ label: 'Dodaj prompt' }}
              />
            </div>
          </div>
        ),
      },
    ],
  },

  {
    slug: 'block-editor-toolbar',
    title: 'Editor Toolbar',
    description: 'Pasek narzędzi edytora z tytułem dokumentu, statusem i akcjami.',
    category: 'Blocks',
    props: [
      { name: 'title', type: 'string' },
      { name: 'status', type: 'string', options: ['draft', 'published', 'scheduled'] },
      { name: 'isSaving', type: 'boolean', default: 'false' },
    ],
    examples: [
      {
        title: 'Szkic',
        render: () => (
          <div className="w-full border rounded-xl overflow-hidden">
            <EditorToolbar
              title="Jak pisać treści SEO w 2025 roku"
              status="draft"
            />
          </div>
        ),
      },
      {
        title: 'Zapisywanie',
        render: () => (
          <div className="w-full border rounded-xl overflow-hidden">
            <EditorToolbar
              title="Newsletter tygodniowy – AI w marketingu"
              status="draft"
              isSaving
            />
          </div>
        ),
      },
    ],
  },

  {
    slug: 'block-chat-message',
    title: 'Chat Message',
    description: 'Wiadomość w czacie AI asystenta – wariant użytkownika i asystenta.',
    category: 'Blocks',
    props: [
      { name: 'role', type: 'string', options: ['user', 'assistant'] },
      { name: 'content', type: 'string' },
      { name: 'timestamp', type: 'string' },
      { name: 'userInitials', type: 'string', default: 'U' },
    ],
    examples: [
      {
        title: 'Konwersacja',
        render: () => (
          <div className="space-y-4 w-80">
            <ChatMessage
              role="user"
              content="Zmień ton tego tekstu na bardziej formalny i dodaj więcej konkretnych danych."
              timestamp="14:23"
              userInitials="AK"
            />
            <ChatMessage
              role="assistant"
              content="Oczywiście. Przeformułowałem wstęp i dodałem statystyki z raportu Nielsen. Sprawdź zmiany w edytorze."
              timestamp="14:23"
            />
            <ChatMessage
              role="user"
              content="Skróć to o 20%."
              timestamp="14:25"
              userInitials="AK"
            />
          </div>
        ),
      },
    ],
  },

  {
    slug: 'block-connection-card',
    title: 'Connection Card',
    description: 'Karta integracji zewnętrznej z statusem połączenia i akcjami.',
    category: 'Blocks',
    props: [
      { name: 'platform', type: 'string' },
      { name: 'url', type: 'string' },
      { name: 'status', type: 'string', options: ['connected', 'error', 'disconnected'] },
      { name: 'meta', type: 'string', description: 'Dodatkowa informacja (np. liczba postów)' },
    ],
    examples: [
      {
        title: 'Stany połączenia',
        render: () => (
          <div className="space-y-3 w-96">
            <ConnectionCard platform="WordPress" url="blog.example.com" status="connected" meta="47 opublikowanych postów" />
            <ConnectionCard platform="WordPress" url="sklep.example.pl" status="error" meta="Błąd autoryzacji – sprawdź klucz API" />
            <ConnectionCard platform="Mailchimp" url="example.mailchimp.com" status="disconnected" />
          </div>
        ),
      },
    ],
  },

  {
    slug: 'block-filter-bar',
    title: 'Filter Bar',
    description: 'Pasek wyszukiwania i filtrowania listy dokumentów lub promptów.',
    category: 'Blocks',
    props: [
      { name: 'placeholder', type: 'string' },
      { name: 'filters', type: 'Array<{ key, label, options }>' },
      { name: 'onSearch', type: 'function' },
    ],
    examples: [
      {
        title: 'Lista dokumentów',
        render: () => (
          <div className="w-full">
            <FilterBar
              placeholder="Szukaj dokumentów..."
              filters={[
                { key: 'status', label: 'Status', options: [
                  { value: 'draft', label: 'Szkice' },
                  { value: 'published', label: 'Opublikowane' },
                  { value: 'scheduled', label: 'Zaplanowane' },
                ]},
                { key: 'platform', label: 'Platforma', options: [
                  { value: 'wordpress', label: 'WordPress' },
                  { value: 'mailchimp', label: 'Mailchimp' },
                ]},
              ]}
            />
          </div>
        ),
      },
    ],
  },

]
