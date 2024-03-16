
import { z } from "zod";

export const TheobaldSchema = z.object({
  gender: z.enum(["Male", "Female"]),
  race: z.enum(["Human", "Elf", "Dwarf", "Halfling", "HalfElf", "Gnome"]),
});
