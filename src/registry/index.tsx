import { sources } from './sources'
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { BarChart as RechartBar, Bar, CartesianGrid, XAxis } from 'recharts'
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from '@/components/ui/drawer'
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { useForm as useFormHook } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { Date as DateType } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from '@/components/ui/alert-dialog'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Checkbox } from '@/components/ui/checkbox'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@/components/ui/command'
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator } from '@/components/ui/context-menu'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from '@/components/ui/menubar'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis } from '@/components/ui/pagination'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from '@/components/ui/select'
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'
import { Textarea } from '@/components/ui/textarea'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { toast } from '@/hooks/use-toast'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Info, Terminal, ChevronDown, File, Settings, User } from 'lucide-react'
import type { RegistryEntry } from './types'

const _base: RegistryEntry[] = [

  // ── ATOMS ──────────────────────────────────────────────────────────

  {
    slug: 'button',
    title: 'Button',
    description: 'Klikalny element do wywoływania akcji. Obsługuje warianty wizualne, rozmiary i stan wyłączenia.',
    category: 'Atoms',
    props: [
      { name: 'variant', type: 'string', default: 'default', options: ['default','destructive','outline','secondary','ghost','link'], description: 'Wariant wizualny' },
      { name: 'size', type: 'string', default: 'default', options: ['default','sm','lg','icon'], description: 'Rozmiar przycisku' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Wyłącza interakcję' },
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
        title: 'Wyłączony',
        render: () => (
          <div className="flex gap-3">
            <Button disabled>Wyłączony</Button>
            <Button variant="outline" disabled>Wyłączony outline</Button>
          </div>
        ),
      },
    ],
  },

  {
    slug: 'badge',
    title: 'Badge',
    description: 'Etykieta statusu, kategorii lub liczby. Używana do oznaczania stanów i tagowania treści.',
    category: 'Atoms',
    props: [
      { name: 'variant', type: 'string', default: 'default', options: ['default','secondary','destructive','outline'], description: 'Wariant wizualny' },
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
    description: 'Pozioma lub pionowa linia oddzielająca sekcje treści.',
    category: 'Atoms',
    props: [
      { name: 'orientation', type: 'string', default: 'horizontal', options: ['horizontal','vertical'], description: 'Orientacja' },
      { name: 'decorative', type: 'boolean', default: 'true', description: 'Czy element ma charakter dekoracyjny' },
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

  {
    slug: 'avatar',
    title: 'Avatar',
    description: 'Awatar użytkownika ze zdjęciem lub inicjałami jako fallback.',
    category: 'Atoms',
    props: [
      { name: 'src', type: 'string', description: 'URL obrazka (AvatarImage)' },
      { name: 'alt', type: 'string', description: 'Alt tekst obrazka' },
    ],
    examples: [
      {
        title: 'Ze zdjęciem i fallback',
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
    description: 'Placeholder podczas ładowania treści.',
    category: 'Atoms',
    props: [{ name: 'className', type: 'string', description: 'Wymiary i kształt przez klasy CSS' }],
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
    description: 'Komunikat informacyjny lub o błędzie.',
    category: 'Atoms',
    props: [
      { name: 'variant', type: 'string', default: 'default', options: ['default','destructive'], description: 'Wariant wizualny' },
    ],
    examples: [
      {
        title: 'Warianty',
        render: () => (
          <div className="space-y-3 w-80">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Informacja</AlertTitle>
              <AlertDescription>Operacja została wykonana pomyślnie.</AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <Info className="h-4 w-4" />
              <AlertTitle>Błąd</AlertTitle>
              <AlertDescription>Nie można połączyć z serwerem.</AlertDescription>
            </Alert>
          </div>
        ),
      },
    ],
  },

  {
    slug: 'aspect-ratio',
    title: 'Aspect Ratio',
    description: 'Kontener wymuszający określony stosunek szerokości do wysokości.',
    category: 'Atoms',
    props: [{ name: 'ratio', type: 'number', default: '1', description: 'Stosunek szerokość/wysokość (np. 16/9)' }],
    examples: [
      {
        title: '16/9',
        render: () => (
          <div className="w-72">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
              <div className="flex items-center justify-center h-full text-sm text-muted-foreground">16 / 9</div>
            </AspectRatio>
          </div>
        ),
      },
    ],
  },

  // ── FORMS ──────────────────────────────────────────────────────────

  {
    slug: 'input',
    title: 'Input',
    description: 'Pole tekstowe do wprowadzania danych. Bazuje na natywnym input HTML.',
    category: 'Forms',
    props: [
      { name: 'type', type: 'string', default: 'text', options: ['text','email','password','number','search'] },
      { name: 'placeholder', type: 'string' },
      { name: 'disabled', type: 'boolean', default: 'false' },
    ],
    examples: [
      {
        title: 'Domyślny',
        render: () => <Input placeholder="Wpisz coś..." className="max-w-xs" />,
      },
      {
        title: 'Z labelką',
        render: () => (
          <div className="grid gap-1.5 max-w-xs">
            <Label htmlFor="ex-email">Adres e-mail</Label>
            <Input id="ex-email" type="email" placeholder="jan@example.com" />
          </div>
        ),
      },
      {
        title: 'Wyłączony',
        render: () => <Input disabled placeholder="Wyłączony" className="max-w-xs" />,
      },
    ],
  },

  {
    slug: 'label',
    title: 'Label',
    description: 'Etykieta powiązana z polem formularza. Obsługuje stany peer-disabled.',
    category: 'Forms',
    props: [{ name: 'htmlFor', type: 'string', description: 'ID powiązanego elementu' }],
    examples: [
      {
        title: 'Podstawowy',
        render: () => (
          <div className="grid gap-1.5">
            <Label htmlFor="ex-name">Imię i nazwisko</Label>
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
        title: 'Domyślny',
        render: () => <Textarea placeholder="Wpisz wiadomość..." className="max-w-xs" />,
      },
      {
        title: 'Z labelką',
        render: () => (
          <div className="grid gap-1.5 max-w-xs">
            <Label htmlFor="ex-msg">Wiadomość</Label>
            <Textarea id="ex-msg" placeholder="Twoja wiadomość..." rows={4} />
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
        title: 'Z labelką',
        render: () => (
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="ex-terms" />
              <Label htmlFor="ex-terms">Akceptuję regulamin</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="ex-newsletter" defaultChecked />
              <Label htmlFor="ex-newsletter">Zapisz do newslettera</Label>
            </div>
            <div className="flex items-center space-x-2 opacity-50">
              <Checkbox id="ex-disabled" disabled />
              <Label htmlFor="ex-disabled">Wyłączona opcja</Label>
            </div>
          </div>
        ),
      },
    ],
  },

  {
    slug: 'radio-group',
    title: 'Radio Group',
    description: 'Grupa przycisków radiowych – wybór jednej opcji.',
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
        title: 'Domyślny',
        render: () => (
          <Select>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Wybierz opcję" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Owoce</SelectLabel>
                <SelectItem value="apple">Jabłko</SelectItem>
                <SelectItem value="banana">Banan</SelectItem>
                <SelectItem value="orange">Pomarańcza</SelectItem>
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
    description: 'Przełącznik wł./wył. do ustawień binarnych.',
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
    description: 'Suwak do wyboru wartości z zakresu.',
    category: 'Forms',
    props: [
      { name: 'defaultValue', type: 'number[]' },
      { name: 'min', type: 'number', default: '0' },
      { name: 'max', type: 'number', default: '100' },
      { name: 'step', type: 'number', default: '1' },
    ],
    examples: [
      {
        title: 'Domyślny',
        render: () => <Slider defaultValue={[40]} max={100} step={1} className="w-64" />,
      },
    ],
  },

  {
    slug: 'toggle',
    title: 'Toggle',
    description: 'Przełącznik z dwoma stanami – wciśnięty / niewciśnięty.',
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
    description: 'Grupa przycisków Toggle z wyborem pojedynczym lub wielokrotnym.',
    category: 'Forms',
    props: [
      { name: 'type', type: 'string', options: ['single','multiple'], description: 'Tryb wyboru' },
      { name: 'variant', type: 'string', default: 'default', options: ['default','outline'] },
    ],
    examples: [
      {
        title: 'Wyrównanie tekstu',
        render: () => (
          <ToggleGroup type="single" defaultValue="left" variant="outline">
            <ToggleGroupItem value="left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
            <ToggleGroupItem value="right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
          </ToggleGroup>
        ),
      },
    ],
  },

  // ── FEEDBACK ───────────────────────────────────────────────────────

  {
    slug: 'accordion',
    title: 'Accordion',
    description: 'Rozwijane sekcje treści. Obsługuje tryb pojedynczy i wielokrotny.',
    category: 'Feedback',
    props: [
      { name: 'type', type: 'string', options: ['single','multiple'], description: 'Tryb otwierania' },
      { name: 'collapsible', type: 'boolean', default: 'false' },
    ],
    examples: [
      {
        title: 'Domyślny',
        render: () => (
          <Accordion type="single" collapsible className="w-72">
            {[
              ['Czym jest Atomic UI?', 'Centralna biblioteka komponentów React.'],
              ['Jak dodać komponent?', 'Skopiuj plik z src/components/ui/.'],
              ['Czy jest TypeScript?', 'Tak, każdy komponent jest w pełni typowany.']
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
    description: 'Pasek postępu operacji.',
    category: 'Feedback',
    props: [{ name: 'value', type: 'number', description: 'Wartość 0-100' }],
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
    description: 'Modalne okno dialogowe z tłem i focusem.',
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
              <Button variant="outline">Otwórz dialog</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Potwierdź operację</DialogTitle>
                <DialogDescription>Czy na pewno chcesz wykonać tę akcję?</DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Anuluj</Button>
                <Button>Potwierdź</Button>
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
              <Button variant="destructive">Usuń konto</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Czy jesteś pewny?</AlertDialogTitle>
                <AlertDialogDescription>Tej akcji nie można cofnąć. Konto zostanie trwale usunięte.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Anuluj</AlertDialogCancel>
                <AlertDialogAction>Usuń</AlertDialogAction>
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
    description: 'Krótki opis pojawiający się po najechaniu kursorem.',
    category: 'Feedback',
    props: [{ name: 'delayDuration', type: 'number', default: '700' }],
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
                  <TooltipContent><p>Tooltip: {label}</p></TooltipContent>
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
    description: 'Karta z informacjami pojawiająca się po najechaniu.',
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
                <Avatar><AvatarFallback>AD</AvatarFallback></Avatar>
                <div>
                  <p className="text-sm font-semibold">Artur Dąb</p>
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
    description: 'Pływający kontener do dodatkowych akcji lub treści.',
    category: 'Feedback',
    props: [
      { name: 'open', type: 'boolean' },
      { name: 'onOpenChange', type: 'function' },
    ],
    examples: [
      {
        title: 'Domyślny',
        render: () => (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">Otwórz popover</Button>
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

  {
    slug: 'toast',
    title: 'Toast',
    description: 'Krótkotrwałe powiadomienie wyświetlane w rogu ekranu.',
    category: 'Feedback',
    props: [
      { name: 'variant', type: 'string', default: 'default', options: ['default','destructive'] },
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
    ],
    examples: [
      {
        title: 'Warianty',
        render: () => {
          const handleDefault = () => toast({ title: 'Sukces', description: 'Operacja zakończona pomyślnie.' })
          const handleDestructive = () => toast({ variant: 'destructive', title: 'Błąd', description: 'Coś poszło nie tak.' })
          return (
            <div className="flex gap-3">
              <Button variant="outline" onClick={handleDefault}>Pokaż toast</Button>
              <Button variant="destructive" onClick={handleDestructive}>Błąd</Button>
            </div>
          )
        },
      },
    ],
  },

  // ── NAVIGATION ─────────────────────────────────────────────────────

  {
    slug: 'dropdown-menu',
    title: 'Dropdown Menu',
    description: 'Menu kontekstowe z listą opcji.',
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
              <DropdownMenuItem><User className="mr-2 h-4 w-4" />Profil</DropdownMenuItem>
              <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Ustawienia</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Wyloguj</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
  },

  {
    slug: 'context-menu',
    title: 'Context Menu',
    description: 'Menu kontekstowe otwierane prawym przyciskiem myszy.',
    category: 'Navigation',
    props: [],
    examples: [
      {
        title: 'Kliknij prawym przyciskiem',
        render: () => (
          <ContextMenu>
            <ContextMenuTrigger className="flex items-center justify-center w-64 h-24 rounded-lg border-2 border-dashed text-sm text-muted-foreground">
              Kliknij prawym przyciskiem
            </ContextMenuTrigger>
            <ContextMenuContent className="w-48">
              <ContextMenuLabel>Akcje</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuItem><File className="mr-2 h-4 w-4" />Nowy plik</ContextMenuItem>
              <ContextMenuItem><Settings className="mr-2 h-4 w-4" />Właściwości</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem className="text-destructive">Usuń</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ),
      },
    ],
  },

  {
    slug: 'menubar',
    title: 'Menubar',
    description: 'Pasek menu aplikacji z zagnieżdżonymi podmenu.',
    category: 'Navigation',
    props: [],
    examples: [
      {
        title: 'Podstawowy',
        render: () => (
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>Plik</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Nowy <span className="ml-auto text-xs text-muted-foreground">⌘N</span></MenubarItem>
                <MenubarItem>Otwórz</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Zapisz <span className="ml-auto text-xs text-muted-foreground">⌘S</span></MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Edycja</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Cofnij <span className="ml-auto text-xs text-muted-foreground">⌘Z</span></MenubarItem>
                <MenubarItem>Ponów <span className="ml-auto text-xs text-muted-foreground">⌘Y</span></MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Kopiuj</MenubarItem>
                <MenubarItem>Wklej</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>Widok</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Pełny ekran</MenubarItem>
                <MenubarItem>Powiększ</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        ),
      },
    ],
  },

  {
    slug: 'navigation-menu',
    title: 'Navigation Menu',
    description: 'Rozbudowane menu nawigacyjne z panelami treści.',
    category: 'Navigation',
    props: [],
    examples: [
      {
        title: 'Podstawowe',
        render: () => (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Komponenty</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 p-4 w-48">
                    {['Button', 'Input', 'Card', 'Dialog'].map(name => (
                      <li key={name}>
                        <NavigationMenuLink className={navigationMenuTriggerStyle() + " w-full justify-start h-auto py-2 px-3"}>
                          {name}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Dokumentacja
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ),
      },
    ],
  },

  {
    slug: 'breadcrumb',
    title: 'Breadcrumb',
    description: 'Nawigacja okruszkowa pokazująca ścieżkę do bieżącej strony.',
    category: 'Navigation',
    props: [],
    examples: [
      {
        title: 'Podstawowy',
        render: () => (
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Strona główna</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Komponenty</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ),
      },
    ],
  },

  {
    slug: 'pagination',
    title: 'Pagination',
    description: 'Nawigacja stronicowania z przyciskami poprzednia/następna.',
    category: 'Navigation',
    props: [],
    examples: [
      {
        title: 'Podstawowa',
        render: () => (
          <Pagination>
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
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
                <p className="text-sm font-medium">Lista plików</p>
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
    slug: 'command',
    title: 'Command',
    description: 'Pole wyszukiwania z listą poleceń – baza dla command palette.',
    category: 'Navigation',
    props: [],
    examples: [
      {
        title: 'Wbudowane',
        render: () => (
          <div className="border rounded-lg overflow-hidden w-72">
            <Command>
              <CommandInput placeholder="Wyszukaj..." />
              <CommandList>
                <CommandEmpty>Brak wyników.</CommandEmpty>
                <CommandGroup heading="Sugestie">
                  <CommandItem><User className="mr-2 h-4 w-4" />Profil</CommandItem>
                  <CommandItem><Settings className="mr-2 h-4 w-4" />Ustawienia</CommandItem>
                  <CommandItem><File className="mr-2 h-4 w-4" />Nowy plik</CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Ostatnie">
                  <CommandItem>Dokument 1</CommandItem>
                  <CommandItem>Dokument 2</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        ),
      },
    ],
  },

  {
    slug: 'sheet',
    title: 'Sheet',
    description: 'Panel wysuwany z krawędzi ekranu (drawer).',
    category: 'Navigation',
    props: [{ name: 'side', type: 'string', default: 'right', options: ['top','right','bottom','left'] }],
    examples: [
      {
        title: 'Prawa strona',
        render: () => (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">Otwórz panel</Button>
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
    description: 'Kontener grupujący powiązane treści.',
    category: 'Layout',
    props: [{ name: 'className', type: 'string' }],
    examples: [
      {
        title: 'Pełna karta',
        render: () => (
          <Card className="w-72">
            <CardHeader>
              <CardTitle>Tytuł karty</CardTitle>
              <CardDescription>Krótki opis zawartości.</CardDescription>
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
    description: 'Tabela danych z nagłówkami i wierszami.',
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
              {[['Faktura #001', 'Opłacona', '1 200 zł'],
                ['Faktura #002', 'Oczekująca', '850 zł'],
                ['Faktura #003', 'Anulowana', '320 zł']].map(([name, status, amount]) => (
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
    props: [{ name: 'className', type: 'string', description: 'Wymiary kontenera' }],
    examples: [
      {
        title: 'Lista',
        render: () => (
          <ScrollArea className="h-40 w-48 rounded-md border p-3">
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} className="py-1 text-sm border-b last:border-0">Element {i + 1}</div>
            ))}
          </ScrollArea>
        ),
      },
    ],
  },

]

  // ── BLOCKS ─────────────────────────────────────────────────────────

  {
    slug: 'calendar',
    title: 'Calendar',
    description: 'Picker daty oparty na react-day-picker. Obsługuje tryb single, range i multiple.',
    category: 'Forms',
    props: [
      { name: 'mode', type: 'string', default: 'single', options: ['single','range','multiple'] },
      { name: 'selected', type: 'Date | DateRange | Date[]' },
      { name: 'onSelect', type: 'function' },
      { name: 'disabled', type: 'Matcher | Matcher[]' },
    ],
    examples: [
      {
        title: 'Pojedyncza data',
        render: () => {
          const [date, setDate] = useState<Date | undefined>(new Date())
          return <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
        },
      },
    ],
  },

  {
    slug: 'carousel',
    title: 'Carousel',
    description: 'Karuzela slajdów oparta na Embla Carousel. Obsługuje touch, drag i accessibility.',
    category: 'Layout',
    props: [
      { name: 'opts', type: 'CarouselOptions', description: 'Opcje Embla (loop, align, itp.)' },
      { name: 'orientation', type: 'string', default: 'horizontal', options: ['horizontal','vertical'] },
    ],
    examples: [
      {
        title: 'Podstawowa',
        render: () => (
          <Carousel className="w-64">
            <CarouselContent>
              {Array.from({ length: 5 }, (_, i) => (
                <CarouselItem key={i}>
                  <div className="flex items-center justify-center h-32 bg-muted rounded-lg text-2xl font-bold text-muted-foreground">
                    {i + 1}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ),
      },
    ],
  },

  {
    slug: 'chart',
    title: 'Chart',
    description: 'Wrapper Recharts z kontekstem konfiguracji, tooltipem i legendą.',
    category: 'Blocks',
    props: [
      { name: 'config', type: 'ChartConfig', description: 'Mapowanie kluczy na kolory i etykiety' },
    ],
    examples: [
      {
        title: 'Bar Chart',
        render: () => {
          const data = [
            { month: 'Sty', value: 186 },
            { month: 'Lut', value: 305 },
            { month: 'Mar', value: 237 },
            { month: 'Kwi', value: 73 },
            { month: 'Maj', value: 209 },
            { month: 'Cze', value: 214 },
          ]
          const config = { value: { label: 'Wartość', color: 'hsl(var(--primary))' } }
          return (
            <ChartContainer config={config} className="h-48 w-72">
              <RechartBar data={data} margin={{ left: 0, right: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={4} />
              </RechartBar>
            </ChartContainer>
          )
        },
      },
    ],
  },

  {
    slug: 'drawer',
    title: 'Drawer',
    description: 'Panel wysuwany z dołu ekranu oparty na Vaul. Obsługuje drag-to-close.',
    category: 'Navigation',
    props: [
      { name: 'shouldScaleBackground', type: 'boolean', default: 'true' },
    ],
    examples: [
      {
        title: 'Z dołu',
        render: () => (
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Otwórz Drawer</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Edytuj profil</DrawerTitle>
                <DrawerDescription>Przeciągnij w dół, aby zamknąć.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 space-y-3">
                <Label>Imię</Label>
                <Input placeholder="Jan Kowalski" />
              </div>
              <DrawerFooter>
                <Button>Zapisz</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Anuluj</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ),
      },
    ],
  },

  {
    slug: 'form',
    title: 'Form',
    description: 'Wrapper react-hook-form z kontekstem walidacji, labelkami i komunikatami błędów.',
    category: 'Forms',
    props: [
      { name: 'control', type: 'Control<TFieldValues>', description: 'Kontroler z useForm()' },
      { name: 'name', type: 'string', description: 'Nazwa pola z schematu' },
    ],
    examples: [
      {
        title: 'Z walidacją Zod',
        render: () => {
          const form = useFormHook({ resolver: zodResolver(z.object({ email: z.string().email('Nieprawidłowy email') })), defaultValues: { email: '' } })
          return (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(() => {})} className="space-y-4 w-72">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input placeholder="jan@example.com" {...field} /></FormControl>
                      <FormDescription>Twój służbowy adres email.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Wyślij</Button>
              </form>
            </Form>
          )
        },
      },
    ],
  },

]

export const registry = _base.map(e => ({ ...e, source: sources[e.slug] }))
export type { RegistryEntry } from './types'
