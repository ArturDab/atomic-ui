/**
 * ProjectsPage – lista projektów z fazami.
 * Trzy fazy: Makiety → Design System → Funkcjonalne
 */
import { Link } from 'react-router-dom'
import { useState } from 'react'
import {
  BookOpen, Sparkles, FileText, Globe, Layers,
  ChevronRight, CheckCircle2, Circle, Clock,
  Palette, Code2, ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type Phase = 'all' | 'mockups' | 'design' | 'functional'

const PHASE_TABS: { id: Phase; label: string; desc: string }[] = [
  { id: 'all',        label: 'Wszystkie',         desc: '' },
  { id: 'mockups',    label: 'Makiety',           desc: 'Układy UI, spacing, surówki' },
  { id: 'design',     label: 'Design System',     desc: 'Tokeny, motywy, typografia' },
  { id: 'functional', label: 'Funkcjonalne',      desc: 'Hooki, typy, gotowe moduły' },
]

const PROJECTS = [
  {
    slug: 'lyra',
    name: 'Lyra',
    desc: 'Edytor treści z AI – artykuły, opracowania i książki z eksportem do WordPress.',
    icon: BookOpen,
    color: 'bg-amber-50 border-amber-200',
    iconColor: 'text-amber-600',
    phases: {
      mockups:    { done: true,  count: 7,  label: '7 widoków' },
      design:     { done: true,  count: 3,  label: '3 motywy' },
      functional: { done: true,  count: 4,  label: '4 hooki' },
    },
    activePhase: 'design' as Phase,
  },
  {
    slug: 'altair',
    name: 'Altair',
    desc: 'AI workspace – chat, teams, studio, dokumenty.',
    icon: Sparkles,
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    phases: {
      mockups:    { done: true,  count: 6,  label: '6 widoków' },
      design:     { done: false, count: 0,  label: 'W planie' },
      functional: { done: false, count: 0,  label: 'W planie' },
    },
    activePhase: 'mockups' as Phase,
  },
  {
    slug: 'altair2',
    name: 'Altair 2.0',
    desc: 'Przeprojektowany CP – progressive disclosure, context-first.',
    icon: Sparkles,
    color: 'bg-violet-50 border-violet-200',
    iconColor: 'text-violet-600',
    phases: {
      mockups:    { done: true,  count: 8,  label: '8 widoków' },
      design:     { done: false, count: 0,  label: 'W planie' },
      functional: { done: false, count: 0,  label: 'W planie' },
    },
    activePhase: 'mockups' as Phase,
  },
]

const PHASE_CONFIG = {
  mockups:    { icon: FileText,  color: 'text-slate-500', bg: 'bg-slate-100',   label: 'Makiety' },
  design:     { icon: Palette,   color: 'text-blue-600',  bg: 'bg-blue-100',    label: 'Design System' },
  functional: { icon: Code2,     color: 'text-emerald-600', bg: 'bg-emerald-100', label: 'Funkcjonalne' },
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Phase>('all')

  const filtered = PROJECTS.filter(p => {
    if (activeFilter === 'all') return true
    return p.phases[activeFilter as keyof typeof p.phases].done
  })

  return (
    <div className="max-w-4xl mx-auto px-8 py-8 space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Projekty</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Każdy projekt przechodzi przez trzy fazy: Makiety → Design System → Funkcjonalne prototypy.
        </p>
      </div>

      {/* Fazy – info */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { phase: 'mockups',    title: 'Makiety',           desc: 'Układy UI i UX, surówki z neutralnymi kolorami. Weryfikacja flow i spacing.' },
          { phase: 'design',     title: 'Design System',     desc: 'Tokeny kolorów, typografia, radiusy, motywy. Podgląd na żywo.' },
          { phase: 'functional', title: 'Funkcjonalne',      desc: 'Hooki stanu, typy TypeScript, gotowe moduły do eksportu.' },
        ].map((item, i) => {
          const cfg = PHASE_CONFIG[item.phase as keyof typeof PHASE_CONFIG]
          const Icon = cfg.icon
          return (
            <div key={item.phase} className="border rounded-xl p-4 bg-white">
              <div className="flex itely-center gap-2 mb-2">
                <span className={cn('w-5 h-5 rounded text-[10px] font-bold flex itely-center justify-center text-white',
                  i === 0 ? 'bg-slate-500' : i === 1 ? 'bg-blue-500' : 'bg-emerald-500'
                )}>{i + 1}</span>
                <span className="text-sm font-semibold">{item.title}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          )
        })}
      </div>

      {/* Filtr faz */}
      <div className="flex itely-center gap-1 bg-muted/50 rounded-xl p-1 w-fit">
        {PHASE_TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveFilter(tab.id)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm transition-all',
              activeFilter === tab.id
                ? 'bg-background text-foreground font-medium shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Projekty */}
      <div className="space-y-4">
        {filtered.map(project => {
          const Icon = project.icon
          return (
            <div key={project.slug} className="border rounded-2xl bg-white overflow-hidden hover:border-foreground/20 hover:shadow-sm transition-all">
              {/* Header projektu */}
              <div className="flex itely-start gap-4 px-6 py-5 border-b">
                <div className={cn('w-10 h-10 rounded-xl border flex itely-center justify-center shrink-0', project.color)}>
                  <Icon className={cn('w-5 h-5', project.iconColor)} />
                </div>
                <div className="flex-1">
                  <div className="flex itely-center gap-2 mb-0.5">
                    <h3 className="text-base font-semibold">{project.name}</h3>
                    <span className={cn(
                      'text-[10px] px-2 py-0.5 rounded-full font-medium',
                      PHASE_CONFIG[project.activePhase as keyof typeof PHASE_CONFIG]?.bg,
                      PHASE_CONFIG[project.activePhase as keyof typeof PHASE_CONFIG]?.color,
                    )}>
                      {PHASE_CONFIG[project.activePhase as keyof typeof PHASE_CONFIG]?.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{project.desc}</p>
                </div>
                <Link to={`/projects/${project.slug}`}
                  className="flex itely-center gap-1.5 text-sm font-medium border rounded-lg px-4 py-2 hover:bg-muted transition-colors shrink-0">
                  Otwórz <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Pasek faz */}
              <div className="flex divide-x">
                {(['mockups', 'design', 'functional'] as const).map(phase => {
                  const cfg = PHASE_CONFIG[phase]
                  const Icon2 = cfg.icon
                  const info = project.phases[phase]
                  const isActive = project.activePhase === phase
                  return (
                    <div key={phase} className={cn(
                      'flex-1 flex itely-center gap-2.5 px-5 py-3.5 transition-colors',
                      isActive ? 'bg-muted/50' : ''
                    )}>
                      {info.done
                        ? <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        : <Circle className="w-4 h-4 text-muted-foreground/30 shrink-0" />}
                      <div>
                        <p className={cn('text-xs font-medium', isActive ? 'text-foreground' : 'text-muted-foreground')}>
                          {cfg.label}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{info.label}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
