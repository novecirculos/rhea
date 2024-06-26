import { z } from "zod";

export const sampleSchema = z.object({
  gender: z.enum(["Male", "Female"]),
  race: z.enum(["Human", "Elf", "Dwarf", "Halfling", "HalfElf", "Gnome"]),
});
