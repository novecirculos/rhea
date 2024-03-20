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
