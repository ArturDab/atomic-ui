import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader,
  AlertDialogFooter, AlertDialogTitle, AlertDialogDescription,
  AlertDialogAction, AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter,
  DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel,
} from '@/components/ui/select'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Info, Terminal, ChevronDown } from 'lucide-react'
import type { RegistryEntry } from './types'

export const registry: RegistryEntry[] = [

  // ── ATOMS ──────────────────────────────────────────────────────────

  {
    slug: 'button',
    title: 'Button',
    description: 'Klikalny element do wywolywania akcji.',
    category: 'Atoms',
    props: [
      { name: 'variant', type: 'string', default: 'default', options: ['default','destructive','outline','secondary','ghost','link'] },
      { name: 'size', type: 'string', default: 'default', options: ['default','sm','lg','icon'] },
      { name: 'disabled', type: 'boolean', default: 'false' },
      { name: 'asChild', type: 'boolean', default: 'false' },
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
    ],
  },

  {
    slug: 'badge',
    title: 'Badge',
    description: 'Etykieta statusu, kategorii lub liczby.',
    category: 'Atoms',
    props: [
      { name: 'variant', type: 'string', default: 'default', options: ['default','secondary','destructive','outline'] },
    ],
    examples: [
      {
        title: 'Warianty',
        render: () => (
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
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
    description: 'Pozioma lub pionowa linia oddzielajaca sekcje.',
    category: 'Atoms',
    props: [
      { name: 'orientation', type: 'string', default: 'horizontal', options: ['horizontal','vertical'] },
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
    ],
  },

  {
    slug: 'avatar',
    title: 'Avatar',
    description: 'Awatar uzytkownika ze zdjeciem lub inicjalami jako fallback.',
    category: 'Atoms',
    props: [
      { name: 'src', type: 'string', description: 'URL obrazka (AvatarImage)' },
      { name: 'alt', type: 'string', description: 'Alt tekst obrazka' },
    ],
    examples: [
      {
        title: 'Ze zdjeciem i fallback',
        render: () => (
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <Avatar className="h-12 w-12">
              <AvatarFallback className="text-base">JK</AvatarFallback>
            </Avatar>
          </div>
        ),
      },
    ],
  },

  {
    slug: 'skeleton',
    title: 'Skeleton',
    description: 'Placeholder podczas ladowania tresci.',
    category: 'Atoms',
    props: [
      { name: 'className', type: 'string', description: 'Wymiary i ksztalt przez klasy CSS' },
    ],
    examples: [
      {
        title: 'Karta',
        render: () => (
          <div className="flex items-center space-x-4 w-72">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        ),
      },
    ],
  },

  {
    slug: 'alert',
    title: 'Alert',
    description: 'Komunikat informacyjny lub o bledzie.',
    category: 'Atoms',
    props: [
      { name: 'variant', type: 'string', default: 'default', options: ['default','destructive'] },
    ],
    examples: [
      {
        title: 'Warianty',
        render: () => (
          <div className="space-y-3 w-80">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Informacja</AlertTitle>
              <AlertDescription>Operacja zostala wykonana pomyslnie.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Info className="h-4 w-4" />
              <AlertTitle>Blad</AlertTitle>
              <AlertDescription>Nie mozna polaczyc z serwerem.</AlertDescription>
            </Alert>
          </div>
        ),
      },
    ],
  },

  // ── FORMS ──────────────────────────────────────────────────────────

  {
    slug: 'input',
    title: 'Input',
    description: 'Pole tekstowe do wprowadzania danych.',
    category: 'Forms',
    props: [
      { name: 'type', type: 'string', default: 'text', options: ['text','email','password','number','search'] },
      { name: 'placeholder', type: 'string' },
      { name: 'disabled', type: 'boolean', default: 'false' },
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
            <Label htmlFor="ex-email">Adres e-mail</Label>
            <Input id="ex-email" type="email" placeholder="jan@example.com" />
          </div>
        ),
      },
    ],
  },

  {
    slug: 'label',
    title: 'Label',
    description: 'Etykieta powiazana z polem formularza.',
    category: 'Forms',
    props: [{ name: 'htmlFor', type: 'string', description: 'ID powiazanego elementu' }],
    examples: [
      {
        title: 'Podstawowy',
        render: () => (
          <div className="grid gap-1.5">
            <Label htmlFor="ex-name">Imie i nazwisko</Label>
            <Input id="ex-name" placeholder="Jan Kowalski" className="max-w-xs" />
          </div>
        ),
      },
    ],
  },

  {
    slug: 'textarea',
    title: 'Textarea',
    description: 'Wieloliniowe pole tekstowe.',
    category: 'Forms',
    props: [
      { name: 'placeholder', type: 'string' },
      { name: 'disabled', type: 'boolean', default: 'false' },
      { name: 'rows', type: 'number' },
    ],
    examples: [
      {
        title: 'Domyslny',
        render: () => <Textarea placeholder="Wpisz wiadomosc..." className="max-w-xs" />,
      },
      {
        title: 'Z labelka',
        render: () => (
          <div className="grid gap-1.5 max-w-xs">
            <Label htmlFor="ex-msg">Wiadomosc</Label>
            <Textarea id="ex-msg" placeholder="Twoja wiadomosc..." rows={4} />
          </div>
        ),
      },
    ],
  },

  {
    slug: 'checkbox',
    title: 'Checkbox',
    description: 'Pole wyboru do zaznaczania opcji.',
    category: 'Forms',
    props: [
      { name: 'checked', type: 'boolean' },
      { name: 'disabled', type: 'boolean', default: 'false' },
      { name: 'onCheckedChange', type: 'function' },
    ],
    examples: [
      {
        title: 'Z labelka',
        render: () => (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="ex-terms" />
              <Label htmlFor="ex-terms">Akceptuje regulamin</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="ex-newsletter" defaultChecked />
              <Label htmlFor="ex-newsletter">Zapisz do newslettera</Label>
            </div>
            <div className="flex items-center space-x-2 opacity-50">
              <Checkbox id="ex-disabled" disabled />
              <Label htmlFor="ex-disabled">Wylaczona opcja</Label>
            </div>
          </div>
        ),
      },
    ],
  },

  {
    slug: 'radio-group',
    title: 'Radio Group',
    description: 'Grupa przyciskow radiowych – wybor jednej opcji.',
    category: 'Forms',
    props: [
      { name: 'defaultValue', type: 'string' },
      { name: 'onValueChange', type: 'function' },
    ],
    examples: [
      {
        title: 'Podstawowy',
        render: () => (
          <RadioGroup defaultValue="option-1" className="space-y-2">
            {['Opcja pierwsza', 'Opcja druga', 'Opcja trzecia'].map((label, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={`option-${i + 1}`} id={`ex-radio-${i}`} />
                <Label htmlFor={`ex-radio-${i}`}>{label}</Label>
              </div>
            ))}
          </RadioGroup>
        ),
      },
    ],
  },

  {
    slug: 'select',
    title: 'Select',
    description: 'Rozwijana lista wyboru opcji.',
    category: 'Forms',
    props: [
      { name: 'defaultValue', type: 'string' },
      { name: 'onValueChange', type: 'function' },
      { name: 'disabled', type: 'boolean', default: 'false' },
    ],
    examples: [
      {
        title: 'Domyslny',
        render: () => (
          <Select>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Wybierz opcje" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Owoce</SelectLabel>
                <SelectItem value="apple">Jablko</SelectItem>
                <SelectItem value="banana">Banan</SelectItem>
                <SelectItem value="orange">Pomarancza</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        ),
      },
    ],
  },

  {
    slug: 'switch',
    title: 'Switch',
    description: 'Przelacznik wl./wyl. do ustawien binarnych.',
    category: 'Forms',
    props: [
      { name: 'checked', type: 'boolean' },
      { name: 'onCheckedChange', type: 'function' },
      { name: 'disabled', type: 'boolean', default: 'false' },
    ],
    examples: [
      {
        title: 'Podstawowy',
        render: () => (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Switch id="ex-sw1" />
              <Label htmlFor="ex-sw1">Powiadomienia email</Label>
            </div>
            <div className="flex items-center space-x-3">
              <Switch id="ex-sw2" defaultChecked />
              <Label htmlFor="ex-sw2">Tryb ciemny</Label>
            </div>
          </div>
        ),
      },
    ],
  },

  {
    slug: 'slider',
    title: 'Slider',
    description: 'Suwak do wyboru wartosci z zakresu.',
    category: 'Forms',
    props: [
      { name: 'defaultValue', type: 'number[]' },
      { name: 'min', type: 'number', default: '0' },
      { name: 'max', type: 'number', default: '100' },
      { name: 'step', type: 'number', default: '1' },
    ],
    examples: [
      {
        title: 'Domyslny',
        render: () => <Slider defaultValue={[40]} max={100} step={1} className="w-64" />,
      },
    ],
  },

  {
    slug: 'toggle',
    title: 'Toggle',
    description: 'Przelacznik z dwoma stanami – wcisniety / niewcisniety.',
    category: 'Forms',
    props: [
      { name: 'variant', type: 'string', default: 'default', options: ['default','outline'] },
      { name: 'size', type: 'string', default: 'default', options: ['default','sm','lg'] },
      { name: 'pressed', type: 'boolean' },
    ],
    examples: [
      {
        title: 'Warianty',
        render: () => (
          <div className="flex gap-2">
            <Toggle aria-label="Bold"><Bold className="h-4 w-4" /></Toggle>
            <Toggle variant="outline" aria-label="Italic"><Italic className="h-4 w-4" /></Toggle>
            <Toggle variant="outline" defaultPressed aria-label="Underline"><Underline className="h-4 w-4" /></Toggle>
          </div>
        ),
      },
    ],
  },

  {
    slug: 'toggle-group',
    title: 'Toggle Group',
    description: 'Grupa przyciskow Toggle z wyborem pojedynczym lub wielokrotnym.',
    category: 'Forms',
    props: [
      { name: 'type', type: 'string', options: ['single','multiple'], description: 'Tryb wyboru' },
      { name: 'variant', type: 'string', default: 'default', options: ['default','outline'] },
    ],
    examples: [
      {
        title: 'Wyrownanie tekstu',
        render: () => (
          <ToggleGroup type="single" defaultValue="left" variant="outline">
            <ToggleGroupItem value="left" aria-label="Lewo"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Centrum"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Prawo"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
          </ToggleGroup>
        ),
      },
    ],
  },

  // ── FEEDBACK ───────────────────────────────────────────────────────

  {
    slug: 'accordion',
    title: 'Accordion',
    description: 'Rozwijane sekcje tresci. Obsluguje tryb pojedynczy i wielokrotny.',
    category: 'Feedback',
    props: [
      { name: 'type', type: 'string', options: ['single','multiple'], description: 'Tryb otwierania' },
      { name: 'collapsible', type: 'boolean', default: 'false' },
    ],
    examples: [
      {
        title: 'Domyslny',
        render: () => (
          <Accordion type="single" collapsible className="w-72">
            {[['Czym jest Atomic UI?', 'Centralna biblioteka komponentow React.'],
              ['Jak dodac komponent?', 'Skopiuj plik z src/components/ui/.'],
              ['Czy jest TypeScript?', 'Tak, kazdy komponent jest w pelni typowany.']
            ].map(([q, a], i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger>{q}</AccordionTrigger>
                <AccordionContent>{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ),
      },
    ],
  },

  {
    slug: 'progress',
    title: 'Progress',
    description: 'Pasek postepu operacji.',
    category: 'Feedback',
    props: [
      { name: 'value', type: 'number', description: 'Wartosc 0-100' },
    ],
    examples: [
      {
        title: 'Stany',
        render: () => (
          <div className="space-y-4 w-72">
            <Progress value={0} />
            <Progress value={33} />
            <Progress value={66} />
            <Progress value={100} />
          </div>
        ),
      },
    ],
  },

  {
    slug: 'dialog',
    title: 'Dialog',
    description: 'Modalne okno dialogowe z tlem i fokusem.',
    category: 'Feedback',
    props: [
      { name: 'open', type: 'boolean' },
      { name: 'onOpenChange', type: 'function' },
    ],
    examples: [
      {
        title: 'Podstawowy',
        render: () => (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Otworz dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Potwierdz operacje</DialogTitle>
                <DialogDescription>Czy na pewno chcesz wykonac te akcje?</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Anuluj</Button>
                <Button>Potwierdz</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ),
      },
    ],
  },

  {
    slug: 'alert-dialog',
    title: 'Alert Dialog',
    description: 'Dialog do potwierdzania destrukcyjnych akcji.',
    category: 'Feedback',
    props: [
      { name: 'open', type: 'boolean' },
      { name: 'onOpenChange', type: 'function' },
    ],
    examples: [
      {
        title: 'Usuwanie',
        render: () => (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Usun konto</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Czy jestes pewny?</AlertDialogTitle>
                <AlertDialogDescription>
                  Tej akcji nie mozna cofnac. Konto zostanie trwale usuniete.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Anuluj</AlertDialogCancel>
                <AlertDialogAction>Usun</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ),
      },
    ],
  },

  {
    slug: 'tooltip',
    title: 'Tooltip',
    description: 'Krotki opis pojawiajacy sie po najechaniu kursorem.',
    category: 'Feedback',
    props: [
      { name: 'delayDuration', type: 'number', default: '700' },
    ],
    examples: [
      {
        title: 'Podstawowy',
        render: () => (
          <TooltipProvider>
            <div className="flex gap-4">
              {['Lewo', 'Centrum', 'Prawo'].map(label => (
                <Tooltip key={label}>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">{label}</Button>
                  </TooltipTrigger>
                  <TooltipContent><p>Tooltip dla: {label}</p></TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
        ),
      },
    ],
  },

  {
    slug: 'hover-card',
    title: 'Hover Card',
    description: 'Karta z informacjami pojawiajaca sie po najechaniu.',
    category: 'Feedback',
    props: [
      { name: 'openDelay', type: 'number', default: '700' },
      { name: 'closeDelay', type: 'number', default: '300' },
    ],
    examples: [
      {
        title: 'Podstawowy',
        render: () => (
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@arturdab</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-64">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">Artur Dab</p>
                  <p className="text-xs text-muted-foreground">AI &amp; Marketing Consultant</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        ),
      },
    ],
  },

  {
    slug: 'popover',
    title: 'Popover',
    description: 'Pływajacy kontener do dodatkowych akcji lub tresci.',
    category: 'Feedback',
    props: [
      { name: 'open', type: 'boolean' },
      { name: 'onOpenChange', type: 'function' },
    ],
    examples: [
      {
        title: 'Domyslny',
        render: () => (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Otworz popover</Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-2">
                <p className="text-sm font-medium">Ustawienia</p>
                <div className="flex items-center justify-between">
                  <Label htmlFor="ex-pop-sw" className="text-sm">Powiadomienia</Label>
                  <Switch id="ex-pop-sw" />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        ),
      },
    ],
  },

  // ── NAVIGATION ─────────────────────────────────────────────────────

  {
    slug: 'dropdown-menu',
    title: 'Dropdown Menu',
    description: 'Menu kontekstowe z lista opcji.',
    category: 'Navigation',
    props: [
      { name: 'open', type: 'boolean' },
      { name: 'onOpenChange', type: 'function' },
    ],
    examples: [
      {
        title: 'Podstawowe',
        render: () => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Opcje <ChevronDown className="ml-2 h-4 w-4" /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>Konto</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil</DropdownMenuItem>
              <DropdownMenuItem>Ustawienia</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Wyloguj</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
  },

  {
    slug: 'collapsible',
    title: 'Collapsible',
    description: 'Prosta sekcja rozwijana bez animacji akordeonowej.',
    category: 'Navigation',
    props: [
      { name: 'open', type: 'boolean' },
      { name: 'onOpenChange', type: 'function' },
      { name: 'defaultOpen', type: 'boolean', default: 'false' },
    ],
    examples: [
      {
        title: 'Podstawowy',
        render: () => {
          const [open, setOpen] = useState(false)
          return (
            <Collapsible open={open} onOpenChange={setOpen} className="w-64 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Lista plikow</p>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <div className="rounded-md border px-3 py-2 text-sm">index.tsx</div>
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-3 py-2 text-sm">utils.ts</div>
                <div className="rounded-md border px-3 py-2 text-sm">types.ts</div>
              </CollapsibleContent>
            </Collapsible>
          )
        },
      },
    ],
  },

  {
    slug: 'sheet',
    title: 'Sheet',
    description: 'Panel wysuwany z krawedzi ekranu (drawer).',
    category: 'Navigation',
    props: [
      { name: 'side', type: 'string', default: 'right', options: ['top','right','bottom','left'] },
    ],
    examples: [
      {
        title: 'Prawa strona',
        render: () => (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Otworz panel</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Ustawienia</SheetTitle>
                <SheetDescription>Skonfiguruj swoje preferencje.</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Powiadomienia</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Marketing</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ),
      },
    ],
  },

  // ── LAYOUT ─────────────────────────────────────────────────────────

  {
    slug: 'card',
    title: 'Card',
    description: 'Kontener grupujacy powiazane tresci.',
    category: 'Layout',
    props: [
      { name: 'className', type: 'string' },
    ],
    examples: [
      {
        title: 'Pelna karta',
        render: () => (
          <Card className="w-72">
            <CardHeader>
              <CardTitle>Tytul karty</CardTitle>
              <CardDescription>Krotki opis zawartosci.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Tu umieszczasz dowolne komponenty.</p>
            </CardContent>
            <CardFooter className="gap-2">
              <Button size="sm">Zapisz</Button>
              <Button size="sm" variant="outline">Anuluj</Button>
            </CardFooter>
          </Card>
        ),
      },
    ],
  },

  {
    slug: 'table',
    title: 'Table',
    description: 'Tabela danych z naglowkami i wierszami.',
    category: 'Layout',
    props: [],
    examples: [
      {
        title: 'Podstawowa',
        render: () => (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nazwa</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Kwota</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[['Faktura #001', 'Oplacona', '1 200 zl'],
                ['Faktura #002', 'Oczekujaca', '850 zl'],
                ['Faktura #003', 'Anulowana', '320 zl']].map(([name, status, amount]) => (
                <TableRow key={name}>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell>{status}</TableCell>
                  <TableCell className="text-right">{amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ),
      },
    ],
  },

  {
    slug: 'scroll-area',
    title: 'Scroll Area',
    description: 'Obszar przewijania ze stylizowanym scrollbarem.',
    category: 'Layout',
    props: [
      { name: 'className', type: 'string', description: 'Wymiary kontenera' },
    ],
    examples: [
      {
        title: 'Lista',
        render: () => (
          <ScrollArea className="h-40 w-48 rounded-md border p-3">
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="py-1 text-sm border-b last:border-0">
                Element {i + 1}
              </div>
            ))}
          </ScrollArea>
        ),
      },
    ],
  },

]

export type { RegistryEntry } from './types'
