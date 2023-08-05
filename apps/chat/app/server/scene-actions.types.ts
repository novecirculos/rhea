export interface Scene {
  title: string
  characters: string[]
  location: string
  objects: string[]
  categories: string[]
  events: Event[]
  content: string
}

export interface Event {
  name: string
  description: string
}
