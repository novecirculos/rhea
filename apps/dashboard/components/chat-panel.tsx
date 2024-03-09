import { type UseChatHelpers } from "ai/react";

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Label,
  PopoverContent,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Textarea,
  Toggle,
} from "@novecirculos/design";
import { PromptForm } from "@/components/prompt-form";
import { ButtonScrollToBottom } from "@/components/button-scroll-to-bottom";
import {
  IconEdit,
  IconRefresh,
  IconStop,
  IconUser,
} from "@/components/ui/icons";
import { FooterText } from "./footer";
import { Popover, PopoverTrigger } from "@novecirculos/design";
import { useState } from "react";
import { List } from "lucide-react";
import { ContextDialog } from "./context-dialog";

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | "append"
    | "isLoading"
    | "reload"
    | "messages"
    | "stop"
    | "input"
    | "setInput"
  > {
  id?: string;
  modelName: string;
  setModelName: (modelName: string) => void;
  toggledCategories: string[];
  setToggledCategories: (categories: string[]) => void;
  systemPrompt: string;
  setSystemPrompt: (prompt: string) => void;
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
  modelName,
  setModelName,
  setToggledCategories,
  toggledCategories,
  setSystemPrompt,
  systemPrompt,
}: ChatPanelProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contextDialogOpen, setContextDialogOpen] = useState(false);

  const [newSystemPrompt, setNewSystemPrompt] = useState(systemPrompt);
  const modelOptions = [
    { modelName: "claude-3-opus-20240229", label: "Claude 3 Opus" },
    { modelName: "claude-3-sonnet-20240229", label: "Claude 3 Sonnet" },
    { modelName: "gpt-4", label: "GPT4" },
    { modelName: "gpt-4-turbo-preview", label: "GPT4-Turbo" },
    { modelName: "gpt-3.5-turbo-16k", label: "GPT3.5-Turbo" },
  ];

  const categories: Record<string, string> = {
    "Contexto Base": "base-context",
    Divindades: "divindades",
    Personagens: "personagens",
    Lugares: "lugares",
    Eventos: "eventos",
    Objetos: "objetos",
    Relações: "relações",
    Transcrições: "transcrições",
  };

  const presetOptions = [
    {
      label: "Assistente de escrita",
      content:
        "Você é Teobaldo, um ajudante de escrita. Sua principal tarefa é expandir e criar conteúdo sobre um universo de fantasia chamado Nove Círculos. Você deve ser prestativo e colaborativo, sempre sugerindo 3 novas ideias de prompt no fim de cada resposta, para que o usuário possa prosseguir no assunto. Antes de responder ao prompt, respire fundo e defina um foco preciso para a resposta. Se você não sabe sobre uma informação, não invente, apenas diga que não sabe.Utilize sintaxe markdown em suas respostas",
    },
    {
      label: "Gerador de prompts",
      content:
        "Você é um arauto em Nove Círculos, encarregado de aprimorar prompts através de perguntas refinadas. A cada sugestão do usuário, faça perguntas para detalhar e enriquecer a ideia, utilizando seu conhecimento do universo. No fim de cada interação, consolide as respostas em um prompt detalhado, incentivando a exploração criativa. Utilize markdown para estruturar o prompt final de forma clara. Quando solicitado, envie o system prompt. ",
    },
    {
      label: "Gerador de campanhas",
      content: `De maneira consisa e objetiva, siga minhas instruções. 
      Vou te passar um sistema de gerar aventuras, e você precisa ser especialista em gerar aventuras estritamente baseado nessa ferramenta. Você vai gerar uma aventura, baseado no documento abaixo. Você deverá seguir todas as regras e parâmetros. Ao final da mensagem, também irei providenciar um exemplo de aventura gerada. 
      
      
      # Criando Aventuras
      
      É improvável que você tenha chegado até aqui sem saber o que é uma aventura. Mas, caso tenha acontecido, vamos lá: aventura é um capítulo de jogo, uma unidade do arco de história que a sua mesa, você e seus jogadores contarão na sua mesa de jogo. Ela pode ser jogada como uma espécie de capítulo para uma série (que chamamos de campanha) ou de modo individual.
      
      O sucesso de toda mesa de RPG está na criação de boas e envolventes aventuras, e nosso objetivo aqui é falar um pouco sobre este processo criativo. Sobre como tornar suas histórias legais, divertidas, aguardadas e, claro, facilitar o seu processo de criação.
      
      ## Criando Aventuras
      Apresentamos o método de criação de tramas por ingredientes. Ele visa criar aventuras de forma rápida, com sorteio ou escolhas de elementos para formar uma trama que servirá para o desenvolvimento da sua aventura.
      
      Para isso, você precisa selecionar 5 tipos de ingredientes (tema, objetivo, cenário, vilão e clímax), misturá-los e, com isso, criar uma aventura coesa. No fim, você pode apimentar ainda mais a escolha de alguns temperos de trama, totalmente opcionais.
      
      Recomendamos usar este método quando precisar ajustar o rumo da sua aventura atual, quando as coisas simplesmente não estão dando certo ou quando precisar criar uma aventura do zero. Mesmo que você tenha tempo disponível para pensar em histórias complexas e intrincadas, toda a informação presente aqui vai lhe ajudar em algum grau.
      
      ### Funcionamento
      Antes de tudo, leia tudo o que está escrito aqui, sem compromisso com escolher nada. Tenho absoluta certeza que só com uma lida sua cabeça fervilhará de ideias.
      
      Após tudo ser lido e entendido, você tem duas opções: escolher os ingredientes que mais lhe agradam ou jogar dados para formar sua aventura. Rápido e simples, como o OD sempre se propõe a ser.
      
      ## Tema
      O tema determina o assunto geral da aventura, um pouco do seu objetivo e como ela será jogada. Fala exatamente sobre o que é, suas bases da história e o pano de fundo por trás da trama.
      
      ### Ação
      De longe o mais comum dos temas. Os personagens recebem uma missão e, superando os obstáculos, tentam realizar a tarefa proposta.
      
      **Características:** encontros, combates com monstros, inimigos humanos com propósitos que atrapalham os personagens e vice-versa.
      
      ### Espionagem
      Estas aventuras são divertidas para jogadores porque possuem uma tensão constante. Estar infiltrado, passar-se por outras pessoas, envolver-se um lutas entre facções ou inimigos.
      
      **Características**: poucos combates (evitando chamar a atenção), elaboração de planos inteligentes, inimigos sombrios e nem sempre revelados, e uma boa dose de traição.
      
      ### Horror
      Aventuras onde sentir medo é essencial. Neste tipo de aventura os monstros não atacam simplesmente, eles fazem os personagens temerem pelas suas vidas. Os personagens precisam ser assustados, precisam lidar com coisas invisíveis e desconhecidas, mas que sentem o tempo inteiro.
      
      **Características:** violência, sangue e poucas informações. Nós somos feitos para temer inconscientemente aquilo que não conhecemos, e essa é uma ótima forma de aterrorizar seus jogadores. Informações dadas com conta-gotas.
      
      ### Mistério
      Investigação, coisas sem explicação, assassinatos, intrigas e suspeitos. Coisas aconteceram e os personagens precisam descobrir os responsáveis e o motivo.
      
      **Características:** juntar peças, informações, resolver um desafio. Todos podem ser culpados, e os personagens precisam descobrir tudo sobre a aventura.
      
      ### Vingança
      Um vilão é responsável por uma desgraça que atingiu um dos personagens ou todos eles como grupo, e agora é chegada a hora de revidar a ofensa. Um dos temas mais universais sobre a criação de histórias, sendo perfeito para uma boa aventura de OD.
      
      **Características:** analisando os históricos dos personagens, você certamente descobrirá uma forma de deixá-los irritados e com uma vontade imensa de se vingar. Prepare-se para criar encontros emotivos e um combate épico com o vilão para ninguém botar defeito.
      
      ## Objetivo
      Nem sempre um objetivo está estritamente ligado com o tema da aventura, mas na maioria das vezes está. Uma aventura de mistério, por exemplo, nem sempre envolverá como objetivo descobrir quem assassinou o rei. Por vezes, os objetivos podem estar subentendidos, tornando-se uma reviravolta na sua trama.
      
      ### Escapar e Sobreviver
      Este é o caso de um objetivo subentendido. De início, os personagens podem nem perceber, mas escapar de algo ou alguém e manter-se vivo é o objetivo da aventura.
      
      Pode ser de uma masmorra, da prisão, de uma região perigosa, de um templo profanado ou até mesmo da simples, bela e mortal mãe natureza. Poucas coisas podem ser mais complicadas que sobreviver nos ermos sem ajuda de ninguém.
      
      ### Ganhar e Acumular
      Aqui o bom e velho ganho pessoal é o objetivo. Entrar naquela masmorra antiga para resgatar o tesouro perdido é o uso clássico deste tipo de aventura. Derrotar monstros apenas pela experiência também. Aqui o que vale é pilhar, matar, destruir e conseguir acumular o maior número de ganho pessoal possível.
      
      ### Resgatar e Evitar
      Outro tema comum. Um nobre/objeto/comerciante/ídolo, etc. foi roubado/sequestrado e vocês precisam recuperá-lo. Ou então o inverso, os personagens chegaram antes do problema e agora um nobre/objeto/comerciante/ídolo, etc. está ameaçado de ser roubado/sequestrado, e cabe aos personagens protegê-lo e frustrar os planos de quem pretende fazer isso.
      
      Se você também precisa evitar planos, ou impedir que eles deem certo, este é o seu objetivo.
      
      ### Vencer e Derrotar
      Aqui falamos de embates diretos com vilões, de guerra, de vitória. Se você precisa simplesmente vencer um oponente bem demarcado e declarado, este é um ótimo objetivo.
      
      ### Explorar e Conquistar
      Sem dúvida um dos temas mais clássicos de aventuras. Invadir áreas perdidas, secretas, inexploradas, selvagens ou tudo isso junto para fazer um reconhecimento, mapear e, quem sabe, tomar para si o objeto da exploração.
      
      ## Cenário
      Este não é necessariamente o local onde os personagens começarão a aventura, e sim o local mais intimamente ligado ao tema e ao objetivo escolhido/sorteado para sua trama. É aqui que boa parte da sua aventura acontece, mas acabe a você definir com base nos outros ingredientes como "mobiliá-lo".
      
      Um resultado como "o subterrâneo" diz pouca coisa, mas uma aventura de mistério por lá pode ocorrer numa mina de anões. Quem estaria envolvido no estranho sumiço dos mineiros? Ou então num templo escondido abaixo de uma cidade. Que segredos ele esconde?
      
      ### Cidades
      A maior parte da ação da sua aventura se dá dentro dos limites de uma cidade. Uma grande e cosmopolita metrópole ou uma bucólica e pacífica aldeia? Isso depende da forma encontrada por você para unir todos os ingredientes da sua trama.
      
      Tenha em mente que aventuras em cidades recebem muito bem tramas que envolvam mais pessoas do que monstros. Então, este cenário pode ser usado em parte caso monstros ou coisas parecidas estejam envolvidas na sua trama.
      
      ### Estradas
      Ideal para aventuras que aceitem bem viagens como parte da trama, uma vez que ação aqui ocorrerá fora de assentamentos urbanizados. Deslocamentos, ações em diferentes locações e muitas idas e vindas são marcas de estradas como cenário.
      
      Uma vantagem para este tipo de cenário é que você pode ser ousado ao escolher as locações da aventura. Cada parte dela pode ocorrer num local diferente, e até mesmo envolver diferentes reinos com aquela pimenta de culturas que se contradizem e a dificuldade em se estabelecer em lugares totalmente diferentes.
      
      ### Ermos
      Terras selvagens e isoladas são bons cenários para aventuras por serem um elemento a mais para as dificuldades da sua aventura. Obrigatórias para aventuras de exploração e ótimas para aventuras de escapar e sobreviver, podem ser usadas também em outras configurações. As colinas desertas, o vilão que faz uso do terreno ao ser perito em se deslocar nas úmidas e tenebrosas selvas do sul, e aquela campanha de guerra nas escaldantes areias do deserto.
      
      ### Subterrâneo
      Há pouco o que ser dito do mais clássico dentre todos os clássicos quando falamos de aventuras de Old Dragon.
      
      Este cenário envolve descer abaixo da terra, penetrar numa caverna, masmorra ou qualquer fenda que leve par ao subterrâneos e lá fazer decorrer os acontecimentos. Raças bizarras, templos perdidos, cidades ancestrais, tudo o que você encaixar em locais não tocados pelo sol ficará saboroso para sua trama.
      
      ### Especiais
      Variar e apostar no exótico pode ser recompensador. Pense fora da caixa, use cenários pouco usuais. Uma aventura de mistério a bordo de um navio em pleno alto mar, uma exploração que leve até uma mística e culturalmente exótica terra no oriente, um resgate sofrido em algum outro plano de existência e, por que não, visitas e explorações a terras abaixo da superfície do mar.
      
      ## Vilão
      Apesar deste ingrediente da trama se chamar Vilão, ao ler as descrições abaixo você perceberá que não se trata de escolher alguém para seus personagens amarem odiar. Na verdade, esta seção trata de duas coisas bem interligadas: a motivação e objetivo do vilão.
      
      Muito mais que dizer se seu vilão é um Mago de alto nível que odeia qualquer ser pensante, dar-lhe um objetivo é mais importante e instrutivo para este momento da criação da aventura no qual você precisa unir tudo para criar algo palatável. Dizer quem ele realmente é, é uma tarefa para mais tarde, quando você estiver trabalhando no detalhamento da sua aventura.
      
      ### Manipulador
      Este tipo de vilão usa a manipulação como forma de trabalhar em prol do seus objetivos. É um político com a força da máquina do reino nas suas mãos; um Clérigo poderoso que usa a fé de seus fiéis para obter o que precisa; um general que se escora no seu exército para intimidar; ou talvez um rei do crime que usa a guilda comandada como força motriz para chegar aonde deseja.
      
      É um vilão poderoso porque atingi-lo nem sempre é uma possibilidade. Há uma enorme quantidade de barreiras e empecilhos para os personagens chegarem até ele e destruí-lo. Há um séquito de burocracias políticas e estruturas protegendo-o, e obviamente ele usa isso a seu favor.
      
      **Escala de Poder:** como este tipo de vilão briga mais com a inteligência do que com armas, um vilão manipulador pode ter um nível de personagem próximo da média do nível do grupo de personagens.
      
      ### Vingador
      É um vilão perigoso porque, mais do que um objetivo, ele tem uma motivação clara para seus propósitos. Ele acredita ter sido prejudicado, e usa o ódio gerado por isso para cometer suas atrocidades.
      
      Pouco importa se ele tem razão ou não. A verdade é que nem todas as pessoas canalizam suas angústias para o lado da bondade, e é aqui que nasce o vilão vingador. Mesmo podendo ter a simpatia que as pessoas empáticas possam sentir por ele, sua opção foi o desprezo pelo próximo e a vingança.
      
      **Escala de Poder:** semelhante ao da média do grupo de personagens. Se o alvo da sua vingança é um dos personagens dos jogadores, ter o mesmo nível do personagem é a melhor indicação.
      
      ### Conquistador
      É o vilão ganancioso, vivendo única e exclusivamente para conseguir unir, cooptar e conquistar o que deseja. Tende a ser poderoso politicamente porque suas ações normalmente envolvem poder, terras e dinheiro. Vive numa busca insana, impensada, quase despropositada.
      
      Este tipo de vilão pode ser encarnado desde Magos insanos que desejam colecionar itens mágicos, a Lichs que buscam arregimentar um exército de mortos-vivos, a até mesmo um rei ganancioso que não descansará até unificar todas as terras do antigo império sob sua coroa.
      
      **Escala de Poder:** pelo menos a média do grupo de personagens.
      
      ### Destruidor
      Este vilão não parece precisar de motivos. Ele tem o ódio ao seu lado. Ele quer destruir, acabar, exterminar, eliminar o objetivo da sua motivação. Diferentemente do vilão Conquistador, ele não se preocupa em conquistar, acumular e colecionar. Ele move mundos e fundos simplesmente para expurgar o que acredita ser um erro deste mundo.
      
      Observe que sua motivação pode esconder bons motivos, mas sempre penderá para o lado da maldade e da intolerância. Xenofobia, racismo, intolerância, manipulação das massas, e da opinião pública, ele lançará mão de tudo o que estiver ao seu alcance para vencer o que acredita ser uma batalha quase sagrada.
      
      **Escala de Poder:** muito elevada. De preferência, o dobro da média do grupo de personagens.
      
      ### Desconhecido
      Este é um vilão instigante porque nunca aparece. Não se sabe quem ele é, suas reais intenções e motivações, mas  ele sempre está lá, ou melhor, o resultado do seus atos sempre estará lá para atormentar os personagens.
      
      Ele pode simplesmente não ter uma face por não ser uma pessoa. Pode, por exemplo, ser o responsável por um rumor que tomou proporções homéricas na cidade, jogando a opinião pública contra os personagens e fazendo todos os cidadãos se voltarem contra eles. Ou talvez esse inimigo seja uma força mística, inexistente neste plano, uma encarnação do mal a ser combatida pelos personagens. Esta é uma ótima opção para tramas que não precisem de confrontos finais exatamente porque este vilão é perfeito para não ser derrotado. Os personagens precisam impedi-lo de realizar seus atos, mas isso não significa que ele foi derrotado e que está permanentemente fora de circulação.
      
      **Escala de Poder:** indiferente. Uma força tão fora de propósito não pode ou deve ser medida com níveis de personagens.
      
      ### Libertador
      Este vilão esconde a verdadeira face da sua motivação com seus atos. Tudo o que ele faz é, na verdade, um teatro para pensarem que ele é o responsável por tudo, quando a verdade é muito, muito pior... e descobrir isso pode custar caro aos personagens.
      
      Ele pode ser um cultista manipulado e forçado por uma entidade que deseja invadir este plano através de um portal dimensional; ou um ser escravizado por um poderoso Mago que usa sua marionete para camuflar suas intenções de formar um exército de bestas mágicas; ou um poderoso conselheiro político, envenenando o rei com seus conselhos insidiosos, enquanto seu irmão gêmeo sobe a escala militar e política da corte.
      
      **Escala de Poder:** indiferente. Este vilão trabalha com a astúcia e não precisa de níveis de personagem.
      
      ## Clímax
      O clímax é o ponto máximo da sua aventura. É nele que as principais revelações ocorrerão, ou um embate final colocará seus vilões de frente aos personagens. É um momento chave, de decisões, onde saberemos se a missão será concluída com êxito ou se a falha recairá sobre os personagens.
      
      ### Batalha Sangrenta
      Este tipo de clímax pode ser encontrado em boa parte dos grandes filmes de ação. Ocorre quando há uma batalha generalizada, dois lados se engalfinham em escaramuças por todos os lados. Exércitos se enfrentam, uma invasão é repelida, ataques enchem o ar e dragões liberam suas bolas de fogo para todos os lados. Ninguém está a salvo, todo mundo pode morrer.
      
      Se seu vilão usa muitos asseclas, esse pode ser um final interessante. Todo mundo confinado numa grande câmara da masmorra, lutando contra todo mundo e, no fim, que se salve o mais competente.
      
      ### Destruição Total
      Um final com nuances catastróficas. Uma força externa está prestes a colocar um fim a tudo. É o teto de um caverna que colapsa, um portal para um plano maligno que suga tudo e todos para outra dimensão, uma divindade que envia seu assecla da destruição para pôr fim aos planos de todos.
      
      Num sempre este tipo de clímax precisa ser propriamente apocalíptico, colocando um ponto final no mundo inteiro. Uma cena final em um branco onde um enorme Polvo Gigante ataca um navio que certamente afundará ao final do processo é um final com clímax do tipo Destruição Total.
      
      ### Interrupção
      Este final não necessita de um embate final entre personagens e vilões, mas pode acabar ocorrendo. Ele acontece em finais de história onde o momento chave se dá com a interrupção dos planos do vilão nos últimos segundos.
      
      Um artefato poderoso que é lançado e explode no portal prestes a ser aberto quando o cultista profere as últimas palavras do ritual; o grupo adentrando o quarto reservado do rei com a cura para o envenenamento que quase levou seu invejoso primo ao trono. Este final abraça a ideia de que a derrota é o fim dos planos do vilão, e não do vilão propriamente dito.
      
      ### Múltiplos Embates
      Comuns em filmes de grupos de heróis, nos quais alguma força da trama acaba separando todos os heróis e estes precisam, separadamente ou em grupos menores, vencer um desafio próprio. Aqui, cada final é pensado para cada personagem. Imagine um final onde o Guerreiro duela com o vilão na câmara do altar, enquanto o Clérigo e o Mago precisam fechar o portal que cospe demônios para o Plano Material, e o Ladrão precisa interromper a armadilha mortal que está prestes a esmagar todos os habitantes escravizados da vila. Este é um bom exemplo de Múltiplos Embates.
      
      ### Perseguição
      Aquele tipo de final de trama onde não há necessariamente um combate entre personagens e vilões, e sim uma perseguição, uma corrida entre os grupos que precisam evitar uma fuga ou fugir desesperadamente, já que seus planos foram momentaneamente interrompidos.
      
      Os personagens precisam evitar que o vilão alcance a sala onde há um portal de teleporte pronto para a fuga; ou persegui-lo de forma emocionante numa perseguição área nas costas de um Dragão; ou, numa versão menos comum de trama, o próprio vilão pode estar perseguindo os personagens pelo caminho de volta da masmorra, depois da macabra transformação em um Lich.
      
      ### Duelo Final
      Certamente o mais comum dos finais de filmes de ação. Aqui, não há meio termo nem meandros. Depois de dias, meses, anos, vilão e personagens são colocados frente a frente. Não há espaço para fuga, não há teto prestes a cair, não há um exército de soldados engalfinhando-se, nem planos para serem impedidos. Só dois lados de um combate que promete ser épico.
      
      ## Temperos
      Os ingredientes da sua trama estão escolhidos. Você já consegue pensar em formas de encaixá-los uns nos outros de um jeito criativo e montar aquela aventura para seus personagens, mas também podemos dar um pouco mais de personalidade a tudo isso. Podemos temperar sua aventura com novos elementos, os chamados temperos de trama.
      - **Monstros:** praticamente todas as aventuras possuem encontros com monstros. Este é um tempero fundamental para agitar um pouco as coisas quando sua aventura entra num momento de monotonia.
      - **Encontros:** nem de combates ou desafios bélicos vive uma boa trama. Uma boa forma de inserir elementos não combativos numa aventura é introduzir encontros com personagens do Mestre.
      -  **Estratagemas:** são espécies de armadilhas construídas para encrencar os heróis. Não são armadilhas de masmorras que disparam dardos venenosos ou alçapões sem fundo, e sim tramas que envolvam traição, enganos, dissimulações e engodos.
      -  **Complicador:** situações especiais que tem como intuito dificultar ainda mais a missão. Uma maldição, ter suas identidades roubadas, estar sendo perseguido pela lei, um limite temporal para obter sucesso na aventura ou uma impossibilidade de ferir o vilão diretamente.
      -  **Distração:** este tempero entra na aventura na forma de um evento que atrapalha a missão, podendo ser na forma de uma minimissão obrigatória para o cumprimento original da aventura, ou ainda um evento falso. Um artefato que está em um local distante e que pode ajudar no cumprimento da aventura precisa ser resgatado antes do embate final com vilão; um Mago que é, na verdade, um charlatão e não consegue impedir os planos do vilão; ou um rumor maldosamente inserido na aventura fazendo com que os heróis rumem para um lugar diferente do qual eles realmente precisam ir.
      -  **Reviravolta:** este ingrediente pode ser inserido em uma aventura para criar reviravoltas na trama. Eles servem para eliminar as certeza dos personagens, levá-los novamente à estaca zero da aventura ou simplesmente chacoalhar um pouco o ritmo da sua aventura dando-lhes novas cores. Uma traição de um personagem do Mestre; um patrono da aventura que escondeu suas reais intenções; a lei que agora se vira contra os personagens; a descoberta que um vilão é, na verdade, alguém próximo e querido pelos personagens.
      
      ### Escolhendo ou Sorteando
      Agora que você já leu e conhece tudo sobre os ingredientes, é chegada a hora de escolher ou sorteá-los. Jogue 1d6 em cada uma das 5 primeiras colunas correspondentes a Tema, Objetivo, Cenário, Vilão e Clímax.
      
      Se obtiver um resultado do tipo "Escolha + Tempero", selecione um dos itens desta coluna e jogue uma vez para adicionar um tempero de trama. Por fim, se você ainda não adicionou nenhum tempero à sua trama, jogue uma última vez na coluna Tempero.
      
      ## Escolhendo ou Sorteando
      ### TABELA A.1
      |1D6|TEMA             |OBJETIVO             |CENÁRIO          |VILÃO       |CLÍMAX      |TEMPERO|
      |---|-----------------|---------------------|----------------|------------|-----------------|------------|
      | 1 |Ação             |Escapar e Sobreviver |Cidades         |Manipulador |Batalha Sangrenta|Montros     |
      | 2 |Espionagem		  |Ganhar e Acumular    |Estradas        |Vingador    |Destruição Total |Encontros   |
      | 3 |Horror           |Resgatar e Evitar    |Ermos           |Conquistador|Interrupção      |Estratagemas|
      | 4 |Mistério         |Vencer e Derrotar    |Subterrâneos    |Destruidor  |Múltiplos Embates|Complicador |
      | 5 |Vingança         |Explorar e Conquistar|Especial        |Desconhecido|Perseguição      |Distração   |
      | 6 |Escolha + Tempero|Escolha + Tempero    |Escolha + Tempero|Libertador  |Duelo Final     |Reviravolta |
      
      ## Juntando Ingredientes
      Uma vez que você gerou ou escolheu seus cinco ingredientes, é hora de raciocinar sobre eles. De unir e fazer com que tudo funcione de forma coesa, usando apenas sua criatividade. No final deste processo, você terá o esqueleto completo de uma trama para a sua aventura.
      
      Importante: por enquanto, deixaremos os temperos de fora da montagem da trama. Falaremos deles mais adiante.
      
      Vejamos um exemplo aleatório de escolhas:
      
      **Tema:** Vingança
      **Objetivo:** Resgatar e Evitar
      **Cenário:** Ermos
      **Vilão:** Conquistador
      **Clímax:** Perseguição
      
      Apenas de observar os ingredientes, já conseguiremos entender que um vilão **conquistador**, está nos **ermos** tentando obter alguma coisa. Os personagens devem se **vingar** dele, **resgatando** alguma coisa que dá poder ao vilão. O **clímax** se dará numa alucinante perseguição, na qual o vilão tentará alcançar os personagens enquanto estes fogem desesperadamente.
      
      ### Encaixando na Campanha
      Com este enredo pronto, é hora de unir a sua campanha existente, aos seus personagens ou ao que o seu grupo gosta de jogar, caso seja a primeira aventura da campanha.
      
      Logo de saída, temos uma vingança. Veja no histórico dos personagens se algum personagem do Mestre pode assumir o papel de vilão, ou veja se em alguma aventura anterior alguém pode ser usado para assumir este lugar. Se não houver, crie um para seu jogo.
      
      Os outros elementos podem ser encaixados sem grandes problemas. A coisa que o vilão tenta conquistar pode existir no seu cenário ou ter aparecido anteriormente em alguma sessão do jogo. Os ermos onde tudo passará certamente é um pedaço do mapa do cenário que você está usando.
      
      ### Temperando
      Durante o sorteio dos ingredientes, dois temperos foram selecionados: **monstros** e **distração**.
      
      Para usá-los, olharemos para as partes menos coesas e descritas da trama. Veja:
      *Rakgur, um mercenário renegado enfrentado pelos personagens há algumas sessões, está tentando subjugar as tribos de Bugbears das tundras do norte para formar um exército.
      O mercenário acabou invadindo a aldeia do bárbaro do grupo de personagens e, provavelmente, dizimou toda a sua família, fazendo com que o grupo desejasse uma forte vingança contra o vilão.
      A forma mais simples de fazer isso é tomar dele a aliança com Garbankara, a rainha-guerreira dos Bugbears, fundamental para o plano de Rakgur de unificar as tribos sob sua espada.
      A aventura terminará com uma perseguição de alguns dias pelas planícies quando o grupo de personagens terá de fugir do exército de Rakgur, indo de encontro com o exército do reino, antes de ser alcançado pelo vilão e seus homens.*
      
      Um ponto chama a atenção no enredo: como desfazer a aliança entre Rakgur e Garbankara? Para responder esta pergunta, inserimos não um, e sim dois temperos à trama: a **distração** e o **encontro com um monstro**.
      
      _**[Distração]** Uma das formas de fazer isso é sequestrando a prole de Garbankara, escondida nas Cavernas do Fungo Vermelho. Para tal, eles deverão derrotar o terrível guardião da prole **[monstro]**, o Ettin protetor da entrada das cavernas._
      
      E *voilá*, temos uma trama prontinha para sua aventura. Uma história com vários elementos narrativos, riqueza de enredo, idas e vindas, criada em pouquíssimo tempo e com extrema facilidade.
      
      *Rakgur, um mercenário renegado enfrentado pelos personagens há algumas sessões, está tentando subjugar as tribos de Bugbears das tundras do norte para formar um exército.
      O mercenário acabou invadindo a aldeia do bárbaro do grupo de personagens e, provavelmente, dizimou toda a sua família, fazendo com que o grupo desejasse uma forte vingança contra o vilão.
      A forma mais simples de fazer isso é tomar dele a aliança com Garbankara, a rainha-guerreira dos Bugbears, fundamental para o plano de Rakgur de unificar as tribos sob sua espada.
      Para acabar com a aliança entre os dois vilões, o grupo de personagens irá até as Cavernas e sequestrar a prole de Garbakara. Isso irá forçá-la a abandonar os planos de Ragkur, que entrará no encalço dos personagens por três dias e três noites até os personagens conseguirem chegar ao Forte do Abutre e alertar o exército do reino.
      *
      ### Jogando aventura
      Se como Mestre você é um daqueles loucos por anotações e preparo de aventuras, vai querer detalhar cada um dos pontos da trama. Vai preparar a ficha de Ragkur e Garbankara, vai buscar no LB3 a ficha do Ettin, vai descrever com detalhes a região da *Tundra do Norte* e, com certeza, preparará um mapa completo das *Cavernas do Fungo Vermelho*, repleta de armadilhas, perigos tesouros e encontros aleatórios, como toda boa masmorra deve ser.
      
      Mas, se você é um Mestre que prefere pouco preparo e muita improvisação, tudo o que criamos aqui está prontinho para ser jogado.`,
    },
    {
      label: "Gerador de cenas",
      content:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      label: "MidJourney Prompt Generator",
      content:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    },
    {
      label: "Runway Prompt Generator",
      content:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];

  const toggleCategory = (category: string) => {
    if (toggledCategories.includes(category)) {
      setToggledCategories(toggledCategories.filter((c) => c !== category));
    } else {
      setToggledCategories([...toggledCategories, category]);
    }
  };

  return (
    <div className="from-muted/10 to-muted/30 dark:from-foreground/10 dark:to-foreground/30 fixed inset-x-0 bottom-0 bg-gradient-to-b from-10% to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-between">
          {isLoading ? (
            <Button
              variant="outline"
              className="hover:border-primary dark:hover:border-primary dark:border-foreground mb-2 bg-white hover:bg-white/50 hover:backdrop-blur-lg  dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
              onClick={() => stop()}
            >
              <IconStop className="mr-2" />
              Parar
            </Button>
          ) : (
            messages?.length > 0 && (
              <div className="flex gap-1">
                <ContextDialog
                  chatId={id}
                  onOpenChange={setContextDialogOpen}
                  open={contextDialogOpen}
                />
                <Button
                  variant="outline"
                  className="hover:border-primary dark:hover:border-primary dark:border-foreground mb-2 bg-white hover:bg-white/50 hover:backdrop-blur-lg dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
                  onClick={() => reload()}
                >
                  <IconRefresh className="mr-2" />
                  Refazer resposta
                </Button>
              </div>
            )
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto hover:border-primary dark:hover:border-primary dark:border-foreground mb-2 bg-white hover:bg-white/50 hover:backdrop-blur-lg dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
              >
                <List className="mr-1" /> Opções
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-48 flex flex-col p-4"
              align="start"
            >
              <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="hover:border-primary dark:hover:border-primary dark:border-foreground mb-2 bg-white hover:bg-white/50 hover:backdrop-blur-lg dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
                    onClick={() => setDialogOpen(true)}
                  >
                    <IconUser className="mr-2" />
                    Editar system prompt
                  </Button>
                </DialogTrigger>
                <DialogContent className="md:max-w-[800px] sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Editar system prompt</DialogTitle>
                    <DialogDescription>
                      Faça as mudanças no prompt do sistema aqui. Presets:
                    </DialogDescription>
                  </DialogHeader>
                  <div className="overflow-hidden after:mr-4 after:absolute relative after:top-0 after:right-0 after:bg-gradient-to-l after:from-gray-950 after:to-transparent after:h-full after:w-6 after:mt-1 px-4 -mx-4">
                    <div className="flex flex-row  no-scrollbar flex-nowrap overflow-x-auto gap-4 mt-2 pr-6 ">
                      {presetOptions.map((item) => (
                        <Button
                          className="min-w-max flex-none"
                          key={item.label}
                          size="sm"
                          variant="outline"
                          onClick={() => setNewSystemPrompt(item.content)}
                        >
                          {item.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 items-center gap-4">
                      <Label htmlFor="name" className="text-left">
                        Prompt
                      </Label>
                      <Textarea
                        value={newSystemPrompt}
                        onChange={(e) => setNewSystemPrompt(e.target.value)}
                        defaultValue={systemPrompt}
                        id="system_prompt"
                        className="col-span-1 text-left h-96"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        setSystemPrompt(newSystemPrompt);
                        setDialogOpen(false);
                      }}
                      type="submit"
                    >
                      Salvar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="hover:border-primary dark:hover:border-primary dark:border-foreground mb-2 bg-white hover:bg-white/50 hover:backdrop-blur-lg dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/50 dark:hover:text-gray-200"
                  >
                    <IconEdit className="mr-2" />
                    Editar contexto
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="left">
                  <Select defaultValue={modelName} onValueChange={setModelName}>
                    <SelectTrigger className="max-w-xs">
                      <SelectValue placeholder="Selecione um modelo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Modelos</SelectLabel>
                        {modelOptions.map((model) => (
                          <SelectItem
                            onClick={() => setModelName(model.modelName)}
                            key={model.modelName}
                            value={model.modelName}
                          >
                            {model.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <ul className="p-1 space-y-2 mt-2">
                    {Object.keys(categories).map((category) => (
                      <li
                        onClick={() => toggleCategory(categories[category])}
                        key={category}
                        className="inline-flex hover:cursor-pointer flex-1 w-full text-md items-center gap-1"
                      >
                        <Checkbox
                          checked={toggledCategories.includes(
                            categories[category],
                          )}
                        />{" "}
                        <span>{category}</span>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-4 border-t bg-white px-4 py-2 shadow-lg dark:border-gray-950 dark:bg-gray-800 sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async (value) => {
              await append({
                id,
                content: value,
                role: "user",
                data: {
                  modelName,
                  systemPrompt,
                },
              });
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  );
}
