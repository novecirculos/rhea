import { FaunaRef } from "@/lib/types";

export interface FaunaScene {
  ref: FaunaRef;
  data: Scene;
}

export interface Scene {
  id: number;
  title: string;
  characters: string[];
  location: string;
  objects: string[];
  categories: string[];
  events: Event[];
  content: string;
}

export interface Event {
  name: string;
  title: string;
  description: string;
}
