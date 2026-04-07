/**
 * SidePanel – system lewego panelu nawigacyjnego ContentPilot.
 *
 * Tokeny (nie zmieniać per-moduł):
 *   szerokość:        w-72
 *   item padding:     px-4 py-2.5
 *   tekst główny:     text-sm
 *   tekst pomocniczy: text-xs text-muted-foreground
 *   hover:            hover:bg-muted/50
 *   aktywny:          bg-muted
 *   border-b:         border-b na każdym item
 */

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { LucideIcon, Search, ChevronDown, ChevronRight, Star, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Kontener ──────────────────────────────────────────────────────────────────

export function SidePanel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('w-72 border-r flex flex-col shrink-0 bg-background', className)}>
      {children}
    </div>
  )
}

// ── Nagłówek z główną akcją ───────────────────────────────────────────────────

export function SidePanelHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('p-3 border-b flex items-center gap-2', className)}>
      {children}
    </div>
  )
}

// ── Przycisk głównej akcji (pełna szerokość) ──────────────────────────────────

export function SidePanelAction({
  icon: Icon, label, onClick,
}: {
  icon: LucideIcon
  label: string
  onClick?: () => void
}) {
  return (
    <Button className="flex-1 gap-2 justify-center h-10" onClick={onClick}>
      <Icon className="w-4 h-4" strokeWidth={2} />
      {label}
    </Button>
  )
}

// ── Przycisk pomocniczy obok głównej akcji (np. ikona folderu) ────────────────

export function SidePanelIconButton({
  icon: Icon, onClick, title,
}: {
  icon: LucideIcon
  onClick?: () => void
  title?: string
}) {
  return (
    <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={onClick} title={title}>
      <Icon className="w-4 h-4" />
    </Button>
  )
}

// ── Wyszukiwarka ──────────────────────────────────────────────────────────────

export function SidePanelSearch({
  placeholder = 'Szukaj...', value, onChange,
}: {
  placeholder?: string; value?: string; onChange?: (v: string) => void
}) {
  return (
    <div className="px-3 py-2 border-b">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          className="pl-9 h-8 text-sm bg-muted/30 border-0 focus-visible:ring-0"
        />
      </div>
    </div>
  )
}

// ── Pasek z przyciskami pomocniczymi (Sortuj / Zaznacz / tryby) ───────────────

export function SidePanelToolbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 py-2 border-b flex items-center gap-1.5">
      {children}
    </div>
  )
}

// ── Przycisk toolbar – wariant normalny ───────────────────────────────────────

export function SidePanelToolbarButton({
  icon: Icon, label, active = false, onClick,
}: {
  icon?: LucideIcon
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
        active
          ? 'bg-foreground text-background'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      )}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {label}
    </button>
  )
}

// ── Drobna notka (np. "Sortowanie aktywne · przeciąganie wyłączone") ──────────

export function SidePanelNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-3 py-1.5 text-[10px] text-muted-foreground/60 border-b leading-snug">
      {children}
    </p>
  )
}

// ── Nagłówek sekcji ───────────────────────────────────────────────────────────

export function SidePanelSection({ label }: { label: string }) {
  return (
    <p className="px-4 pt-4 pb-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
      {label}
    </p>
  )
}

// ── Element oznaczony gwiazdką (amber bg) ─────────────────────────────────────

export function SidePanelStarredItem({
  label, onClick,
}: {
  label: string; onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2.5 flex items-center gap-2.5 border-b bg-amber-50 hover:bg-amber-100 transition-colors"
    >
      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
      <span className="text-sm font-medium truncate">{label}</span>
    </button>
  )
}

// ── Folder ────────────────────────────────────────────────────────────────────

export function SidePanelFolder({
  label, count, expanded, onToggle, children,
}: {
  label: string
  count?: number
  expanded?: boolean
  onToggle?: () => void
  children?: React.ReactNode
}) {
  return (
    <div>
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2.5 border-b hover:bg-muted/50 transition-colors group"
      >
        {expanded
          ? <ChevronDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          : <ChevronRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />}
        <svg className="w-3.5 h-3.5 text-muted-foreground shrink-0" viewBox="0 0 16 16" fill="currentColor">
          <path d="M1.5 3A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 14.5 4h-5.586l-1.707-1.707A1 1 0 0 0 6.5 2H2A1.5 1.5 0 0 0 .5 3.5v.5H1.5Z" />
        </svg>
        <span className="text-sm flex-1 text-left">{label}</span>
        {count !== undefined && (
          <span className="text-xs text-muted-foreground/60 mr-1">{count}</span>
        )}
        <button
          onClick={e => e.stopPropagation()}
          className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-muted transition-all"
        >
          <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </button>
      {expanded && (
        <div className="ml-0">
          {children}
        </div>
      )}
    </div>
  )
}

// ── Drop zone wewnątrz pustego folderu ────────────────────────────────────────

export function SidePanelDropZone({ label = 'Przeciągnij elementy tutaj' }: { label?: string }) {
  return (
    <p className="pl-10 pr-3 py-2 text-xs text-muted-foreground/50 italic border-b">
      {label}
    </p>
  )
}

// ── Standardowy element listy ─────────────────────────────────────────────────

export function SidePanelItem({
  active, onClick, indent = false, className, children,
}: {
  active?: boolean
  onClick?: () => void
  indent?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left border-b flex items-start gap-2.5 hover:bg-muted/50 transition-colors',
        indent ? 'px-10 py-2.5' : 'px-4 py-2.5',
        active && 'bg-muted',
        className
      )}
    >
      {children}
    </button>
  )
}

// ── Tekst główny elementu ─────────────────────────────────────────────────────

export function SidePanelItemTitle({
  children, className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-sm leading-snug', className)}>{children}</p>
  )
}

// ── Tekst pomocniczy / meta elementu ─────────────────────────────────────────

export function SidePanelItemMeta({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{children}</p>
  )
}

// ── Badge w meta (np. kolorowy tag folderu) ───────────────────────────────────

export function SidePanelItemBadge({
  label, className,
}: { label: string; className?: string }) {
  return (
    <Badge variant="secondary" className={cn('text-[10px] h-4 px-1.5 font-medium', className)}>
      {label}
    </Badge>
  )
}

// ── Opis flow (np. RSS → Router → Scraper → ...) ─────────────────────────────

export function SidePanelItemFlow({ steps }: { steps: string[] }) {
  return (
    <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
      {steps.join(' → ')}
    </p>
  )
}

// ── ScrollArea opakowujące listę ──────────────────────────────────────────────

export function SidePanelList({ children }: { children: React.ReactNode }) {
  return <ScrollArea className="flex-1">{children}</ScrollArea>
}
