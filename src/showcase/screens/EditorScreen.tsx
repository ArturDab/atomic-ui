import * as React from 'react'
import { EditorToolbar } from '@/components/blocks/editor-toolbar'
import { ChatMessage } from '@/components/blocks/chat-message'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sparkles, Send, ChevronDown } from 'lucide-react'

const CHAT: Array<{ role: 'user' | 'assistant'; content: string }> = [
  { role: 'assistant', content: 'Dokument wygenerowany. Mogę go skrócić, zmienić ton lub rozbudować sekcję. Co poprawić?' },
  { role: 'user', content: 'Zmień wstęp – chcę mocniejszy hook. Coś zaskakującego.' },
  { role: 'assistant', content: 'Zaktualizowałem wstęp – zaczynam od zaskakującej statystyki: 94% treści w internecie nie generuje żadnego ruchu. Sprawdź w edytorze.' },
  { role: 'user', content: 'Skróć sekcję "Narzędzia" o 30%.' },
  { role: 'assistant', content: 'Gotowe – z 380 do 265 słów. Zachowałem kluczowe przykłady i usunąłem powtórzenia.' },
]

const SECTIONS = [
  { type: 'p', text: '94% treści opublikowanych w internecie nigdy nie generuje żadnego ruchu organicznego. To nie pesymistyczna statystyka – to wyzwanie. Dobra wiadomość? Reszta 6% nie jest przypadkiem.' },
  { type: 'h2', text: 'Dlaczego większość treści SEO nie działa' },
  { type: 'p', text: 'Zanim zaczniesz pisać, musisz zrozumieć najczęstsze błędy. Pisanie pod algorytm zamiast pod człowieka. Brak konkretnego kąta. Ignorowanie intencji wyszukiwania.' },
  { type: 'h2', text: 'Struktura, która pozycjonuje' },
  { type: 'p', text: 'Sprawdzone artykuły SEO mają wspólną cechę: odpowiadają na pytania w kolejności, w jakiej je zadają użytkownicy. Zacznij od odpowiedzi na główne pytanie już w pierwszych 100 słowach.' },
  { type: 'h2', text: 'Słowa kluczowe w 2025 roku' },
  { type: 'p', text: 'Zapomnij o "gęstości słów kluczowych". Skup się na tematach, nie frazach. Google rozumie synonimy, kontekst i powiązane zagadnienia. Użyj głównej frazy w: tytule, pierwszym akapicie i meta description.' },
  { type: 'h2', text: 'Długość a jakość' },
  { type: 'p', text: 'Artykuły 2000+ słów generalnie lepiej pozycjonują, ale długość nie jest celem samym w sobie. Każde zdanie musi nieść wartość. Lepszy 800-słowny artykuł, który wyczerpuje temat, niż 2000-słowny z wypełniaczem.' },
]

export default function EditorScreen() {
  const [chatInput, setChatInput] = React.useState('')

  return (
    <div className="flex flex-col h-full">
      <EditorToolbar
        title="Jak pisać treści SEO, które naprawdę działają w 2025 roku"
        status="draft"
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Prompt panel */}
        <div className="w-64 border-r bg-white flex flex-col shrink-0 overflow-y-auto">
          <div className="p-4 border-b">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">Szablon</p>
            <div className="border rounded-lg px-3 py-2 flex itely-center justify-between cursor-pointer hover:bg-muted/40 transition-colors">
              <div>
                <p className="text-xs font-medium">Artykuł blogowy SEO</p>
                <p className="text-xs text-muted-foreground">3 parametry</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
          </div>

          <div className="p-4 space-y-4 flex-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Parametry</p>
            <div className="space-y-1.5">
              <Label className="text-xs">Temat artykułu</Label>
              <Input defaultValue="Jak pisać treści SEO w 2025 roku" className="h-8 text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Fraza kluczowa</Label>
              <Input defaultValue="treści SEO 2025" className="h-8 text-xs" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Ton</Label>
              <Select defaultValue="professional">
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Profesjonalny</SelectItem>
                  <SelectItem value="casual">Swobodny</SelectItem>
                  <SelectItem value="authoritative">Autorytatywny</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="p-4 border-t">
            <Button className="w-full gap-2 text-xs h-9">
              <Sparkles className="w-3.5 h-3.5" />
              Generuj ponownie
            </Button>
          </div>
        </div>

        {/* Center: Editor */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <div className="flex itely-center justify-between px-6 py-2.5 border-b bg-muted/20">
            <span className="text-xs text-muted-foreground">~620 słów · ok. 4 min czytania</span>
            <div className="flex itely-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Zapisano automatycznie
            </div>
          </div>
          <div className="flex-1 overflow-y-auto px-10 py-8">
            <div className="max-w-2xl mx-auto">
              {SECTIONS.map((s, i) =>
                s.type === 'h2'
                  ? <h2 key={i} className="text-base font-semibold mt-6 mb-2">{s.text}</h2>
                  : <p key={i} className="text-sm leading-relaxed text-foreground mb-3">{s.text}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right: AI chat */}
        <div className="w-72 border-l bg-white flex flex-col shrink-0">
          <div className="px-4 py-3 border-b">
            <div className="flex itely-center gap-2">
              <div className="w-6 h-6 rounded-full bg-foreground flex itely-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-background" />
              </div>
              <p className="text-sm font-medium">Asystent AI</p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {CHAT.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} userInitials="AK" />
            ))}
          </div>
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Napisz instrukcję..."
                className="flex-1 text-xs border rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-ring placeholder:text-muted-foreground bg-muted/40"
              />
              <Button size="icon" className="h-9 w-9 shrink-0">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
