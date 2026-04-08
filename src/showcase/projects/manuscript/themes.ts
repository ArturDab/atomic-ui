export type ThemeId = 'chalk' | 'verso' | 'zen' | 'paper'

export interface Theme {
  id: ThemeId
  name: string
  tagline: string
  vars: Record<string, string>
  editorFont: string
  editorFontSize: string
  radius: string
}

// Baza typograficzna wspólna dla wszystkich motywów (Chalk)
const BASE_TYPOGRAPHY = {
  '--editor-font':  "'Merriweather', Georgia, serif",
  '--editor-size':  '17px',
  '--font-sans':    "'DM Sans', system-ui, sans-serif",
  '--radius':       '0.625rem',
}

export const THEMES: Theme[] = [

  // ── Chalk – ultra-clean, dzień ───────────────────────────────────────────
  {
    id: 'chalk',
    name: 'Chalk',
    tagline: 'Czysty · Precyzyjny · Domyślny',
    radius: '10px',
    editorFont:     BASE_TYPOGRAPHY['--editor-font'],
    editorFontSize: BASE_TYPOGRAPHY['--editor-size'],
    vars: {
      '--background':          '0 0% 99%',
      '--foreground':          '220 15% 9%',
      '--card':                '0 0% 99%',
      '--card-foreground':     '220 15% 9%',
      '--popover':             '0 0% 99%',
      '--popover-foreground':  '220 15% 9%',
      '--primary':             '211 90% 48%',
      '--primary-foreground':  '0 0% 100%',
      '--secondary':           '220 15% 95%',
      '--secondary-foreground':'220 15% 15%',
      '--muted':               '220 15% 95%',
      '--muted-foreground':    '220 10% 50%',
      '--accent':              '211 90% 48%',
      '--accent-foreground':   '0 0% 100%',
      '--destructive':         '0 70% 52%',
      '--destructive-foreground':'0 0% 100%',
      '--border':              '220 12% 91%',
      '--input':               '220 12% 91%',
      '--ring':                '211 90% 48%',
      '--sidebar':             '220 18% 95%',
      '--sidebar-light':       '220 12% 97.5%',
      '--sidebar-header':      '220 18% 91%',
      '--card-shadow':         '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
      ...BASE_TYPOGRAPHY,
    },
  },

  // ── Verso – dark mode ────────────────────────────────────────────────────
  {
    id: 'verso',
    name: 'Verso',
    tagline: 'Nocny · Skupiony · Ciemny',
    radius: '10px',
    editorFont:     BASE_TYPOGRAPHY['--editor-font'],
    editorFontSize: BASE_TYPOGRAPHY['--editor-size'],
    vars: {
      '--background':          '222 20% 14%',
      '--foreground':          '210 20% 86%',
      '--card':                '222 20% 15%',
      '--card-foreground':     '210 20% 86%',
      '--popover':             '222 20% 13%',
      '--popover-foreground':  '210 20% 86%',
      '--primary':             '211 80% 62%',
      '--primary-foreground':  '0 0% 100%',
      '--secondary':           '222 18% 20%',
      '--secondary-foreground':'210 15% 72%',
      '--muted':               '222 18% 20%',
      '--muted-foreground':    '215 12% 52%',
      '--accent':              '211 80% 62%',
      '--accent-foreground':   '0 0% 100%',
      '--destructive':         '0 60% 55%',
      '--destructive-foreground':'0 0% 100%',
      '--border':              '222 15% 22%',
      '--input':               '222 15% 22%',
      '--ring':                '211 80% 62%',
      '--sidebar':             '222 22% 11%',
      '--sidebar-light':       '222 20% 13%',
      '--sidebar-header':      '222 24% 9%',
      '--card-shadow':         'none',
      ...BASE_TYPOGRAPHY,
    },
  },

  // ── Zen – spokój i koncentracja ──────────────────────────────────────────
  {
    id: 'zen',
    name: 'Zen',
    tagline: 'Spokojny · Stonowany · Skupiony',
    radius: '10px',
    editorFont:     BASE_TYPOGRAPHY['--editor-font'],
    editorFontSize: BASE_TYPOGRAPHY['--editor-size'],
    vars: {
      // Tło z bardzo subtelnym chłodnym odcieniem – nie pure white, ale nie gray
      '--background':          '210 28% 97%',
      '--foreground':          '220 28% 18%',
      '--card':                '210 28% 97%',
      '--card-foreground':     '220 28% 18%',
      '--popover':             '210 28% 97%',
      '--popover-foreground':  '220 28% 18%',
      // Muted teal – nie krzyczy, ale jest czytelny
      '--primary':             '196 38% 40%',
      '--primary-foreground':  '0 0% 100%',
      '--secondary':           '210 22% 93%',
      '--secondary-foreground':'220 22% 22%',
      '--muted':               '210 22% 93%',
      '--muted-foreground':    '215 14% 50%',
      '--accent':              '196 38% 40%',
      '--accent-foreground':   '0 0% 100%',
      '--destructive':         '0 62% 52%',
      '--destructive-foreground':'0 0% 100%',
      '--border':              '214 16% 88%',
      '--input':               '214 16% 88%',
      '--ring':                '196 38% 40%',
      '--sidebar':             '210 24% 92%',
      '--sidebar-light':       '210 20% 95%',
      '--sidebar-header':      '210 26% 88%',
      '--card-shadow':         '0 1px 3px rgba(0,0,0,0.04)',
      ...BASE_TYPOGRAPHY,
    },
  },

  // ── Paper – ciepłe beże, kolorystyka papierowa ───────────────────────────
  {
    id: 'paper',
    name: 'Paper',
    tagline: 'Ciepły · Papierowy · Analogowy',
    radius: '10px',
    editorFont:     BASE_TYPOGRAPHY['--editor-font'],
    editorFontSize: BASE_TYPOGRAPHY['--editor-size'],
    vars: {
      // Ciepła kremowa biel – jak dobry papier biurowy
      '--background':          '40 30% 96%',
      '--foreground':          '28 22% 14%',
      '--card':                '40 30% 96%',
      '--card-foreground':     '28 22% 14%',
      '--popover':             '40 30% 96%',
      '--popover-foreground':  '28 22% 14%',
      // Ciepły brąz jako akcent – atrament na papierze
      '--primary':             '25 42% 32%',
      '--primary-foreground':  '40 30% 96%',
      '--secondary':           '40 20% 91%',
      '--secondary-foreground':'28 18% 20%',
      '--muted':               '40 20% 91%',
      '--muted-foreground':    '35 10% 48%',
      // Terrakota jako akcent dekoracyjny
      '--accent':              '18 48% 44%',
      '--accent-foreground':   '0 0% 100%',
      '--destructive':         '0 62% 50%',
      '--destructive-foreground':'0 0% 100%',
      '--border':              '38 16% 84%',
      '--input':               '38 16% 84%',
      '--ring':                '25 42% 32%',
      '--sidebar':             '40 22% 91%',
      '--sidebar-light':       '40 18% 94%',
      '--sidebar-header':      '40 24% 86%',
      '--card-shadow':         '0 1px 3px rgba(60,40,20,0.06)',
      ...BASE_TYPOGRAPHY,
    },
  },

]

export function applyTheme(themeId: ThemeId, container: HTMLElement) {
  const theme = THEMES.find(t => t.id === themeId)
  if (!theme) return
  Object.entries(theme.vars).forEach(([key, value]) => {
    container.style.setProperty(key, value)
  })
}
