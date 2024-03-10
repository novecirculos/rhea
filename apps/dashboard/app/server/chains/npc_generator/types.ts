import { z } from "zod";

export interface NameRollTable {
  [race: string]: {
    [gender: string]: {
      1: {
        prefix: string;
        suffix: string;
      };
      2: {
        prefix: string;
        suffix: string;
      };
      3: {
        prefix: string;
        suffix: string;
      };
      4: {
        prefix: string;
        suffix: string;
      };
      5: {
        prefix: string;
        suffix: string;
      };
      6: {
        prefix: string;
        suffix: string;
      };
    };
  };
}

export interface NamePrefixSuffix {
  prefix: string;
  suffix: string;
}

export interface RaceGenderNames {
  Male: Record<number, NamePrefixSuffix>;
  Female: Record<number, NamePrefixSuffix>;
}

export interface NamesTable {
  Human: RaceGenderNames;
  Elf: RaceGenderNames;
  Dwarf: RaceGenderNames;
  Halfling: RaceGenderNames;
  HalfElf: RaceGenderNames;
  Gnome: RaceGenderNames;
}
export interface PersonalityAndPhysicalTraitsTable {
  [key: number]: { [column: number]: string };
}

export const tablesNameSchema = z.object({
  Human: z.object({
    Male: z.record(
      z.number().int(),
      z.object({
        prefix: z.string(),
        suffix: z.string(),
      }),
    ),
    Female: z.record(
      z.number().int(),
      z.object({
        prefix: z.string(),
        suffix: z.string(),
      }),
    ),
  }),
  Elf: z.object({
    Male: z.record(
      z.number().int(),
      z.object({
        prefix: z.string(),
        suffix: z.string(),
      }),
    ),
    Female: z.record(
      z.number().int(),
      z.object({
        prefix: z.string(),
        suffix: z.string(),
      }),
    ),
  }),
  Dwarf: z.object({
    Male: z.record(
      z.number().int(),
      z.object({
        prefix: z.string(),
        suffix: z.string(),
      }),
    ),
    Female: z.record(
      z.number().int(),
      z.object({
        prefix: z.string(),
        suffix: z.string(),
      }),
    ),
  }),
  Halfling: z.object({
    Male: z.record(
      z.number().int(),
      z.object({
        prefix: z.string(),
        suffix: z.string(),
      }),
    ),
    Female: z.record(
      z.number().int(),
      z.object({
        prefix: z.string(),
        suffix: z.string(),
      }),
    ),
  }),
  HalfElf: z.object({
    Male: z.record(
      z.number().int(),
      z.object({
        prefix: z.string(),
        suffix: z.string(),
      }),
    ),
    Female: z.record(
      z.number().int(),
      z.object({
        prefix: z.string(),
        suffix: z.string(),
      }),
    ),
  }),
  Gnome: z.object({
    Male: z.record(
      z.number().int(),
      z.object({
        prefix: z.string(),
        suffix: z.string(),
      }),
    ),
    Female: z.record(
      z.number().int(),
      z.object({
        prefix: z.string(),
        suffix: z.string(),
      }),
    ),
  }),
});
