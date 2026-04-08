/**
 * Home – nowy dashboard Atomic UI (Rigel).
 * Hierarchia: Projekty > Moduły > Bloki > Komponenty
 */
import { Link } from 'react-router-dom'
import { registry } from '../../registry'
import { blockRegistry as blocks } from '../../registry/blocks'
import {
  FolderKanban, Box, Blocks, Layers, ArrowRight,
  FileText, BookOpen, Sparkles, Globe, CheckCircle2,
  Clock, ChevronRight, Star,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Dane projektów ─────────────────────────────────────────────────────────

const PROJECTS = [
  {
    slug: 'manuscript',
    name: 'Manuscript',
    desc: 'Edytor treści z AI – artykuły, opracowania i książki.',
    phases: {
      mockups: 7,
      design: true,
      functional: 4,
    },
    activePhaseName: 'Design System',
    activePhase: 'design',
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    icon: BookOpen,
  },
  {
    slug: 'contentpilot',
    name: 'ContentPilot',
    desc: 'AI workspace – chat, teams, studio, dokumenty.',
    phases: { mockups: 6, design: false, functional: 0 },
    activePhaseName: 'Makiety',
    activePhase: 'mockups',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    icon: Sparkles,
  },
  {
    slug: 'contentpilot2',
    name: 'ContentPilot 2.0',
    desc: 'Przeprojektowany CP z progressive disclosure.',
    phases: { mockups: 8, design: false, functional: 0 },
    activePhaseName: 'Makiety',
    activePhase: 'mockups',
    color: 'bg-violet-50 border-violet-200',
    iconColor: 'text-violet-600',
    icon: Sparkles,
  },
]

const MODULES = [
  { name: 'Manuscript', hooks: 4, types: 12, screens: 7, status: 'ready' },
]

const PHASE_COLORS: Record<string, string> = {
  mockups:    'bg-slate-100 text-slate-600',
  design:     'bg-blue-100 text-blue-700',
  functional: 'bg-emerald-100 text-emerald-700',
}

const PHASE_LABELS: Record<string, string> = {
  mockups:    'Makiety',
  design:     'Design System',
  functional: 'Funkcjonalne',
}

// ── Komponent ──────────────────────────────────────────────────────────────

export default function Home() {
  const atomCount = registry.filter(c => c.category !== 'Blocks').length
  const blockCount = blocks.length

  return (
    <div className="max-w-5xl mx-auto px-8 py-8 space-y-10">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-foreground flex items-center justify-center">
              <Layers className="w-3.5 h-3.5 text-background" />
            </div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Rigel</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Komponent Library</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Prototypy, moduły i design systemy gotowe do wdrożenia.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {atomCount} atomów</span>
          <span className="flex items-center gap-1"><Blocks className="w-3.5 h-3.5" /> {blockCount} bloków</span>
          <span className="flex items-center gap-1"><Box className="w-3.5 h-3.5" /> {MODULES.length} moduł</span>
        </div>
      </div>

      {/* 1. Projekty – najważniejsze */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FolderKanban className="w-5 h-5" />
            <h2 className="text-base font-semibold">Projekty</h2>
          </div>
          <Link to="/projects" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            Wszystkie <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {PROJECTS.map(p => {
            const Icon = p.icon
            return (
              <Link key={p.slug} to={`/projects/${p.slug}`}
                className="group border rounded-xl p-4 bg-white hover:border-foreground/25 hover:shadow-sm transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className={cn('w-9 h-9 rounded-lg border flex items-center justify-center', p.color)}>
                    <Icon className={cn('w-4 h-4', p.iconColor)} />
                  </div>
                  <span className={cn('text-[10px] px-2 py-0.5 rounded-full font-medium', PHASE_COLORS[p.activePhase])}>
                    {PHASE_LABELS[p.activePhase]}
                  </span>
                </div>
                <p className="text-sm font-semibold mb-1">{p.name}</p>
                <p className="text-xs text-muted-foreground leading-snug mb-3">{p.desc}</p>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3" /> {p.phases.mockups} makiet
                  </span>
                  {p.phases.functional > 0 && (
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {p.phases.functional} modułów
                    </span>
                  )}
                  {p.phases.design && (
                    <span className="flex items-center gap-1 text-blue-600">
                      <Star className="w-3 h-3" /> DS
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* 2. Moduły */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5" />
            <h2 className="text-base font-semibold">Moduły</h2>
            <span className="text-xs text-muted-foreground">gotowe do wdrożenia w dowolnej aplikacji</span>
          </div>
          <Link to="/modules" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            Dokumentacja <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="space-y-2">
          {MODULES.map(m => (
            <Link key={m.name} to="/modules"
              className="flex items-center gap-4 p-4 border rounded-xl bg-white hover:border-foreground/25 hover:shadow-sm transition-all group">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{m.name}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">Gotowy</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {m.hooks} hooki · {m.types} typów TypeScript · {m.screens} widoków
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
          <div className="flex items-center gap-4 p-4 border border-dashed rounded-xl text-muted-foreground">
            <div className="w-9 h-9 rounded-lg bg-muted border border-dashed flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-medium">AI Chat, AI Studio, Documents</p>
              <p className="text-xs mt-0.5">Planowane – po domknięciu ContentPilot 2.0</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bloki */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Blocks className="w-5 h-5" />
            <h2 className="text-base font-semibold">Bloki</h2>
            <span className="text-xs text-muted-foreground">kompozycje wielokrotnego użytku</span>
          </div>
          <Link to="/blocks" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            Wszystkie <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {blocks.slice(0, 4).map((b: {slug:string;title:string;description:string}) => (
            <Link key={b.slug} to={`/blocks`}
              className="p-3 border rounded-xl bg-white hover:border-foreground/25 transition-all">
              <p className="text-sm font-medium">{b.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{b.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Komponenty (atomy) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            <h2 className="text-base font-semibold">Komponenty</h2>
            <span className="text-xs text-muted-foreground">atomy bazowe (Shadcn)</span>
          </div>
          <Link to="/all" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
            Wszystkie {atomCount} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {registry.filter(c => c.category !== 'Blocks').slice(0, 12).map(c => (
            <Link key={c.slug} to={`/components/${c.slug}`}
              className="text-xs px-3 py-1.5 border rounded-lg bg-white hover:border-foreground/25 transition-colors">
              {c.title}
            </Link>
          ))}
          <Link to="/all" className="text-xs px-3 py-1.5 border border-dashed rounded-lg text-muted-foreground hover:border-foreground/30 transition-colors">
            +{atomCount - 12} więcej
          </Link>
        </div>
      </section>

    </div>
  )
}
