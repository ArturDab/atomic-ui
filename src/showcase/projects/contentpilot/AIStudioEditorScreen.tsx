import * as React from 'react'
import { useParams } from 'react-router-dom'
import { CPSidebar } from './_Sidebar'
import { TopBar } from './_TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft, FileText, Play, ChevronDown, ChevronUp,
  Undo2, Redo2, Bold, Italic, Underline, Strikethrough,
  Code, Highlighter, List, ListOrdered, AlignLeft, AlignCenter,
  AlignRight, AlignJustify, Quote, Minus, Link2, Settings2,
  BookMarked, Copy, RotateCcw, Clock, Coins,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const HISTORY = [
  { title: 'Jak skutecznie pracować na home office?', model: 'gpt-4o', date: '19.03.2026' },
  { title: 'Jak skutecznie pracować na home office?', model: 'gpt-4o', date: '19.03.2026' },
  { title: 'Jak mocniej kopać piłkę?', model: 'gpt-4o', date: '18.03.2026' },
  { title: 'Jak uderzać piłkę nożną, by leciała szybciej?', model: 'gpt-4o', date: '18.03.2026' },
  { title: 'Jak stworzyć skuteczny zespół agentów AI?', model: 'gpt-4o', date: '18.03.2026' },
  { title: '5 porad na produktywność zdalnego zespołu', model: 'gpt-4o', date: '18.03.2026' },
]

const TOOLBAR_GROUPS = [
  [
    { icon: Undo2,         label: 'Cofnij' },
    { icon: Redo2,         label: 'Ponów' },
  ],
  [
    { label: 'H1', isText: true },
    { label: 'H2', isText: true },
    { label: 'H3', isText: true },
  ],
  [
    { icon: Bold,          label: 'Pogrubienie', active: true },
    { icon: Italic,        label: 'Kursywa' },
    { icon: Underline,     label: 'Podkreślenie' },
    { icon: Strikethrough, label: 'Przekreślenie' },
    { icon: Code,          label: 'Kod' },
    { icon: Highlighter,   label: 'Zaznaczenie' },
  ],
  [
    { icon: List,          label: 'Lista nieuporządkowana' },
    { icon: ListOrdered,   label: 'Lista numerowana' },
  ],
  [
    { icon: AlignLeft,     label: 'Do lewej' },
    { icon: AlignCenter,   label: 'Wyśrodkuj' },
    { icon: AlignRight,    label: 'Do prawej' },
    { icon: AlignJustify,  label: 'Wyjustuj' },
  ],
  [
    { icon: Quote,         label: 'Cytat' },
    { icon: Minus,         label: 'Linia pozioma' },
    { icon: Link2,         label: 'Link' },
    { icon: Settings2,     label: 'Więcej' },
  ],
]

const CONTENT = [
  { type: 'h1', text: 'Jak Stworzyć Skuteczny Zespół Agentów AI?' },
  { type: 'p',  text: 'Tworzenie skutecznego zespołu agentów AI to wyzwanie, które wymaga starannego planowania i kluczowej strategii. Agenci AI mogą przekształcić sposób funkcjonowania firm, zwiększając efektywność i wspierając innowacje. W tym artykule przyjrzymy się, jak zbudować zespół, który maksymalizuje te korzyści.' },
  { type: 'h2', text: '1. Zrozum Cel i Zakres Działań' },
  { type: 'p',  text: 'Przed rozpoczęciem budowania zespołu agentów AI, kluczowe jest dokładne zrozumienie ich roli i celów:' },
  { type: 'li', text: '**Określenie celów biznesowych:** Upewnij się, że cele agentów AI są zgodne z ogólnymi strategiami firmy.' },
  { type: 'li', text: '**Identyfikacja specyficznych zadań:** Jasno określ, jakie zadania agenci będą realizować, czy to automatyzacja procesów, obsługa klienta, czy analiza danych.' },
  { type: 'h2', text: '2. Wybór Odpowiednich Narzędzi i Technologii' },
  { type: 'p',  text: 'Agenci AI wymagają odpowiedniego zaplecza technologicznego, aby działać skutecznie:' },
  { type: 'li', text: '**Platformy AI:** Rozważ użycie platform takich jak TensorFlow, PyTorch, lub OpenAI, które oferują solidne podstawy do budowy agentów.' },
  { type: 'li', text: '**Integracja z istniejącymi systemami:** Upewnij się, że wybrane rozwiązania mogą łatwo integrować się z obecnymi systemami IT w firmie.' },
  { type: 'h2', text: '3. Zatrudnienie i Rozwój Zespołu' },
  { type: 'p',  text: 'Tworzenie zespołu agentów AI niekoniecznie wymaga dużej liczby specjalistów, ale raczej osób o odpowiednich umiejętnościach i wiedzy:' },
  { type: 'li', text: '**Zatrudnienie specjalistów:** Szukaj specjalistów ds. sztucznej inteligencji, analityków danych oraz inżynierów oprogramowania.' },
  { type: 'li', text: '**Szklenie i rozwój:** Regularnie inwestuj w szkolenia, które rozwijają umiejętności zespołu w zakresie najnowszych technologii AI.' },
  { type: 'h2', text: '4. Monitorowanie i Udoskonalanie Działania Agentów' },
  { type: 'p',  text: 'Regularne monitorowanie pracy agentów i ich wpływu na firmę jest kluczowe:' },
  { type: 'li', text: '**Analizowanie wyników:** Używaj metryk KPI, aby mierzyć skuteczność agentów AI.' },
  { type: 'li', text: '**Adaptacja do zmian:** Przygotuj się na adaptowanie się do zmieniających się potrzeb biznesowych i aktualizacji technologicznych.' },
  { type: 'h2', text: '5. Zabezpieczenie i Etyka' },
]

