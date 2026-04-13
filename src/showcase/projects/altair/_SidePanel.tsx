/**
 * _SidePanel – wspólny zestaw komponentów lewego panelu Altair.
 * Każdy moduł korzysta z tych samych prymitywów, różniąc się tylko zawartością.
 *
 * Tokeny układu (nie zmieniać per-moduł):
 *   szerokość:          w-72 (288px)
 *   padding elementów:  px-4 py-3
 *   tekst główny:       text-sm
 *   tekst pomocniczy:   text-xs text-muted-foreground
 *   hover:              hover:bg-muted/50
 *   aktywny:            bg-muted
 *   separator:          border-b
 */

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search } from 'lucide-react'
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

interface SidePanelHeaderProps {
  children: React.ReactNode  // zwykle Button + opcjonalne ikony
  className?: string
}

export function SidePanelHeader({ children, className }: SidePanelHeaderProps) {
  return (
    <div className={cn('p-4 border-b flex items-center gap-2', className)}>
      {children}
    </div>
  )
}

// ── Przycisk głównej akcji (pełna szerokość) ──────────────────────────────────

interface SidePanelActionProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick?: () => void
}

export function SidePanelAction({ icon: Icon, label, onClick }: SidePanelActionProps) {
  return (
    <Button className="flex-1 gap-2 justify-center h-10" onClick={onClick}>
      <Icon className="w-4 h-4" />
      {label}
    </Button>
  )
}

// ── Wyszukiwarka ──────────────────────────────────────────────────────────────

interface SidePanelSearchProps {
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
}

export function SidePanelSearch({ placeholder = 'Szukaj', value, onChange }: SidePanelSearchProps) {
  return (
    <div className="px-4 py-2.5 border-b">
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

// ── Pasek narzędzi (Zaznacz, tryby sortowania itp.) ───────────────────────────

export function SidePanelToolbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-2 border-b flex items-center gap-2">
      {children}
    </div>
  )
}

// ── Drobna notka (np. "Sortowanie aktywne...") ────────────────────────────────

export function SidePanelNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 py-1.5 text-[10px] text-muted-foreground/60 border-b">
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

// ── Element listy ─────────────────────────────────────────────────────────────

interface SidePanelItemProps {
  active?: boolean
  onClick?: () => void
  className?: string
  children: React.ReactNode
}

export function SidePanelItem({ active, onClick, className, children }: SidePanelItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full text-left px-4 py-3 border-b flex items-start gap-3 hover:bg-muted/50 transition-colors',
        active && 'bg-muted',
        className
      )}
    >
      {children}
    </button>
  )
}

// ── Tekst główny elementu ─────────────────────────────────────────────────────

export function SidePanelItemTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('text-sm leading-snug', className)}>
      {children}
    </p>
  )
}

// ── Tekst pomocniczy elementu ─────────────────────────────────────────────────

export function SidePanelItemMeta({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-muted-foreground mt-0.5">
      {children}
    </p>
  )
}

// ── ScrollArea opakowujące listę ──────────────────────────────────────────────

export function SidePanelList({ children }: { children: React.ReactNode }) {
  return <ScrollArea className="flex-1">{children}</ScrollArea>
}
