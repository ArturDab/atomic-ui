# Atomic UI – instrukcja dla Claude

## Czym jest ten projekt
Atomic UI to biblioteka komponentów i modułów UI wielokrotnego użytku.
Każdy moduł wypracowany tutaj może być przeniesiony do dowolnej docelowej aplikacji.

## Repo
GitHub: https://github.com/ArturDab/atomic-ui
Vercel: https://atomic-ui-sandy.vercel.app (auto-deploy po push na main)

## Workflow – każda sesja
```
git clone https://ArturDab:TOKEN@github.com/ArturDab/atomic-ui.git /tmp/atomic-ui
git -C /tmp/atomic-ui config user.email "claude@anthropic.com"
git -C /tmp/atomic-ui config user.name "Claude"
# po zmianach:
git -C /tmp/atomic-ui add -A
git -C /tmp/atomic-ui commit -m "opis"
git -C /tmp/atomic-ui push origin main
```
Token jest przekazywany przez użytkownika na początku sesji lub jest w Prompt startowym.

## Stack
- React 18 + TypeScript + Vite 5
- Tailwind CSS v3 + Shadcn/ui (Radix UI)
- React Router DOM v6
- DM Sans + JetBrains Mono

## Struktura repozytorium
```
src/components/ui/      – atomy bazowe (Shadcn-compatible)
src/components/blocks/  – bloki kompozytowe, reużywalne między modułami
src/modules/            – funkcjonalne moduły gotowe do przeniesienia do aplikacji
src/showcase/           – prototypy i demonstracje (nie trafiają do aplikacji)
src/registry/           – dokumentacja komponentów wyświetlana w bibliotece
```

## Trzy poziomy komponentów

### 1. Atoms (`src/components/ui/`)
Pojedyncze elementy UI: Button, Input, Badge, Avatar.
Shadcn-compatible. Nie zawierają logiki biznesowej.

### 2. Blocks (`src/components/blocks/`)
Kompozycje atomów z ujednoliconymi tokenami layoutu.
Przykład: SidePanel – zestaw prymitywów lewego panelu nawigacyjnego.
Tokeny SidePanel: w-72, px-4 py-2.5, text-sm/text-xs, h-10 dla przycisków akcji.
Bloki są dokumentowane w src/registry/blocks.tsx.

### 3. Modules (`src/modules/`)
Kompletne, funkcjonalne fragmenty UI gotowe do wycięcia i przeniesienia.
Każdy moduł: własny folder, własne hooki, przyjmuje dane przez propsy.
Nie wie nic o aplikacji, w której jest używany.
Moduł trafia tutaj gdy jest zatwierdzony wizualnie i UX-owo w showcase.

## Showcase – zasady prototypowania
- Prototypy żyją w `src/showcase/projects/[nazwa]/`
- Surówka = poprawny układ i spacing, neutralne kolory Tailwind
- h-14 dla WSZYSTKICH nagłówków pierwszego rzędu (token niepodważalny)
- h-10 dla przycisków głównej akcji, justify-start, ikona z mr-2
- Wszystkie kolumny danego widoku zaczynają się od tej samej wysokości
- SidePanel importuj z @/components/blocks/side-panel
- Każdy nowy ekran: build → sprawdź błędy TypeScript → push

## Routing showcase
```
/                        – biblioteka komponentów (atoms)
/blocks                  – bloki kompozytowe
/projects                – lista projektów
/projects/:projectSlug/all    – siatka miniatur
/projects/:projectSlug/WIDOK  – pełny ekran
```
Projekty z podmenu definiuje się przez grupy z children w PROJECT_META
(plik: src/showcase/projects/ProjectLayout.tsx).

## Przenoszenie modułu do aplikacji
Wykonuje Claude, nie użytkownik. Proces:
1. Skopiuj src/modules/[nazwa] do docelowego repo
2. Podmień tokeny design systemu na tokeny aplikacji
3. Podłącz do backendu aplikacji (zastąp mock-dane prawdziwymi hookami)
4. Nie zmieniaj logiki UI – tylko warstwę danych

## Zasady kodu
- Zawsze TypeScript, bez `any` jeśli da się uniknąć
- Lucide React dla ikon (nigdy emoji w UI)
- cn() z @/lib/utils dla warunkowych klas
- Komponenty buduj od największego kontenera do szczegółów
- Nie używaj inline styles jeśli można Tailwind
- Po każdym zestawie zmian: npm run build, zero błędów przed push

## Nowa aplikacja – pierwsze kroki
Gdy użytkownik chce zacząć nową aplikację na bazie modułów Atomic UI:
1. Zaproponuj 3 warianty design systemu (kolory, fonty, radius, styl)
2. Czekaj na wybór
3. Stwórz CLAUDE.md dla nowej aplikacji (szablon poniżej)
4. Przenieś wybrane moduły, adaptuj design system

## Moduł Lyra (src/modules/lyra/)

### Struktura
```
src/modules/lyra/
├── index.ts          – publiczne API modułu (re-exporty)
├── types.ts          – wszystkie interfejsy TypeScript
├── hooks/
│   ├── useDashboard.ts       – filtrowanie, sortowanie, widok listy/siatki
│   ├── useArticleEditor.ts   – bloki treści, CRUD, wordCount
│   ├── useBookEditor.ts      – drzewo struktury, aktywny rozdział, bloki per rozdział
│   └── useAIConversation.ts  – historia konwersacji per dokument/poziom
└── components/       – tu trafiają komponenty UI po refaktorze z showcase/
```

### Zasady przenoszenia komponentu showcase → moduł
1. Usuń hardkodowane dane, zastąp propsami zgodnymi z types.ts
2. Stan zarządzaj hookiem (useXxx), nie lokalnie w komponencie
3. Callbacki (onSave, onPublish, onBlockChange) przekazuj z zewnątrz
4. Komponent nie importuje nic z showcase/
5. Showcase używa modułu + dostarcza mock-dane i callbacki

### Użycie w nowej aplikacji
```tsx
import { useBookEditor, BookEditorProps } from '@/modules/lyra'
import BookEditorView from '@/modules/lyra/components/BookEditorView'

// W komponencie aplikacji:
const editor = useBookEditor(parts, blocksByChapter)
// Podłącz do Supabase, przekaż do widoku:
<BookEditorView {...editor} onSave={saveToSupabase} />
```
