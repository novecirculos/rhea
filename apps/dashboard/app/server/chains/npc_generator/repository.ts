import { namesTable } from "./data";
import { NamesTable, RaceGenderNames } from "./types";

export function getNameByRaceAndGender(
  race: keyof NamesTable,
  gender: keyof RaceGenderNames,
  rollPreffix: number,
  rollSuffix: number,
): string {
  const { prefix } = namesTable[race][gender][rollPreffix];
  const { suffix } = namesTable[race][gender][rollSuffix];

  if (!prefix || !suffix) {
    throw new Error("Name entry not found");
  }
  return `${prefix}${suffix}`;
}
