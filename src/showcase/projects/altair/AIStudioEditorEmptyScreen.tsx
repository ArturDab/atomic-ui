import * as React from 'react'
import { useParams } from 'react-router-dom'
import { CPSidebar } from './_Sidebar'
import { TopBar } from './_TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft, FileText, Play, ChevronDown,
  Wand2, Lightbulb,
} from 'lucide-react'

const TIPS = [
  'Im dokładniejszy temat, tym lepszy efekt. Zamiast "Marketing AI" napisz "5 narzędzi AI dla małych firm e-commerce w 2025 roku".',
  'Dodaj kontekst w "Dodatkowe instrukcje" – grupę docelową, CTA lub słowa kluczowe, które muszą się pojawić.',
  'Wybierz język docelowy, nawet jeśli chcesz po polsku – zapobiegnie to mieszaniu języków.',
]

export default function AIStudioEditorEmptyScreen() {
  const { projectSlug } = useParams<{ projectSlug: string }>()

  return (
    <div className="flex h-full bg-background">
      <CPSidebar active="ai-studio" />

      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar crumbs={[{ label: 'Strona główna' }, { label: 'AI Studio' }, { label: 'Artykuł blogowy' }]} />

        <div className="flex flex-1 overflow-hidden">

          {/* Lewy panel – formularz */}
          <div className="w-80 border-r flex flex-col shrink-0">
            <div className="h-14 border-b flex itely-center gap-3 px-4 shrink-0">
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 rounded-md bg-muted flex itely-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="font-semibold text-sm">Artykuł blogowy</span>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-sm">
                    Temat <span className="text-destructive">*</span>
                  </Label>
                  <Input placeholder="Np. Jak stworzyć skuteczny zespół agentów AI?" className="text-sm" />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Ton</Label>
                  <Select>
                    <SelectTrigger className="text-sm"><SelectValue placeholder="Wybierz ton..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Profesjonalny</SelectItem>
                      <SelectItem value="casual">Swobodny</SelectItem>
                      <SelectItem value="authoritative">Autorytatywny</SelectItem>
                      <SelectItem value="friendly">Przyjazny</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Długość</Label>
                  <Select>
                    <SelectTrigger className="text-sm"><SelectValue placeholder="Wybierz długość..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Krótki (400–600 słów)</SelectItem>
                      <SelectItem value="medium">Średni (800–1200 słów)</SelectItem>
                      <SelectItem value="long">Długi (1500–2500 słów)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Język</Label>
                  <Select>
                    <SelectTrigger className="text-sm"><SelectValue placeholder="Wybierz język..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pl">Polski</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Dodatkowe instrukcje</Label>
                  <Textarea
                    placeholder="Np. grupa docelowa, słowa kluczowe, CTA, styl nagłówków..."
                    className="text-sm resize-none min-h-20"
                  />
                </div>
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <Button className="w-full gap-2" size="lg">
                <Play className="w-4 h-4" />
                Generuj
              </Button>
            </div>
          </div>

          {/* Prawa strefa – empty state */}
          <div className="flex-1 flex flex-col itely-center justify-center bg-[#fafafa] px-8">
            <div className="max-w-sm text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex itely-center justify-center mx-auto mb-5">
                <Wand2 className="w-8 h-8 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <h2 className="text-lg font-semibold mb-2">Gotowy do generowania</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8">
                Wypełnij formularz po lewej stronie i kliknij <strong>Generuj</strong>. Treść pojawi się tutaj i będziesz mógł ją edytować.
              </p>

              <Separator className="mb-6" />

              {/* Wskazówki */}
              <div className="text-left space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex itely-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5" /> Wskazówki
                </p>
                {TIPS.map((tip, i) => (
                  <div key={i} className="flex gap-2.5">
                    <span className="text-xs font-semibold text-muted-foreground/50 mt-0.5 shrink-0 w-4">{i + 1}.</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
