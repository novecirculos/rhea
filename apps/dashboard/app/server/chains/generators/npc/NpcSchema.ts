import { z } from "zod";
import { NamesTable, PersonalityAndPhysicalTraitsTable } from "./NpcTypes";

export const namesTableSchema = z.object({
  gender: z.enum(["Male", "Female"]),
  race: z.enum(["Human", "Elf", "Dwarf", "Halfling", "HalfElf", "Gnome"]),
});

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

export const personalityTraitsTable: PersonalityAndPhysicalTraitsTable = {
  1: { 1: "Ajuizado", 2: "Delicado", 3: "Gentil", 4: "Obediente" },
  2: { 1: "Alerta", 2: "Desastrado", 3: "Gracioso", 4: "Objetivo" },
  3: { 1: "Amigável", 2: "Desconfiado", 3: "Grosso", 4: "Orgulhoso" },
  4: { 1: "Amoroso", 2: "Descuidado", 3: "Humilde", 4: "Otimista" },
  5: { 1: "Ansioso", 2: "Desinibido", 3: "Idealista", 4: "Ousado" },
  6: { 1: "Apressado", 2: "Disciplinado", 3: "Imprevisível", 4: "Paciente" },
  7: { 1: "Arrogante", 2: "Distraído", 3: "Indeciso", 4: "Pessimista" },
  8: { 1: "Asseado", 2: "Dramático", 3: "Indiferente", 4: "Preguiçoso" },
  9: { 1: "Assertivo", 2: "Egoísta", 3: "Intenso", 4: "Racional" },
  10: { 1: "Astuto", 2: "Elegante", 3: "Irritante", 4: "Relaxado" },
  11: { 1: "Atento", 2: "Empático", 3: "Livre", 4: "Romântico" },
  12: { 1: "Bagunceiro", 2: "Enganoso", 3: "Lunático", 4: "Rude" },
  13: { 1: "Calculista", 2: "Espirituoso", 3: "Mentiroso", 4: "Saudável" },
  14: { 1: "Calmo", 2: "Excêntrico", 3: "Medroso", 4: "Sério" },
  15: { 1: "Cáustico", 2: "Falso", 3: "Metódico", 4: "Sujo" },
  16: { 1: "Charmoso", 2: "Franco", 3: "Modesto", 4: "Teimoso" },
  17: { 1: "Complacente", 2: "Frio", 3: "Mórbido", 4: "Tenso" },
  18: { 1: "Compulsivo", 2: "Galanteador", 3: "Nervoso", 4: "Tímido" },
  19: { 1: "Crítico", 2: "Ganancioso", 3: "Niilista", 4: "Vaidoso" },
  20: { 1: "Visionário", 2: "Inovador", 3: "Sábio", 4: "Diplomático" },
};

export const physicalTraitsTable: PersonalityAndPhysicalTraitsTable = {
  1: { 1: "Alto", 2: "Careca", 3: "Maneta", 4: "Pele morena" },
  2: {
    1: "Baixo",
    2: "Careca com trança",
    3: "Marca de nascença",
    4: "Pele preta",
  },
  3: { 1: "Banguela", 2: "Cicatriz", 3: "Mecha no cabelo", 4: "Peludo" },
  4: { 1: "Barba", 2: "Corcunda", 3: "Monocelha", 4: "Perfumado" },
  5: {
    1: "Beiços grandes",
    2: "Cova no queixo",
    3: "Musculoso",
    4: "Pés grandes",
  },
  6: {
    1: "Bigodes",
    2: "Dentes podres",
    3: "Nariz aquilino",
    4: "Pescoço longo",
  },
  7: { 1: "Brincos", 2: "Dentuço", 3: "Nariz torto", 4: "Piercings" },
  8: { 1: "Cabelo branco", 2: "Escarificação", 3: "Obeso", 4: "Pintas" },
  9: { 1: "Cabelo castanho", 2: "Fanho", 3: "Olho vazado", 4: "Prognata" },
  10: { 1: "Cabelo curto", 2: "Franzino", 3: "Olhos amendoados", 4: "Rouco" },
  11: { 1: "Cabelo loiro", 2: "Gago", 3: "Olhos puxados", 4: "Sardas" },
  12: { 1: "Cabelo preto", 2: "Gordo", 3: "Olhos saltados", 4: "Seis dedos" },
  13: {
    1: "Cabelos cacheados",
    2: "Heterocromia",
    3: "Ombros largos",
    4: "Sem pescoço",
  },
  14: {
    1: "Cabelos crespos",
    2: "Jovem",
    3: "Orelhas de abano",
    4: "Tatuagem",
  },
  15: {
    1: "Cabelos grisalhos",
    2: "Lábio leporino",
    3: "Pálido",
    4: "Unhas compridas",
  },
  16: { 1: "Cabelos lisos", 2: "Lábios finos", 3: "Parrudo", 4: "Velho" },
  17: { 1: "Cabelos longos", 2: "Magro", 3: "Pé torto", 4: "Verrugas" },
  18: { 1: "Cabelos ruivos", 2: "Manco", 3: "Pele amarela", 4: "Vesgo" },
  19: { 1: "Calvo", 2: "Mandíbula quadrada", 3: "Pele branca", 4: "Vitiligo" },
  20: {
    1: "Cicatrizes de batalha",
    2: "Tatuagens tribais",
    3: "Olhos caídos",
    4: "Cabelo colorido",
  },
};

