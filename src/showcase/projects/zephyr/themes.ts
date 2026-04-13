export type ThemeId = 'sky' | 'slate' | 'sage' | 'noir'

export interface Theme {
  id: ThemeId
  name: string
  tagline: string
  vars: Record<string, string>
  radius: string
}

const BASE = {
  '--font-sans': "'DM Sans', system-ui, sans-serif",
  '--radius':    '0.5rem',
}

export const THEMES: Theme[] = [

  // ── Sky – domyślny, niebieski ─────────────────────────────────────────────
  {
    id: 'sky',
    name: 'Sky',
    tagline: 'Czysty · Niebieski · Domyślny',
    radius: '8px',
    vars: {
      '--background':           '0 0% 100%',
      '--foreground':           '215 25% 9%',
      '--card':                 '0 0% 100%',
      '--card-foreground':      '215 25% 9%',
      '--popover':              '0 0% 100%',
      '--popover-foreground':   '215 25% 9%',
      '--primary':              '199 89% 48%',
      '--primary-foreground':   '0 0% 100%',
      '--secondary':            '210 16% 95%',
      '--secondary-foreground': '215 20% 15%',
      '--muted':                '210 16% 95%',
      '--muted-foreground':     '215 12% 48%',
      '--accent':               '199 89% 48%',
      '--accent-foreground':    '0 0% 100%',
      '--destructive':          '0 70% 52%',
      '--destructive-foreground':'0 0% 100%',
      '--border':               '215 14% 91%',
      '--input':                '215 14% 91%',
      '--ring':                 '199 89% 48%',
      '--sidebar':              '210 18% 95%',
      '--sidebar-light':         '210 14% 97.5%',
      '--sidebar-header':       '210 20% 91%',
      '--card-shadow':          '0 1px 3px rgba(0,0,0,0.05)',
      ...BASE,
    },
  },

  // ── Slate – monochromatyczny, minimalny ───────────────────────────────────
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
      '--sidebar':              '220 14% 95%',
      '--sidebar-light':         '220 10% 97.5%',
      '--sidebar-header':       '220 16% 91%',
      '--card-shadow':          'none',
      ...BASE,
      '--radius': '0.375rem',
    },
  },

  // ── Sage – naturalny, stonowany zieleń ───────────────────────────────────
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
      '--sidebar':              '120 10% 93%',
      '--sidebar-light':         '120 8% 95.5%',
      '--sidebar-header':       '120 12% 88%',
      '--card-shadow':          '0 1px 3px rgba(0,40,10,0.05)',
      ...BASE,
      '--radius': '0.625rem',
    },
  },

  // ── Noir – ciemny ─────────────────────────────────────────────────────────
  {
    id: 'noir',
    name: 'Noir',
    tagline: 'Nocny · Skupiony · Ciemny',
    radius: '8px',
    vars: {
      '--background':           '222 22% 9%',
      '--foreground':           '210 20% 88%',
      '--card':                 '222 22% 11%',
      '--card-foreground':      '210 20% 88%',
      '--popover':              '222 22% 8%',
      '--popover-foreground':   '210 20% 88%',
      '--primary':              '199 80% 60%',
      '--primary-foreground':   '222 22% 9%',
      '--secondary':            '222 18% 18%',
      '--secondary-foreground': '210 15% 72%',
      '--muted':                '222 18% 18%',
      '--muted-foreground':     '215 12% 52%',
      '--accent':               '199 80% 60%',
      '--accent-foreground':    '222 22% 9%',
      '--destructive':          '0 60% 55%',
      '--destructive-foreground':'0 0% 100%',
      '--border':               '222 15% 20%',
      '--input':                '222 15% 20%',
      '--ring':                 '199 80% 60%',
      '--sidebar':              '222 24% 7%',
      '--sidebar-light':         '222 20% 9%',
      '--sidebar-header':       '222 26% 5%',
      '--card-shadow':          'none',
      ...BASE,
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
