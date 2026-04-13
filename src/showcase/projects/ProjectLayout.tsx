import { NavLink, Navigate, Outlet, useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { useRef, useEffect, useCallback } from 'react'
import { LyraThemeProvider, ThemeSwitcher } from './lyra/ThemeContext'
import { ZephyrThemeProvider, ZephyrThemeSwitcher } from './zephyr/ThemeContext'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScreenItem {
  path: string
  label: string
}

interface ScreenGroup {
  label: string
  defaultPath: string
  children: ScreenItem[]
}

type NavEntry = ScreenItem | ScreenGroup

function isGroup(e: NavEntry): e is ScreenGroup {
  return 'children' in e
}

const PROJECT_META: Record<string, { name: string; nav: NavEntry[] }> = {
  zephyr: {
    name: 'Zephyr',
    nav: [
      { path: 'zp-all', label: 'Wszystkie' },
      { path: 'zp-clients', label: 'Klienci' },
      { path: 'zp-design-system', label: 'Design System' },
      { path: 'zp-docs',          label: 'Docs' },
      {
        label: 'Konfiguracja',
        defaultPath: 'zp-client-config',
        children: [
          { path: 'zp-client-config',   label: 'Ustawienia klienta' },
          { path: 'zp-section-library', label: 'Biblioteka sekcji' },
        ],
      },
      {
        label: 'Kreator',
        defaultPath: 'zp-creator',
        children: [
          { path: 'zp-creator',  label: 'Nowy newsletter' },
          { path: 'zp-artifact', label: 'Artefakt' },
          { path: 'zp-history',  label: 'Historia' },
        ],
      },
    ],
  },
  lyra: {
    name: 'Lyra',
    nav: [
      { path: 'ly-all',          label: 'Wszystkie' },
      {
        label: 'Widoki',
        defaultPath: 'ly-dashboard',
        children: [
          { path: 'ly-dashboard',     label: 'Dashboard' },
          { path: 'ly-article',       label: 'Edytor artykułu' },
          { path: 'ly-study-editor',  label: 'Edytor opracowania' },
          { path: 'ly-book-overview', label: 'Przegląd książki' },
          { path: 'ly-book-editor',   label: 'Edytor książki' },
          { path: 'ly-new-content',   label: 'Nowa treść' },
          { path: 'ly-wp-export',     label: 'Eksport WP' },
        ],
      },
      { path: 'ly-design-system', label: 'Design System' },
      { path: 'ly-docs',          label: 'Docs' },
    ],
  },
  altair2: {
    name: 'Altair 2.0',
    nav: [
      { path: 'al2-all', label: 'Wszystkie widoki' },
      {
        label: 'AI Chat',
        defaultPath: 'al2-ai-chat',
        children: [
          { path: 'al2-ai-chat',          label: 'Czat' },
          { path: 'al2-ai-chat-artifact', label: 'Czat + artefakt' },
        ],
      },
      { path: 'al2-ai-teams',  label: 'AI Teams' },
      { path: 'al2-documents', label: 'Dokumenty' },
      {
        label: 'AI Studio',
        defaultPath: 'al2-ai-studio',
        children: [
          { path: 'al2-ai-studio',        label: 'Galeria' },
          { path: 'al2-ai-studio-empty',  label: 'Edytor – pusty' },
          { path: 'al2-ai-studio-filled', label: 'Edytor – treść' },
        ],
      },
    ],
  },
  altair: {
    name: 'Altair',
    nav: [
      { path: 'all',      label: 'Wszystkie widoki' },
      { path: 'ai-chat',  label: 'AI Chat' },
      { path: 'ai-teams',   label: 'AI Teams' },
      { path: 'documents',  label: 'Dokumenty' },
      {
        label: 'AI Studio',
        defaultPath: 'ai-studio',
        children: [
          { path: 'ai-studio',              label: 'Galeria' },
          { path: 'ai-studio-editor-empty', label: 'Edytor – pusty' },
          { path: 'ai-studio/article',      label: 'Edytor – z treścią' },
        ],
      },
    ],
  },
}

export function ProjectIndex() {
  const { projectSlug = '' } = useParams<{ projectSlug: string }>()
  const meta = PROJECT_META[projectSlug]
  if (!meta) return null
  const first = meta.nav[0]
  const firstPath = isGroup(first) ? first.defaultPath : (first as ScreenItem).path
  return <Navigate to={firstPath} replace />
}

export default function ProjectLayout() {
  const { projectSlug } = useParams<{ projectSlug: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const meta = PROJECT_META[projectSlug ?? '']
  if (!meta) return null

  const currentPath = location.pathname.split(`/projects/${projectSlug}/`)[1] ?? ''

  const containerRef = useRef<HTMLDivElement>(null)
  const isLyra = projectSlug === 'lyra'
  const isZephyr = projectSlug === 'zephyr'

  // Collect all flat paths for arrow navigation
  const allPaths = meta.nav.flatMap(entry =>
    isGroup(entry) ? entry.children.map(c => c.path) : [(entry as ScreenItem).path]
  )
  const currentPathIdx = allPaths.findIndex(p => currentPath === p || currentPath.startsWith(p + '/'))

  const navigatePrev = useCallback(() => {
    if (currentPathIdx > 0) navigate(`/projects/${projectSlug}/${allPaths[currentPathIdx - 1]}`)
  }, [currentPathIdx, allPaths, navigate, projectSlug])

  const navigateNext = useCallback(() => {
    if (currentPathIdx < allPaths.length - 1) navigate(`/projects/${projectSlug}/${allPaths[currentPathIdx + 1]}`)
  }, [currentPathIdx, allPaths, navigate, projectSlug])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'ArrowLeft')  navigatePrev()
      if (e.key === 'ArrowRight') navigateNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [navigatePrev, navigateNext])

  // Find active group (if any)
  const activeGroup = meta.nav
    .filter(isGroup)
    .find(g => g.children.some(c => currentPath === c.path || currentPath.startsWith(c.path + '/')))

  const content = (
    <div ref={containerRef} className="flex flex-col h-screen">
      {/* Primary nav bar */}
      <div className="h-11 bg-foreground flex items-center px-4 gap-2 shrink-0 overflow-hidden">
        <Link
          to="/projects"
          className="flex items-center gap-1 text-xs text-background/60 hover:text-background transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Projekty
        </Link>
        <div className="w-px h-4 bg-background/20" />
        <span className="text-xs font-semibold text-background">{meta.name}</span>
        <div className="w-px h-4 bg-background/20" />
        <nav className="flex gap-0.5 overflow-x-auto scrollbar-none flex-1 min-w-0">
          {meta.nav.map((entry, i) => {
            if (isGroup(entry)) {
              const isGroupActive = !!activeGroup && activeGroup.label === entry.label
              return (
                <button
                  key={i}
                  onClick={() => navigate(`/projects/${projectSlug}/${entry.defaultPath}`)}
                  className={cn(
                    'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                    isGroupActive
                      ? 'bg-background text-foreground'
                      : 'text-background/60 hover:text-background hover:bg-background/10'
                  )}
                >
                  {entry.label}
                </button>
              )
            }
            return (
              <NavLink
                key={entry.path}
                to={`/projects/${projectSlug}/${entry.path}`}
                className={({ isActive }) => cn(
                  'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-background text-foreground'
                    : 'text-background/60 hover:text-background hover:bg-background/10'
                )}
              >
                {entry.label}
              </NavLink>
            )
          })}
        </nav>
        {isLyra && (
          <>
            <div className="w-px h-4 bg-background/20 shrink-0" />
            <ThemeSwitcher />
          </>
        )}
        {isZephyr && (
          <>
            <div className="w-px h-4 bg-background/20 shrink-0" />
            <ZephyrThemeSwitcher />
          </>
        )}
      </div>

      {/* Secondary nav – always shown for lyra groups */}
      {(activeGroup || isLyra) && meta.nav.some(isGroup) && (
        <div className="h-9 bg-neutral-800 flex items-center px-4 gap-1 shrink-0">
          {(activeGroup || meta.nav.filter(isGroup)[0])?.children.map(child => {
            const isActive = currentPath === child.path || currentPath.startsWith(child.path + '/')
            return (
              <NavLink
                key={child.path}
                to={`/projects/${projectSlug}/${child.path}`}
                className={cn(
                  'px-3 py-1 rounded-md text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-white/15 text-white font-medium'
                    : 'text-white/50 hover:text-white hover:bg-white/10'
                )}
              >
                {child.label}
              </NavLink>
            )
          })}
        </div>
      )}

      <div className="flex-1 overflow-hidden relative">
        {/* Left/Right arrow navigation */}
        {currentPathIdx > 0 && (
          <button onClick={navigatePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-16 flex items-center justify-center bg-background/80 hover:bg-background border border-l-0 rounded-r-lg shadow-sm transition-colors group"
            title="Poprzedni widok (←)">
            <svg className="w-4 h-4 text-muted-foreground group-hover:text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
        )}
        {currentPathIdx < allPaths.length - 1 && (
          <button onClick={navigateNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-16 flex items-center justify-center bg-background/80 hover:bg-background border border-r-0 rounded-l-lg shadow-sm transition-colors group"
            title="Następny widok (→)">
            <svg className="w-4 h-4 text-muted-foreground group-hover:text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
        <Outlet />
      </div>
    </div>
  )

  if (isLyra) {
    return (
      <LyraThemeProvider containerRef={containerRef}>
        {content}
      </LyraThemeProvider>
    )
  }

  if (isZephyr) {
    return (
      <ZephyrThemeProvider containerRef={containerRef}>
        {content}
      </ZephyrThemeProvider>
    )
  }

  return content
}