export const namesTable: NamesTable = {
  Human: {
    Male: {
      1: { prefix: "Adan", suffix: "mut" },
      2: { prefix: "Drus", suffix: "kic" },
      3: { prefix: "Ger", suffix: "old" },
      4: { prefix: "Hag", suffix: "ton" },
      5: { prefix: "Bar", suffix: "bert" },
      6: { prefix: "Wol", suffix: "van" },
    },
    Female: {
      1: { prefix: "Ag", suffix: "lian" },
      2: { prefix: "Ora", suffix: "frig" },
      3: { prefix: "Val", suffix: "allia" },
      4: { prefix: "Ja", suffix: "gahr" },
      5: { prefix: "Bertha", suffix: "line" },
      6: { prefix: "Ma", suffix: "cia" },
    },
  },
  Elf: {
    Male: {
      1: { prefix: "Ade", suffix: "ildir" },
      2: { prefix: "Fhi", suffix: "lad" },
      3: { prefix: "Dago", suffix: "ras" },
      4: { prefix: "Edra", suffix: "gor" },
      5: { prefix: "Ithi", suffix: "llas" },
      6: { prefix: "Orga", suffix: "nos" },
    },
    Female: {
      1: { prefix: "Ano", suffix: "niel" },
      2: { prefix: "Cala", suffix: "dal" },
      3: { prefix: "Era", suffix: "nrill" },
      4: { prefix: "Glora", suffix: "wend" },
      5: { prefix: "More", suffix: "dis" },
      6: { prefix: "Tana", suffix: "thil" },
    },
  },
  Dwarf: {
    Male: {
      1: { prefix: "Bar", suffix: "mir" },
      2: { prefix: "Dro", suffix: "dúk" },
      3: { prefix: "Gil", suffix: "than" },
      4: { prefix: "Kra", suffix: "mut" },
      5: { prefix: "Ruk", suffix: "goum" },
      6: { prefix: "Thur", suffix: "dain" },
    },
    Female: {
      1: { prefix: "Atk", suffix: "ilika" },
      2: { prefix: "Drav", suffix: "ugna" },
      3: { prefix: "Mith", suffix: "ielak" },
      4: { prefix: "Ruth", suffix: "anak" },
      5: { prefix: "Thov", suffix: "alia" },
      6: { prefix: "Vir", suffix: "ina" },
    },
  },
  Halfling: {
    Male: {
      1: { prefix: "Ad", suffix: "abo" },
      2: { prefix: "Dr", suffix: "odo" },
      3: { prefix: "Id", suffix: "ildo" },
      4: { prefix: "Gr", suffix: "igi" },
      5: { prefix: "Pl", suffix: "epin" },
      6: { prefix: "Tr", suffix: "uzo" },
    },
    Female: {
      1: { prefix: "Ce", suffix: "lida" },
      2: { prefix: "Fi", suffix: "bille" },
      3: { prefix: "La", suffix: "rla" },
      4: { prefix: "Mi", suffix: "tine" },
      5: { prefix: "Sa", suffix: "lne" },
      6: { prefix: "Ve", suffix: "zy" },
    },
  },
  HalfElf: {
    Male: {
      1: { prefix: "Adan", suffix: "ildir" },
      2: { prefix: "Drus", suffix: "lad" },
      3: { prefix: "Ger", suffix: "ras" },
      4: { prefix: "Hag", suffix: "gor" },
      5: { prefix: "Bar", suffix: "llas" },
      6: { prefix: "Wol", suffix: "nos" },
    },
    Female: {
      1: { prefix: "Ano", suffix: "lian" },
      2: { prefix: "Cala", suffix: "frig" },
      3: { prefix: "Era", suffix: "allia" },
      4: { prefix: "Glora", suffix: "gahr" },
      5: { prefix: "Mora", suffix: "line" },
      6: { prefix: "Tana", suffix: "cia" },
    },
  },
  Gnome: {
    Male: {
      1: { prefix: "Bur", suffix: "blop" },
      2: { prefix: "Her", suffix: "don" },
      3: { prefix: "Lak", suffix: "gell" },
      4: { prefix: "Nir", suffix: "kas" },
      5: { prefix: "See", suffix: "min" },
      6: { prefix: "Val", suffix: "puk" },
    },
    Female: {
      1: { prefix: "Ari", suffix: "ani" },
      2: { prefix: "Kia", suffix: "in" },
      3: { prefix: "Min", suffix: "ila" },
      4: { prefix: "Pad", suffix: "lia" },
      5: { prefix: "Taw", suffix: "ana" },
      6: { prefix: "Zan", suffix: "ara" },
    },
  },
};
