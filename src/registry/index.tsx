import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { RegistryEntry } from './types'

export const registry: RegistryEntry[] = [

  // ── ATOMS ─────────────────────────────────────────────

  {
    slug: 'button',
    title: 'Button',
    description: 'Klikalny element do wywolywania akcji. Obsluguje warianty wizualne, rozmiary i stan wylaczenia.',
    category: 'Atoms',
    props: [
      { name: 'variant', type: 'string', default: 'default', options: ['default','destructive','outline','secondary','ghost','link'], description: 'Wariant wizualny' },
      { name: 'size', type: 'string', default: 'default', options: ['default','sm','lg','icon'], description: 'Rozmiar przycisku' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Wylacza interakcje' },
      { name: 'asChild', type: 'boolean', default: 'false', description: 'Renderuje jako Radix Slot' },
    ],
    examples: [
      {
        title: 'Warianty',
        render: () => (
          <div className="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        ),
      },
      {
        title: 'Rozmiary',
        render: () => (
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        ),
      },
      {
        title: 'Wylaczony',
        render: () => (
          <div className="flex gap-3">
            <Button disabled>Disabled</Button>
            <Button variant="outline" disabled>Disabled outline</Button>
          </div>
        ),
      },
    ],
  },

  {
    slug: 'badge',
    title: 'Badge',
    description: 'Etykieta statusu, kategorii lub liczby. Uzywana do oznaczania stanow i tagowania tresci.',
    category: 'Atoms',
    props: [
      { name: 'variant', type: 'string', default: 'default', options: ['default','secondary','destructive','outline'], description: 'Wariant wizualny' },
    ],
    examples: [
      {
        title: 'Warianty',
        render: () => (
          <div className="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        ),
      },
    ],
  },

  {
    slug: 'separator',
    title: 'Separator',
    description: 'Pozioma lub pionowa linia oddzielajaca sekcje tresci.',
    category: 'Atoms',
    props: [
      { name: 'orientation', type: 'string', default: 'horizontal', options: ['horizontal','vertical'], description: 'Orientacja' },
      { name: 'decorative', type: 'boolean', default: 'true', description: 'Czy element ma charakter tylko dekoracyjny' },
    ],
    examples: [
      {
        title: 'Poziomy',
        render: () => (
          <div className="w-64 space-y-3">
            <p className="text-sm text-muted-foreground">Sekcja A</p>
            <Separator />
            <p className="text-sm text-muted-foreground">Sekcja B</p>
          </div>
        ),
      },
      {
        title: 'Pionowy',
        render: () => (
          <div className="flex items-center gap-4 h-8">
            <span className="text-sm">Lewo</span>
            <Separator orientation="vertical" />
            <span className="text-sm">Prawo</span>
          </div>
        ),
      },
    ],
  },

  // ── FORMS ────────────────────────────────────────────

  {
    slug: 'input',
    title: 'Input',
    description: 'Pole tekstowe do wprowadzania danych. Bazuje na natywnym input HTML z pelna dostepnoscia.',
    category: 'Forms',
    props: [
      { name: 'type', type: 'string', default: 'text', options: ['text','email','password','number','search'], description: 'Typ pola' },
      { name: 'placeholder', type: 'string', description: 'Tekst zastepczy' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Wylacza pole' },
    ],
    examples: [
      {
        title: 'Domyslny',
        render: () => <Input placeholder="Wpisz cos..." className="max-w-xs" />,
      },
      {
        title: 'Z labelka',
        render: () => (
          <div className="grid gap-1.5 max-w-xs">
            <Label htmlFor="demo-email">Adres e-mail</Label>
            <Input id="demo-email" type="email" placeholder="jan@example.com" />
          </div>
        ),
      },
      {
        title: 'Wylaczony',
        render: () => <Input disabled placeholder="Wylaczony" className="max-w-xs" />,
      },
    ],
  },

  {
    slug: 'label',
    title: 'Label',
    description: 'Etykieta powiazana z polem formularza. Obsluguje stany peer-disabled.',
    category: 'Forms',
    props: [
      { name: 'htmlFor', type: 'string', description: 'ID powiazanego elementu formularza' },
    ],
    examples: [
      {
        title: 'Podstawowy',
        render: () => (
          <div className="grid gap-1.5">
            <Label htmlFor="demo-name">Imie i nazwisko</Label>
            <Input id="demo-name" placeholder="Jan Kowalski" className="max-w-xs" />
          </div>
        ),
      },
    ],
  },

  // ── LAYOUT ───────────────────────────────────────────

  {
    slug: 'card',
    title: 'Card',
    description: 'Kontener grupujacy powiazane tresci. Zawiera subkomponenty: Header, Title, Description, Content, Footer.',
    category: 'Layout',
    props: [
      { name: 'className', type: 'string', description: 'Dodatkowe klasy CSS' },
    ],
    examples: [
      {
        title: 'Pelna karta',
        render: () => (
          <Card className="w-72">
            <CardHeader>
              <CardTitle>Tytul karty</CardTitle>
              <CardDescription>Krotki opis zawartosci sekcji.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Tu umieszczasz dowolne komponenty i tresci.
              </p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Zapisz</Button>
              <Button size="sm" variant="outline">Anuluj</Button>
            </CardFooter>
          </Card>
        ),
      },
      {
        title: 'Prosta karta',
        render: () => (
          <Card className="w-72 p-5">
            <p className="text-sm font-medium">Bez subkomponentow</p>
            <p className="text-xs text-muted-foreground mt-1">
              Mozna uzywac Card bezposrednio z className i wlasna trescia.
            </p>
          </Card>
        ),
      },
    ],
  },

]

export type { RegistryEntry } from './types'
