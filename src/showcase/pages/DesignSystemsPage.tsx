/**
 * DesignSystemsPage – 3 warianty design systemu do wyboru dla nowej aplikacji.
 * Każdy wariant: paleta kolorów, typografia, radius, przykładowy UI.
 */
import { useState } from 'react'
import { Check, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const SYSTEMS = [
  {
    id: 'ink',
    name: 'Ink',
    tagline: 'Minimalistyczny · Edytorski · Skupiony na treści',
    inspiration: 'Craft.do, iA Writer, Bear',
    desc: 'Ciepła biel, jeden mocny akcent (atrament/grafit), dużo białej przestrzeni. Typografia szeryfowa w edytorze. Czujesz że piszesz, nie klikasz w oprogramowanie.',
    colors: {
      bg: '#FAFAF8',
      surface: '#F5F4F0',
      border: '#E8E6E0',
      text: '#1A1916',
      muted: '#8A8880',
      accent: '#1A1916',
      accentFg: '#FAFAF8',
    },
    font: 'Lora (serif) / Inter (UI)',
    radius: '6px – łagodne, nie okrągłe',
    editorFont: 'Lora 18px / line-height 1.8',
    tokens: [
      { name: 'background', value: '#FAFAF8' },
      { name: 'foreground', value: '#1A1916' },
      { name: 'primary', value: '#1A1916' },
      { name: 'muted', value: '#F5F4F0' },
      { name: 'accent', value: '#C9A96E' },
      { name: 'border', value: '#E8E6E0' },
    ],
  },
  {
    id: 'nova',
    name: 'Nova',
    tagline: 'Nowoczesny · Produktowy · Profesjonalny',
    inspiration: 'Linear, Notion, Raycast',
    desc: 'Chłodna szarość, mocny niebieskofioletowy akcent, precyzyjny spacing. Wygląda jak narzędzie do pracy, nie jak notatnik. Świetny dla zespołów i zaawansowanych użytkowników.',
    colors: {
      bg: '#FFFFFF',
      surface: '#F8F9FB',
      border: '#E4E7EC',
      text: '#101828',
      muted: '#667085',
      accent: '#6366F1',
      accentFg: '#FFFFFF',
    },
    font: 'Geist (UI) / Merriweather (edytor)',
    radius: '8px – nowoczesne zaokrąglenia',
    editorFont: 'Merriweather 17px / line-height 1.75',
    tokens: [
      { name: 'background', value: '#FFFFFF' },
      { name: 'foreground', value: '#101828' },
      { name: 'primary', value: '#6366F1' },
      { name: 'muted', value: '#F8F9FB' },
      { name: 'accent', value: '#6366F1' },
      { name: 'border', value: '#E4E7EC' },
    ],
  },
  {
    id: 'folio',
    name: 'Folio',
    tagline: 'Klasyczny · Publikacyjny · Prestiżowy',
    inspiration: 'Ghost, Medium, Ulysses',
    desc: 'Głęboka granat/stalowa czerń jako primary, złamana biel jako tło. Klimat profesjonalnej publikacji. Każdy ekran wygląda jak strona gotowa do druku.',
    colors: {
      bg: '#F9F7F4',
      surface: '#F2EFE9',
      border: '#DDD9D0',
      text: '#1C2333',
      muted: '#7B8099',
      accent: '#2D3A5E',
      accentFg: '#F9F7F4',
    },
    font: 'Source Serif 4 (edytor) / Geist (UI)',
    radius: '4px – ostrzejsze, bardziej prasowe',
    editorFont: 'Source Serif 4 19px / line-height 1.85',
    tokens: [
      { name: 'background', value: '#F9F7F4' },
      { name: 'foreground', value: '#1C2333' },
      { name: 'primary', value: '#2D3A5E' },
      { name: 'muted', value: '#F2EFE9' },
      { name: 'accent', value: '#B5905A' },
      { name: 'border', value: '#DDD9D0' },
    ],
  },
]

// Mini mock-up: przykładowy UI w danym design systemie
function MiniEditor({ system }: { system: typeof SYSTEMS[0] }) {
  const { colors, font, radius } = system
  return (
    <div className="rounded-xl overflow-hidden border shadow-sm" style={{ borderColor: colors.border }}>
      {/* App header */}
      <div className="flex itely-center gap-2 px-3 py-2 border-b" style={{ background: colors.bg, borderColor: colors.border }}>
        <div className="w-2 h-2 rounded-full" style={{ background: colors.accent }} />
        <span className="text-[10px] font-semibold" style={{ color: colors.text }}>Lyra</span>
        <div className="flex-1" />
        <div className="px-2 py-0.5 rounded text-[9px] font-medium" style={{ background: colors.accent, color: colors.accentFg, borderRadius: radius }}>
          Publikuj
        </div>
      </div>

      {/* Body */}
      <div className="flex" style={{ background: colors.bg }}>
        {/* Sidebar */}
        <div className="w-28 border-r p-2 space-y-1" style={{ borderColor: colors.border, background: colors.surface }}>
          {['Struktura', 'Rozdział'].map((item, i) => (
            <div key={item} className="text-[8px] px-2 py-1 rounded" style={{
              color: i === 1 ? colors.accentFg : colors.muted,
              background: i === 1 ? colors.accent : 'transparent',
              borderRadius: radius,
            }}>{item}</div>
          ))}
          <div className="h-px my-1" style={{ background: colors.border }} />
          {['Rozdział 1', 'Rozdział 2', '→ Rozdział 3', 'Rozdział 4'].map((ch, i) => (
            <div key={ch} className="text-[7px] px-2 py-0.5" style={{
              color: i === 2 ? colors.text : colors.muted,
              fontWeight: i === 2 ? 600 : 400,
            }}>{ch}</div>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 px-4 py-3">
          <div className="text-[7px] mb-0.5" style={{ color: colors.muted }}>ROZDZIAŁ 3</div>
          <div className="text-[10px] font-bold mb-2" style={{ color: colors.text }}>Modele językowe jako fundament</div>
          <div className="space-y-1">
            <div className="h-1 rounded-full" style={{ background: colors.border, width: '95%' }} />
            <div className="h-1 rounded-full" style={{ background: colors.border, width: '88%' }} />
            <div className="h-1 rounded-full" style={{ background: colors.border, width: '72%' }} />
          </div>
          <div className="text-[8px] mt-2 font-semibold" style={{ color: colors.text }}>Czym jest model językowy?</div>
          <div className="space-y-0.5 mt-1">
            <div className="h-1 rounded-full" style={{ background: colors.border, width: '90%' }} />
            <div className="h-1 rounded-full" style={{ background: colors.border, width: '80%' }} />
          </div>
        </div>

        {/* AI Panel */}
        <div className="w-20 border-l p-2" style={{ borderColor: colors.border, background: colors.surface }}>
          <div className="text-[7px] font-semibold mb-1.5" style={{ color: colors.muted }}>ASYSTENT AI</div>
          <div className="rounded p-1.5 text-[6px] mb-1" style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.muted, borderRadius: radius }}>
            Napisz wstęp...
          </div>
          <div className="rounded p-1 text-[6px]" style={{ background: colors.accent, color: colors.accentFg, borderRadius: radius }}>
            ↑ Wyślij
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DesignSystemsPage() {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="max-w-4xl mx-auto px-8 py-8 space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Design System – propozycje</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Trzy warianty dla nowej aplikacji (Lyra / Quasar / Pulsar).
          Kliknij wybrany, żeby go oznaczyć.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {SYSTEMS.map(system => (
          <div
            key={system.id}
            onClick={() => setSelected(system.id)}
            className={cn(
              'border-2 rounded-2xl overflow-hidden cursor-pointer transition-all',
              selected === system.id ? 'border-foreground shadow-md' : 'border-border hover:border-foreground/30 hover:shadow-sm'
            )}
          >
            {/* Card header */}
            <div className="flex itely-start gap-4 px-6 py-4 border-b bg-muted/20">
              <div className="flex-1">
                <div className="flex itely-center gap-3">
                  <h2 className="text-lg font-bold tracking-tight">{system.name}</h2>
                  {selected === system.id && (
                    <span className="flex itely-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> Wybrany
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{system.tagline}</p>
                <p className="text-xs text-muted-foreground/70 mt-0.5">Inspiracje: {system.inspiration}</p>
              </div>
              <ChevronRight className={cn('w-5 h-5 text-muted-foreground mt-0.5 transition-transform', selected === system.id && 'rotate-90')} />
            </div>

            <div className="grid grid-cols-2 gap-6 px-6 py-5">
              {/* Lewo: opis + tokeny */}
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-foreground/80">{system.desc}</p>

                {/* Paleta */}
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Paleta</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {system.tokens.map(t => (
                      <div key={t.name} className="flex flex-col itely-center gap-1">
                        <div className="w-8 h-8 rounded-lg border shadow-sm"
                          style={{ background: t.value, borderColor: 'rgba(0,0,0,0.1)' }} />
                        <span className="text-[8px] text-muted-foreground">{t.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1.5">
                  {[
                    { label: 'Typografia', value: system.font },
                    { label: 'Radius', value: system.radius },
                    { label: 'Edytor', value: system.editorFont },
                  ].map(row => (
                    <div key={row.label} className="flex gap-2 text-xs">
                      <span className="text-muted-foreground w-20 shrink-0">{row.label}</span>
                      <span className="text-foreground/80">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prawo: mini mock-up */}
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Podgląd</p>
                <MiniEditor system={system} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <div className="flex itely-center justify-between p-4 bg-foreground text-background rounded-xl">
          <div>
            <p className="font-semibold">Wybrany: {SYSTEMS.find(s => s.id === selected)?.name}</p>
            <p className="text-sm opacity-70 mt-0.5">Claude użyje tego design systemu tworząc nową aplikację.</p>
          </div>
          <button
            onClick={() => {
              // In real app this would trigger new project creation
              alert(`Zapamiętano wybór: ${selected}. Powiedz Claude "zaczynamy nową aplikację z design systemem ${selected}" żeby startować.`)
            }}
            className="bg-background text-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
            Zatwierdź wybór
          </button>
        </div>
      )}
    </div>
  )
}
