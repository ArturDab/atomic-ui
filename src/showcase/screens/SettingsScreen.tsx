import { AppSidebar } from '@/components/blocks/app-sidebar'
import { ConnectionCard } from '@/components/blocks/connection-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Globe, Plus } from 'lucide-react'

export default function SettingsScreen() {
  return (
    <div className="flex h-full">
      <AppSidebar activeHref="/settings" user={{ name: 'Artur K.', email: 'artur@simplimo.pl', initials: 'AK' }} />
      <div className="flex-1 overflow-y-auto bg-[#fafafa]">
        <div className="border-b bg-white px-8 py-4">
          <h1 className="text-xl font-semibold tracking-tight">Ustawienia</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Zarządzaj kontem i integracjami</p>
        </div>

        <div className="px-8 py-6 max-w-2xl space-y-10">
          {/* Account */}
          <section>
            <h2 className="text-sm font-semibold mb-1">Konto</h2>
            <p className="text-xs text-muted-foreground mb-4">Twoje dane osobowe i ustawienia logowania.</p>
            <div className="bg-white border rounded-xl p-5 space-y-4">
              <div className="flex itely-center gap-4">
                <div className="w-14 h-14 rounded-full bg-foreground flex itely-center justify-center text-background text-lg font-semibold shrink-0">
                  AK
                </div>
                <div>
                  <p className="text-sm font-medium">Artur K.</p>
                  <p className="text-xs text-muted-foreground">artur@simplimo.pl</p>
                  <Button variant="ghost" size="sm" className="h-7 text-xs px-0 text-muted-foreground mt-0.5">
                    Zmień zdjęcie
                  </Button>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs">Imię i nazwisko</Label>
                  <Input defaultValue="Artur Kowalski" className="h-9 text-sm" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">Adres email</Label>
                  <Input defaultValue="artur@simplimo.pl" type="email" className="h-9 text-sm" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button size="sm" className="h-8 text-xs">Zapisz zmiany</Button>
              </div>
            </div>
          </section>

          {/* Integrations */}
          <section>
            <div className="flex itely-center justify-between mb-1">
              <h2 className="text-sm font-semibold">Integracje</h2>
              <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5">
                <Plus className="w-3 h-3" /> Dodaj witrynę
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Połącz Altair z platformami publikacji.</p>
            <div className="space-y-3">
              <ConnectionCard platform="WordPress" url="blog.arturdabrowski.pl" status="connected" meta="47 opublikowanych postów · REST API" icon={Globe} />
              <ConnectionCard platform="WordPress" url="raai.readabout.ai" status="connected" meta="12 opublikowanych postów · REST API" icon={Globe} />
              <ConnectionCard platform="Mailchimp" url="simplimo.mailchimp.com" status="error" meta="Wygasły token – odśwież połączenie" icon={Globe} />
            </div>
          </section>

          {/* AI */}
          <section>
            <h2 className="text-sm font-semibold mb-1">Klucze API</h2>
            <p className="text-xs text-muted-foreground mb-4">Połączenia z modelami AI używanymi do generowania treści.</p>
            <div className="bg-white border rounded-xl p-5 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Anthropic API Key</Label>
                <div className="flex gap-2">
                  <Input defaultValue="sk-ant-••••••••••••••••••••••••••••" type="password" className="h-9 text-sm font-mono flex-1" />
                  <Button variant="outline" size="sm" className="h-9 text-xs shrink-0">Edytuj</Button>
                </div>
                <p className="text-xs text-muted-foreground">Model: Claude 3.5 Sonnet · Używany do generowania treści</p>
              </div>
            </div>
          </section>

          {/* Danger zone */}
          <section>
            <h2 className="text-sm font-semibold text-destructive mb-1">Strefa niebezpieczna</h2>
            <p className="text-xs text-muted-foreground mb-4">Nieodwracalne operacje na koncie.</p>
            <div className="bg-white border border-destructive/20 rounded-xl p-5 flex itely-center justify-between">
              <div>
                <p className="text-sm font-medium">Usuń konto</p>
                <p className="text-xs text-muted-foreground">Trwałe usunięcie wszystkich danych i dokumentów.</p>
              </div>
              <Button variant="destructive" size="sm" className="h-8 text-xs shrink-0">Usuń konto</Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
