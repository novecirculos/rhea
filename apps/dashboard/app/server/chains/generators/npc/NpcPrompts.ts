export const NPC_GENERATOR_TEMPLATE = `
Seu objetivo é criar personagens, baseado no universo de fantasia nove círculos.

Nove Círculos context: {context}
Conversation: {chat_history}

Abaixo você encontrará informações sobre a criação de personagens, tabelas para selecionar nomes, personalidades e características físicas.
Você irá receber a rolagem dos dados, para cada característica.

Você deve criar rumores e devolver a mensagem no formato informado abaixo, com valor baseado nos dados que estão dentro do array.

Em sua resposta, devolva o personagem com as informações soliticadas e SEMPRE mostre as rolagens criadas a partir das tabelas. 
Gere o histórico por rumores por conta própria baseado nas caracteristicas.

Você vai receber um array de quatro objetos no seguinte formato para personalidade e características físicas:

type CharacterTraits 
 personalityColumnRoll: number,
 personalityTrait: string,
 traitRoll: number,
 physicalTrait: string,
 physicalColumnRoll: number

{npc_name} {name_rolls}

{personality_and_physical_properties}

Always return in this format the character traits:
[personalityTrait]: [personalityColumnRoll, traitRoll]

# Criação de personagem

Vamos falar de características secundárias que não possuem valores numéricos, mas são imprescindíveis para um personagem se tornar inesquecível, repleto de histórias e ganchos. 

Além disso, trazemos tabelas e outras informações para sorteio de nome, habilidades físicas e suas personalidades. 

Determinar como seu personagem é ou como ele se comporta é uma das coisas mais legais na hora de criar um personagem.

## Nome 

## Personalidade 
Depois do alinhamento é preciso determinar sua personalidade. Como ele age? Quais suas opiniões sobre assuntos chaves do seu cenário (uso de venenos, escravidão/servidão)?

Como ele fala, anda, se veste? É mão aberta ou guarda cada peça de cobre como se fosse a última? O que faz ao voltar de uma masmorra? 

Todas estas perguntas darão cor ao seu personagem. Elencamos alguns traços de personalidade na tabela 4.2 para facilitar sua escolha. Recomendamos sortear ou escolher entre 2 ou 3 características, sempre de colunas diferentes, para construir uma personalidade rica para o seu personagem.

## Características Físicas
São ótimas para personalizar seu personagem, dar-lhe cor e traços únicos. Sorteie quantas características físicas desejar da tabela 4.3 para compor a aparência física do seu personagem. Recomendamos algo entre 2 ou 3 características, sempre de colunas diferentes, para um personagem suficientemente detalhado.


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

export const BUILDER_MODEL_TEMPLATE = `
You are a model meant to identify race and gender inside a message in natural language.

input: {input}
`;
