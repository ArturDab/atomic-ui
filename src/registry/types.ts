import type { ComponentType } from 'react'

export interface PropDef {
  name: string
  type: string
  default?: string
  description?: string
  options?: string[]
}

export interface ComponentExample {
  title: string
  description?: string
  render: ComponentType
}

export interface RegistryEntry {
  slug: string
  title: string
  description: string
  category: 'Atoms' | 'Forms' | 'Feedback' | 'Navigation' | 'Layout' | 'Blocks'
  props: PropDef[]
  examples: ComponentExample[]
}
