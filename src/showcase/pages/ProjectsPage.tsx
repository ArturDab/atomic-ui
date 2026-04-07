import { Link } from 'react-router-dom'
import { Zap, ArrowRight, FileText, BookOpen, Layers } from 'lucide-react'

const PROJECTS = [
  {
    slug: 'contentpilot2',
    name: 'ContentPilot 2.0',
    description: 'Alternatywne podejście projektowe – nawigacja z etykietami, split pane w czacie, karty zespołów, pełnoekranowy edytor.',
    icon: Layers,
    color: 'bg-slate-50 border-slate-200',
    iconColor: 'bg-slate-700',
    screens: ['AI Chat', 'AI Teams', 'Dokumenty'],
    status: 'Koncepcja',
  },
  {
    slug: 'contentpilot',
    name: 'ContentPilot',
    description: 'Generator treści AI z edytorem i publikacją do WordPress.',
    icon: Zap,
    color: 'bg-violet-50 border-violet-200',
    iconColor: 'bg-violet-600',
    screens: ['Dashboard', 'Dokumenty', 'Edytor', 'Prompty', 'Ustawienia'],
    status: 'W toku',
  },
]

const PLACEHOLDER = [
  { name: 'Prompt Panel', description: 'Zarządzanie promptami dla zespołów.', icon: FileText, color: 'bg-blue-50 border-blue-200', iconColor: 'bg-blue-600' },
  { name: 'Lyreco Toolkit', description: 'Narzędzia marketingowe dla Lyreco.', icon: BookOpen, color: 'bg-orange-50 border-orange-200', iconColor: 'bg-orange-600' },
]

export default function ProjectsPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-10">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold mb-1.5 tracking-tight">Projekty</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Widoki UI dedykowane poszczególnym aplikacjom. Każdy projekt ma własny design system i zestaw ekranów.
        </p>
      </div>

      <div className="space-y-3">
        {PROJECTS.map(p => (
          <Link
            key={p.slug}
            to={`/projects/${p.slug}`}
            className={cn(
              "flex items-center gap-5 border rounded-xl p-5 hover:shadow-sm transition-all group",
              p.color
            )}
          >
            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", p.iconColor)}>
              <p.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-sm">{p.name}</span>
                <span className="text-xs text-muted-foreground border bg-white rounded-full px-2 py-0.5">{p.status}</span>
              </div>
              <p className="text-xs text-muted-foreground">{p.description}</p>
              <p className="text-xs text-muted-foreground/70 mt-1">{p.screens.join(' · ')}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>
        ))}

        {PLACEHOLDER.map(p => (
          <div
            key={p.name}
            className={cn("flex items-center gap-5 border rounded-xl p-5 opacity-40 cursor-not-allowed", p.color)}
          >
            <div className={cn("w-11 h-11 rounded-xl flex items-center justify-center shrink-0", p.iconColor)}>
              <p.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.description}</p>
            </div>
            <span className="text-xs text-muted-foreground border bg-white rounded-full px-2 py-0.5 shrink-0">Planowany</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
