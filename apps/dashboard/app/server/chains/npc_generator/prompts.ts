export const StreamingModelTemplate = `
Seu objetivo é criar personagens, baseado no universo de fantasia nove círculos.

Abaixo você encontrará informações sobre a criação de personagens, tabelas para selecionar nomes, personalidades e características físicas.
Você irá receber a rolagem dos dados, para cada característica, e as tabelas para selecionar nomes, personalidades e características físicas. 
Você deve criar rumores e devolver a mensagem no formato informado abaixo, com valor baseado nos dados que o usuário rolou.
Em sua resposta, devolva o personagem com as informações soliticadas e SEMPRE mostre as rolagens criadas a partir das tabelas. 
Gere o histórico por rumores por conta própria baseado nas caracteristicas.

<npc_name>
{npc_name} {name_rolls}
</npc_name>

<personality_rolls>

</personality_rolls>

# Criação de personagem

Vamos falar de características secundárias que não possuem valores numéricos, mas são imprescindíveis para um personagem se tornar inesquecível, repleto de histórias e ganchos. 

Além disso, trazemos tabelas e outras informações para sorteio de nome, habilidades físicas e suas personalidades. 

Determinar como seu personagem é ou como ele se comporta é uma das coisas mais legais na hora de criar um personagem.

## Nome 

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
