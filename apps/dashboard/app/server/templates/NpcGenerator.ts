import { z } from "zod";

export const StreamingModelTemplate = `
Seu objetivo é criar personagens, baseado no universo de fantasia nove círculos.

Abaixo você encontrará informações sobre a criação de personagens, tabelas para selecionar nomes, personalidades e características físicas.
Você irá receber a rolagem dos dados, para cada característica, e as tabelas para selecionar nomes, personalidades e características físicas. Você deve atribuir o correto valor baseado no dado que foi rolado.
Em sua resposta, devolva o personagem com as informações soliticadas e SEMPRE mostre as rolagens criadas a partir das tabelas. Gere o histórico por rumores por conta própria baseado nas caracteristicas anteriores.

<npc_name>
{npc_name}
</npc_name>

<dice_rolls>
Personalidade
Coluna (1d4): {personalityColumn1}
Caracteristica (1d20): {personalityRoll1}

Coluna (1d4): {personalityColumn2}
Caracteristica (1d20): {personalityRoll2}

Coluna (1d4): {personalityColumn3}
Caracteristica (1d20): {personalityRoll3}

Caracteristica física
Coluna (1d4): {physicalColumn1}
Caracteristica (1d20): {physicalRoll1}

Coluna (1d4): {physicalColumn2}
Caracteristica (1d20): {physicalRoll2}

Coluna (1d4): {physicalColumn3}
Caracteristica (1d20): {physicalRoll3}

</dice_rolls>

# Criação de personagem

Vamos falar de características secundárias que não possuem valores numéricos, mas são imprescindíveis para um personagem se tornar inesquecível, repleto de histórias e ganchos. 

Além disso, trazemos tabelas e outras informações para sorteio de nome, habilidades físicas e suas personalidades. 

Determinar como seu personagem é ou como ele se comporta é uma das coisas mais legais na hora de criar um personagem.

## Nome 

*OBS: jogue 1d6 na tabela apropriada para sua raça e sexo determinando o prefixo e o sufixo do nome. Caso seja necessário um sobrenome, realize o mesmo processo.*

## Personalidade 
Depois do alinhamento é preciso determinar sua personalidade. Como ele age? Quais suas opiniões sobre assuntos chaves do seu cenário (uso de venenos, escravidão/servidão)?

Como ele fala, anda, se veste? É mão aberta ou guarda cada peça de cobre como se fosse a última? O que faz ao voltar de uma masmorra? 

Todas estas perguntas darão cor ao seu personagem. Elencamos alguns traços de personalidade na tabela 4.2 para facilitar sua escolha. Recomendamos sortear ou escolher entre 2 ou 3 características, sempre de colunas diferentes, para construir uma personalidade rica para o seu personagem.

## Personalidade de Personagem
### TABELA 4.2

| 1d20 | COLUNA 1 | COLUNA 2 | COLUNA 3 | COLUNA 4 |
|--|--|--|--|--|
| 1 | Ajuizado | Delicado | Gentil | Obediente |
| 2 | Alerta | Desastrado | Gracioso | Objetivo |
| 3 | Amigável | Desconfiado | Grosso | Orgulhoso |
| 4 | Amoroso | Descuidado | Humilde | Otimista |
| 5 | Ansioso | Desinibido | Idealista | Ousado |
| 6 | Apressado | Disciplinado | Imprevisível | Paciente |
| 7 | Arrogante | Distraído | Indeciso | Pessimista |
| 8 | Asseado | Dramático | Indiferente | Preguiçoso |
| 9 | Assertivo | Egoísta | Intenso | Racional |
| 10 | Astuto | Elegante | Irritante | Relaxado |
| 11 | Atento | Empático | Livre | Romântico |
| 12 | Bagunceiro | Enganoso | Lunático | Rude |
| 13 | Calculista | Espirituoso | Mentiroso | Saudável |
| 14 | Calmo | Excêntrico | Medroso | Sério |
| 15 | Cáustico | Falso | Metódico | Sujo |
| 16 | Charmoso | Franco | Modesto | Teimoso |
| 17 | Complacente | Frio | Mórbido | Tenso |
| 18 | Compulsivo | Galanteador | Nervoso | Tímido |
| 19 | Crítico | Ganancioso | Niilista | Vaidoso |
| 20 | Jogue mais duas vezes | Jogue mais duas vezes | Jogue mais duas vezes | Jogue mais duas vezes |

*OBS: jogue 1d4 para determinar a coluna e 1d20 para sortear a característica física do personagem. Caso caia mais de uma vez na mesma coluna role novamente para não obter resultados conflitantes.*

## Características Físicas
São ótimas para personalizar seu personagem, dar-lhe cor e traços únicos. Sorteie quantas características físicas desejar da tabela 4.3 para compor a aparência física do seu personagem. Recomendamos algo entre 2 ou 3 características, sempre de colunas diferentes, para um personagem suficientemente detalhado.

## Característica Física de Personagem
### TABELA 4.3
| 1d20 | COLUNA 1 | COLUNA 2 | COLUNA 3 | COLUNA 4 |
|--|--|--|--|--|
| 1 | Alto | Careca | Maneta | Pele morena |
| 2 | Baixo | Careca com trança | Marca de nascença | Pele preta |
| 3 | Banguela | Cicatriz | Mecha no cabelo | Peludo |
| 4 | Barba | Corcunda | Monocelha | Perfumado |
| 5 | Beiços grandes | Cova no queixo | Musculoso | Pés grandes |
| 6 | Bigodes | Dentes podres | Nariz aquilino | Pescoço longo |
| 7 | Brincos | Dentuço | Nariz torto | Piercings |
| 8 | Cabelo branco | Escarificação | Obeso | Pintas |
| 9 | Cabelo castanho | Fanho | Olho vazado | Prognata |
| 10 | Cabelo curto | Franzino | Olhos amendoados | Rouco |
| 11 | Cabelo loiro | Gago | Olhos puxados | Sardas |
| 12 | Cabelo preto | Gordo | Olhos saltados | Seis dedos |
| 13 | Cabelos cacheados | Heterocromia | Ombros largos | Sem pescoço |
| 14 | Cabelos crespos | Jovem | Orelhas de abano | Tatuagem |
| 15 | Cabelos grisalhos | Lábio leporino | Pálido | Unhas compridas |
| 16 | Cabelos lisos | Lábios finos | Parrudo | Velho |
| 17 | Cabelos longos | Magro | Pé torto | Verrugas |
| 18 | Cabelos ruivos | Manco | Pele amarela | Vesgo |
| 19 | Calvo | Mandíbula quadrada | Pele branca | Vitiligo |
| 20 | Jogue mais duas vezes | Jogue mais duas vezes | Jogue mais duas vezes | Jogue mais duas vezes |

*OBS: jogue 1d4 para determinar a coluna e 1d20 para sortear a característica física do personagem. Caso caia mais de uma vez na mesma coluna role novamente para não obter resultados conflitantes.*

## Históricos
Criar históricos dentro do jogo, além de ser um ponto importante da criação do personagem, é uma das maneiras mais simples de ajudar o trabalho do Mestre a inserir os personagens dentro da campanha e dos acontecimentos das aventuras.

Pelo histórico, você termina de criar sua personalidade, pincelando sobre seu passado e dando ao Mestre as brechas e pontas soltas necessárias para ligar o personagem ao cenário.

Um bom histórico de personagem deve ser simples, direto e sucinto. Poucas linhas, no máximo 2 ou 3, descrevendo brevemente a infância, o lugar de origem e os principais acontecimentos da vida do personagem. Uma morte traumática, uma falência que traz sofrimento à família, um contato com o sobrenatural ou o místico. Isso criará ganchos para o Mestre usar durante a campanha e ajudará ainda mais a você, como jogador, a formar a personalidade do seu personagem.

### Histórico por Rumores 
Uma forma criativa de ajudar o Mestre é utilizar uma mecânica de histórico por rumores. Escreva 5 rumores sobre seu personagem, que formarão especificamente o seu histórico, e passam ao Mestre. Estes rumores devem ser: 
- Três Positivos 
- Dois Negativos 

Isso é o que todos "ouviram falar" dele e o que é comentado por aí. Esta maneira de criação de históricos cria situações divertidas e interessantes para usar em mesa.

Usuário informa raça e genêro: {input}
AI:
`;

export const BuilderModelTemplate = `
You are a model meant to identify race and gender inside a message in natural language.

input: {input}
`;

const tablesNameSchema = z.object({
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

interface NamePrefixSuffix {
  prefix: string;
  suffix: string;
}

interface RaceGenderNames {
  Male: Record<number, NamePrefixSuffix>;
  Female: Record<number, NamePrefixSuffix>;
}

interface NamesTable {
  Human: RaceGenderNames;
  Elf: RaceGenderNames;
  Dwarf: RaceGenderNames;
  Halfling: RaceGenderNames;
  HalfElf: RaceGenderNames;
  Gnome: RaceGenderNames;
}
interface PersonalityTraitsTable {
  [key: number]: { [column: number]: string };
}

export const personalityTraitsTable: PersonalityTraitsTable = {
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

export function getName(
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