function renderContent(item: typeof CONTENT[0], i: number) {
  const formatBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/)
    return parts.map((p, j) =>
      p.startsWith('**') && p.endsWith('**')
        ? <strong key={j}>{p.slice(2, -2)}</strong>
        : p
    )
  }

  switch (item.type) {
    case 'h1': return <h1 key={i} className="text-2xl font-bold mb-4 mt-2">{item.text}</h1>
    case 'h2': return <h2 key={i} className="text-lg font-bold mb-3 mt-6">{item.text}</h2>
    case 'p':  return <p key={i} className="text-base leading-relaxed mb-3 text-foreground">{formatBold(item.text)}</p>
    case 'li': return (
      <div key={i} className="flex gap-2 mb-2">
        <span className="text-muted-foreground mt-1.5 shrink-0">•</span>
        <p className="text-base leading-relaxed">{formatBold(item.text)}</p>
      </div>
    )
    default: return null
  }
}

export default function AIStudioEditorScreen() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  const [historyOpen, setHistoryOpen] = React.useState(true)

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="ai-studio" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar crumbs={[{ label: 'Strona główna' }, { label: 'AI Studio' }]} />

        <div className="flex flex-1 overflow-hidden">

          {/* Left panel – params */}
          <div className="w-80 border-r flex flex-col shrink-0">
            {/* Header */}
            <div className="h-14 border-b flex items-center gap-3 px-4 shrink-0">
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <span className="font-semibold text-sm">Artykuł blogowy</span>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">

                <div className="space-y-1.5">
                  <Label className="text-sm">
                    Temat <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    defaultValue="Jak stworzyć skuteczny zespół agentów AI?"
                    className="text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Ton</Label>
                  <Select defaultValue="professional">
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Profesjonalny</SelectItem>
                      <SelectItem value="casual">Swobodny</SelectItem>
                      <SelectItem value="authoritative">Autorytatywny</SelectItem>
                      <SelectItem value="friendly">Przyjazny</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Długość</Label>
                  <Select defaultValue="short">
                    <SelectTrigger className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Krótki (400–600 słów)</SelectItem>
                      <SelectItem value="medium">Średni (800–1200 słów)</SelectItem>
                      <SelectItem value="long">Długi (1500–2500 słów)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Język</Label>
                  <Select>
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Wybierz język..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pl">Polski</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Dodatkowe instrukcje</Label>
                  <Textarea
                    placeholder="Dodatkowe wymagania lub kontekst..."
                    className="text-sm resize-none min-h-20"
                  />
                </div>

                <Separator />

                {/* History */}
                <div>
                  <button
                    className="w-full flex items-center justify-between py-1 hover:text-foreground transition-colors"
                    onClick={() => setHistoryOpen(o => !o)}
                  >
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      Historia
                      <Badge variant="secondary" className="text-xs h-5">{HISTORY.length}</Badge>
                    </span>
                    {historyOpen
                      ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
                      : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />}
                  </button>
                  {historyOpen && (
                    <div className="mt-2 space-y-0.5">
                      {HISTORY.map((h, i) => (
                        <button key={i} className="w-full text-left px-2 py-2 rounded-md hover:bg-muted/50 transition-colors">
                          <p className="text-xs font-medium line-clamp-1">{h.title}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">{h.model} · {h.date}</p>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </ScrollArea>

            {/* Generate button */}
            <div className="p-4 border-t">
              <Button className="w-full gap-2">
                <Play className="w-4 h-4" />
                Generuj
              </Button>
            </div>
          </div>

          {/* Right – editor */}
          <div className="flex-1 flex flex-col overflow-hidden">

            {/* Toolbar */}
            <div className="h-12 border-b flex items-center px-4 gap-1 shrink-0 overflow-x-auto">
              {TOOLBAR_GROUPS.map((group, gi) => (
                <React.Fragment key={gi}>
                  {gi > 0 && <div className="w-px h-5 bg-border mx-1 shrink-0" />}
                  {group.map((btn, bi) => (
                    'isText' in btn ? (
                      <button
                        key={bi}
                        className="h-8 px-2 rounded text-xs font-bold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0"
                      >
                        {btn.label}
                      </button>
                    ) : (
                      <button
                        key={bi}
                        title={btn.label}
                        className={cn(
                          'h-8 w-8 rounded flex items-center justify-center transition-colors shrink-0',
                          (btn as { active?: boolean }).active
                            ? 'bg-foreground text-background'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        {'icon' in btn && btn.icon && <btn.icon className="w-4 h-4" />}
                      </button>
                    )
                  ))}
                </React.Fragment>
              ))}

              <div className="ml-auto flex items-center gap-2 shrink-0 pl-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5" /> 978
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> 18.6s
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Separator orientation="vertical" className="h-5" />
                <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm">
                  <BookMarked className="w-4 h-4" /> W dokumentach
                </Button>
                <Button variant="outline" size="sm" className="h-8 gap-1.5 text-sm">
                  <Copy className="w-4 h-4" /> Kopiuj
                </Button>
              </div>
            </div>

            {/* Content */}
            <ScrollArea className="flex-1">
              <div className="max-w-2xl mx-auto px-8 py-8">
                {CONTENT.map((item, i) => renderContent(item, i))}
              </div>
            </ScrollArea>

          </div>
        </div>
      </div>
    </div>
  )
}
