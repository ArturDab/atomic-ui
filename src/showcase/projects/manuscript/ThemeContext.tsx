import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { THEMES, type ThemeId } from './themes'

interface ThemeContextValue {
  themeId: ThemeId
  setThemeId: (id: ThemeId) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  themeId: 'ink',
  setThemeId: () => {},
})

export function useManuscriptTheme() {
  return useContext(ThemeContext)
}

export function ManuscriptThemeProvider({
  children,
  containerRef,
}: {
  children: React.ReactNode
  containerRef: React.RefObject<HTMLDivElement>
}) {
  const [themeId, setThemeId] = useState<ThemeId>('ink')

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const theme = THEMES.find(t => t.id === themeId)
    if (!theme) return
    Object.entries(theme.vars).forEach(([key, val]) => {
      el.style.setProperty(key, val)
    })
// Font is handled via --font-sans CSS var only
  }, [themeId, containerRef])

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ── Przełącznik do wbudowania w nav bar ───────────────────────────────────────

export function ThemeSwitcher() {
  const { themeId, setThemeId } = useManuscriptTheme()

  return (
    <div className="flex items-center gap-1 bg-white/10 rounded-lg p-0.5">
      {THEMES.map(t => (
        <button
          key={t.id}
          onClick={() => setThemeId(t.id)}
          title={`${t.name} – ${t.tagline}`}
          className={`
            px-2.5 py-1 rounded-md text-xs font-medium transition-all
            ${themeId === t.id
              ? 'bg-background text-foreground shadow-sm'
              : 'text-background/60 hover:text-background/90'}
          `}
        >
          {t.name}
        </button>
      ))}
    </div>
  )
}
