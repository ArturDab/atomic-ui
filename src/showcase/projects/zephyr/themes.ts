export type ThemeId = 'ink' | 'slate' | 'sage' | 'dusk'

export interface Theme {
  id: ThemeId
  name: string
  tagline: string
  vars: Record<string, string>
  radius: string
}

const BASE = {
  '--font-sans':    "'DM Sans', system-ui, sans-serif",
  '--font-display': "'DM Sans', system-ui, sans-serif",
  '--radius':       '0.5rem',
}

export const THEMES: Theme[] = [

  // ── Ink & Air – tożsamość Zephyra ────────────────────────────────────────
  // Głęboki fiolet jako akcent, serif/sans kontrast, duże powietrze
  {
    id: 'ink',
    name: 'Ink',
    tagline: 'Ink & Air · Wydawniczy · Precyzyjny',
    radius: '10px',
    vars: {
      '--background':           '220 14% 99%',
      '--foreground':           '222 30% 8%',
      '--card':                 '220 14% 99%',
      '--card-foreground':      '222 30% 8%',
      '--popover':              '220 14% 99%',
      '--popover-foreground':   '222 30% 8%',
      '--primary':              '258 52% 38%',
      '--primary-foreground':   '0 0% 100%',
      '--secondary':            '220 14% 95%',
      '--secondary-foreground': '222 22% 14%',
      '--muted':                '220 14% 96%',
      '--muted-foreground':     '220 12% 46%',
      '--accent':               '258 52% 38%',
      '--accent-foreground':    '0 0% 100%',
      '--destructive':          '0 68% 52%',
      '--destructive-foreground':'0 0% 100%',
      '--border':               '220 12% 91%',
      '--input':                '220 12% 91%',
      '--ring':                 '258 52% 38%',
      '--sidebar':              '220 12% 97.5%',
      '--sidebar-header':       '220 14% 94%',
      '--card-shadow':          '0 1px 4px rgba(22,18,44,0.06)',
      ...BASE,
      '--font-display': "'Lora', Georgia, serif",
      '--radius':       '0.625rem',
    },
  },

  // ── Slate – minimalistyczny, monochromatyczny ─────────────────────────────
  {
    id: 'slate',
    name: 'Slate',
    tagline: 'Minimalistyczny · Monochromatyczny · Precyzyjny',
    radius: '6px',
    vars: {
      '--background':           '0 0% 100%',
      '--foreground':           '222 47% 9%',
      '--card':                 '0 0% 100%',
      '--card-foreground':      '222 47% 9%',
      '--popover':              '0 0% 100%',
      '--popover-foreground':   '222 47% 9%',
      '--primary':              '222 47% 11%',
      '--primary-foreground':   '0 0% 100%',
      '--secondary':            '220 14% 96%',
      '--secondary-foreground': '222 30% 12%',
      '--muted':                '220 14% 96%',
      '--muted-foreground':     '220 10% 46%',
      '--accent':               '222 47% 11%',
      '--accent-foreground':    '0 0% 100%',
      '--destructive':          '0 70% 52%',
      '--destructive-foreground':'0 0% 100%',
      '--border':               '220 12% 90%',
      '--input':                '220 12% 90%',
      '--ring':                 '222 47% 11%',
      '--sidebar':              '220 14% 97%',
      '--sidebar-header':       '220 16% 93%',
      '--card-shadow':          'none',
      ...BASE,
      '--radius': '0.375rem',
    },
  },

  // ── Sage – naturalny, stonowany ───────────────────────────────────────────
  {
    id: 'sage',
    name: 'Sage',
    tagline: 'Stonowany · Naturalny · Spokojny',
    radius: '10px',
    vars: {
      '--background':           '120 8% 98%',
      '--foreground':           '140 20% 10%',
      '--card':                 '120 8% 98%',
      '--card-foreground':      '140 20% 10%',
      '--popover':              '120 8% 98%',
      '--popover-foreground':   '140 20% 10%',
      '--primary':              '152 38% 36%',
      '--primary-foreground':   '0 0% 100%',
      '--secondary':            '120 10% 93%',
      '--secondary-foreground': '140 16% 14%',
      '--muted':                '120 10% 93%',
      '--muted-foreground':     '130 8% 46%',
      '--accent':               '152 38% 36%',
      '--accent-foreground':    '0 0% 100%',
      '--destructive':          '0 65% 52%',
      '--destructive-foreground':'0 0% 100%',
      '--border':               '120 10% 87%',
      '--input':                '120 10% 87%',
      '--ring':                 '152 38% 36%',
      '--sidebar':              '120 10% 94%',
      '--sidebar-header':       '120 12% 89%',
      '--card-shadow':          '0 1px 3px rgba(0,40,10,0.05)',
      ...BASE,
      '--radius': '0.625rem',
    },
  },

  // ── Dusk – ciemny wariant Ink & Air, z fioletowym podtekstem ─────────────
  {
    id: 'dusk',
    name: 'Dusk',
    tagline: 'Ink & Air · Nocny · Fioletowy mrok',
    radius: '10px',
    vars: {
      '--background':           '250 22% 9%',
      '--foreground':           '240 15% 88%',
      '--card':                 '250 22% 11%',
      '--card-foreground':      '240 15% 88%',
      '--popover':              '250 22% 8%',
      '--popover-foreground':   '240 15% 88%',
      '--primary':              '262 60% 65%',
      '--primary-foreground':   '250 22% 9%',
      '--secondary':            '250 18% 18%',
      '--secondary-foreground': '240 12% 72%',
      '--muted':                '250 18% 18%',
      '--muted-foreground':     '240 10% 52%',
      '--accent':               '262 60% 65%',
      '--accent-foreground':    '250 22% 9%',
      '--destructive':          '0 60% 55%',
      '--destructive-foreground':'0 0% 100%',
      '--border':               '250 16% 20%',
      '--input':                '250 16% 20%',
      '--ring':                 '262 60% 65%',
      '--sidebar':              '250 28% 7%',
      '--sidebar-header':       '250 30% 6%',
      '--card-shadow':          'none',
      ...BASE,
      '--font-display': "'Lora', Georgia, serif",
      '--radius':       '0.625rem',
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
