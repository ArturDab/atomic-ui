# [NazwaAplikacji] – instrukcja dla Claude

## Czym jest ten projekt
[Jeden akapit: co robi aplikacja, dla kogo, główny cel.]

## Repo
GitHub: https://github.com/[owner]/[nazwa].git
Token: ghp_... (przekazywany przez użytkownika na początku sesji)
Deploy: [Vercel/Railway/inne] – [URL]

## Workflow – każda sesja
```
git clone https://[owner]:TOKEN@github.com/[owner]/[nazwa].git /tmp/[nazwa]
git -C /tmp/[nazwa] config user.email "claude@anthropic.com"
git -C /tmp/[nazwa] config user.name "Claude"
# po zmianach:
git -C /tmp/[nazwa] add -A
git -C /tmp/[nazwa] commit -m "opis"
git -C /tmp/[nazwa] push origin main
```

## Stack
[Wpisz rzeczywisty stack: np. Next.js 14, Supabase, Vercel, etc.]

## Design system
Oparty na wariancie: [nazwa wybranego wariantu z Atomic UI]
Plik tokenów: [ścieżka do pliku z CSS variables lub Tailwind config]

## Moduły z Atomic UI
Aplikacja korzysta z modułów przeniesionych z Atomic UI (github.com/ArturDab/atomic-ui).
Moduły są zaadaptowane do design systemu tej aplikacji.
Źródło prawdy dla logiki UI: Atomic UI.
Źródło prawdy dla danych i backendu: ta aplikacja.

## Struktura projektu
[Wpisz rzeczywistą strukturę folderów po pierwszym setupie.]

## Zasady kodu
Dziedziczone z Atomic UI (patrz: github.com/ArturDab/atomic-ui/CLAUDE.md).
Dodatkowe zasady specyficzne dla tej aplikacji:
- [np. wszystkie wywołania API przez src/lib/api.ts]
- [np. auth przez Supabase, nie własne rozwiązanie]
