/**
 * NewContentModal – wybór szablonu i podstawowe dane nowej treści.
 * Trzy kroki: typ → tytuł + ustawienia → gotowe.
 */
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { X, FileText, Layers, BookOpen, ChevronRight, Check, ArrowLeft, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

type ContentType = 'article' | 'study' | 'book'
type Step = 'type' | 'details' | 'done'

const TYPES: {
  id: ContentType
  label: string
  icon: React.ComponentType<{className?: string}>
  color: string
  bg: string
  border: string
  desc: string
  features: string[]
}[] = [
  {
    id: 'article', label: 'Artykuł', icon: FileText,
    color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200',
    desc: 'Jeden dokument z blokami treści. Idealny do postów blogowych, newsów, opisów.',
    features: ['Bloki treści (tekst, obraz, HTML)', 'Bezpośredni eksport do WordPress', 'Generowanie grafiki AI', 'Biblioteka promptów SEO'],
  },
  {
    id: 'study', label: 'Opracowanie', icon: Layers,
    color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200',
    desc: 'Kilka sekcji bez hierarchii. Do raportów, white paperów, e-booków, przewodników.',
    features: ['Sekcje z nawigacją', 'Spis treści automatyczny', 'Eksport PDF + WordPress', 'Śledzenie postępu sekcji'],
  },
  {
    id: 'book', label: 'Książka', icon: BookOpen,
    color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200',
    desc: 'Pełna hierarchia: Części → Rozdziały → Podrozdziały. Do książek non-fiction i edukacyjnych.',
    features: ['Drzewo struktury (Część/Rozdział)', 'Historia konwersacji per rozdział', 'Zarządzanie postaciami i światem', 'Śledzenie celu słów'],
  },
]

const ARTICLE_TEMPLATES = [
  { id: 'blank',     label: 'Pusty dokument',        desc: 'Zacznij od zera' },
  { id: 'blog',      label: 'Post blogowy',           desc: 'Wstęp, sekcje, CTA, meta SEO' },
  { id: 'seo',       label: 'Artykuł SEO',            desc: 'H1/H2/H3, lista FAQ, meta' },
  { id: 'newsletter', label: 'Newsletter',            desc: 'Nagłówek, sekcje, stopka' },
]
const STUDY_TEMPLATES = [
  { id: 'blank',     label: 'Puste opracowanie',      desc: 'Zacznij od zera' },
  { id: 'report',    label: 'Raport / White paper',   desc: 'Streszczenie, sekcje, wnioski' },
  { id: 'ebook',     label: 'E-book',                 desc: 'Rozdziały bez hierarchii' },
  { id: 'guide',     label: 'Przewodnik krok po kroku', desc: 'Numerowane sekcje' },
]
const BOOK_TEMPLATES = [
  { id: 'blank',     label: 'Pusta książka',          desc: 'Zacznij od zera' },
  { id: 'nonfiction', label: 'Non-fiction',           desc: '3 części, 10 rozdziałów' },
  { id: 'edu',       label: 'Książka edukacyjna',     desc: 'Moduły, ćwiczenia, podsumowania' },
]

function getTemplates(type: ContentType) {
  if (type === 'article') return ARTICLE_TEMPLATES
  if (type === 'study') return STUDY_TEMPLATES
  return BOOK_TEMPLATES
}

interface NewContentModalProps {
  onClose: () => void
}

export default function NewContentModal({ onClose }: NewContentModalProps) {
  const [step, setStep] = React.useState<Step>('type')
  const [type, setType] = React.useState<ContentType | null>(null)
  const [template, setTemplate] = React.useState('blank')
  const [title, setTitle] = React.useState('')
  const [wordGoal, setWordGoal] = React.useState(type === 'book' ? '50000' : '2000')
  const [withAI, setWithAI] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (step === 'details') setTimeout(() => inputRef.current?.focus(), 50)
  }, [step])

  const selectedType = TYPES.find(t => t.id === type)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-background rounded-2xl shadow-2xl border w-full max-w-2xl mx-4 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            {step === 'details' && (
              <button onClick={() => { setStep('type'); setType(null) }}
                className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="text-base font-semibold">
                {step === 'type' ? 'Nowa treść' : step === 'details' ? `Nowy ${selectedType?.label.toLowerCase()}` : 'Gotowe!'}
              </h2>
              <p className="text-xs text-foreground/55 mt-0.5">
                {step === 'type' ? 'Wybierz typ dokumentu' : step === 'details' ? 'Uzupełnij podstawowe dane' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Steps */}
            <div className="flex items-center gap-1.5">
              {(['type', 'details'] as Step[]).map((s, i) => (
                <div key={s} className={cn(
                  'w-5 h-5 rounded-full text-[10px] font-semibold flex items-center justify-center',
                  step === s ? 'bg-foreground text-background' : (step === 'done' || (s === 'type' && step === 'details'))
                    ? 'bg-emerald-500 text-white' : 'bg-muted text-foreground/40'
                )}>
                  {(step === 'done' || (s === 'type' && step === 'details')) ? <Check className="w-2.5 h-2.5" /> : i + 1}
                </div>
              ))}
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step 1: Choose type */}
        {step === 'type' && (
          <div className="p-6 space-y-3">
            {TYPES.map(t => (
              <button key={t.id}
                onClick={() => setType(t.id)}
                className={cn(
                  'w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all',
                  type === t.id
                    ? `border-foreground bg-muted/30`
                    : 'border-border hover:border-foreground/30 hover:bg-muted/20'
                )}>
                <div className={cn('w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5', t.bg, t.border)}>
                  <t.icon className={cn('w-5 h-5', t.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">{t.label}</span>
                    {type === t.id && <Check className="w-4 h-4 text-emerald-500" />}
                  </div>
                  <p className="text-xs text-foreground/60 mb-2.5 leading-relaxed">{t.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {t.features.map(f => (
                      <span key={f} className="text-[10px] px-2 py-0.5 bg-muted rounded-full text-foreground/60">{f}</span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
            <div className="flex justify-end pt-2">
              <Button onClick={() => setStep('details')} disabled={!type} className="gap-2">
                Dalej <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 'details' && type && (
          <div className="p-6 space-y-5">
            {/* Tytuł */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Tytuł</label>
              <Input
                ref={inputRef}
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={
                  type === 'article' ? 'np. Jak AI zmienia marketing w 2025 roku' :
                  type === 'study' ? 'np. Raport: AI w polskim e-commerce' :
                  'np. Strategie Contentowe dla Ekspertów'
                }
                className="h-10 text-sm"
              />
            </div>

            {/* Szablon */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Szablon</label>
              <div className="grid grid-cols-2 gap-2">
                {getTemplates(type).map(tmpl => (
                  <button key={tmpl.id}
                    onClick={() => setTemplate(tmpl.id)}
                    className={cn(
                      'flex items-start gap-2 p-3 rounded-lg border text-left transition-all',
                      template === tmpl.id ? 'border-foreground bg-muted/30' : 'border-border hover:border-foreground/30'
                    )}>
                    <div className={cn(
                      'w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center',
                      template === tmpl.id ? 'border-foreground bg-foreground' : 'border-muted-foreground/30'
                    )}>
                      {template === tmpl.id && <div className="w-1.5 h-1.5 rounded-full bg-background" />}
                    </div>
                    <div>
                      <p className="text-xs font-medium leading-tight">{tmpl.label}</p>
                      <p className="text-[10px] text-foreground/55 mt-0.5">{tmpl.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Cel słów (opcjonalnie) */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium flex items-center gap-2">
                Cel słów
                <span className="text-xs text-foreground/50 font-normal">(opcjonalnie)</span>
              </label>
              <div className="flex items-center gap-2">
                <Input
                  value={wordGoal}
                  onChange={e => setWordGoal(e.target.value)}
                  type="number"
                  className="h-9 text-sm w-32"
                />
                <div className="flex gap-1.5">
                  {(type === 'article' ? ['500', '1000', '2000', '3000'] : type === 'study' ? ['5000', '10000', '20000'] : ['30000', '50000', '80000']).map(n => (
                    <button key={n} onClick={() => setWordGoal(n)}
                      className={cn('text-xs px-2.5 py-1 rounded-md border transition-colors',
                        wordGoal === n ? 'border-foreground bg-muted font-medium' : 'border-border text-foreground/60 hover:border-foreground/40')}>
                      {parseInt(n) >= 1000 ? `${parseInt(n)/1000}k` : n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* AI asystent */}
            <div className="flex items-center justify-between p-3 rounded-xl border bg-muted/20">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Zacznij z pomocą AI</p>
                  <p className="text-xs text-foreground/55">AI wygeneruje wstępny szkic na podstawie tytułu</p>
                </div>
              </div>
              <button onClick={() => setWithAI(o => !o)}
                className={cn('w-10 h-5 rounded-full border transition-colors relative shrink-0',
                  withAI ? 'bg-foreground border-foreground' : 'bg-muted border-border')}>
                <div className={cn('absolute top-0.5 w-4 h-4 rounded-full shadow-sm transition-transform',
                  withAI ? 'left-[22px] bg-background' : 'left-0.5 bg-background border border-border/50')} />
              </button>
            </div>

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={() => { setStep('type') }}>
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Wróć
              </Button>
              <Button onClick={onClose} disabled={!title.trim()} className="gap-2">
                Utwórz {selectedType?.label.toLowerCase()} <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
