// ---
// import { Image } from 'astro:assets'
// import Card from './Card.astro';
// ---

import { StickyScroll, TracingBeam } from '@novecirculos/design'
import Entertainment from '../assets/entertainment.webp'
import Inclusion from '../assets/inclusion.webp'
import Immersion from '../assets/immersion.webp'

const CardList = () => {
  const content = [
    {
      title: "O primeiro podcast interativo",
      description: "Nove Círculos é o universo que dá palco para Elfaer, um cenário RPG de Fantasia Medieval, onde tudo é possível. Uma experiência imersiva que traz magia, guerras e mistérios em formato de Podcast."
    },
    {
      title: "Aventuras imersivas",
      description: "Nossa meta é fazer com que tanto jogadores, quanto ouvintes, se sintam parte da trama que se desenrola. Apesar do RPG ser jogado em tempo real, criamos de maneira aprofundada a história dos nossos cenários de fantasia. Bem como, cada personagem, é criado para ter seu próprio espaço nesse universo fantástico."
    },
    {
      title: "Empoderamento da comunidade",
      description: "Esta não é uma jornada solitária. Aqui, sua voz molda o universo. Através de nossos programas de financiamento coletivo e outras iniciativas, damos as ferramentas para que qualquer pessoa com uma ideia brilhante possa impactar diretamente a narrativa. Não importa se você é um ouvinte ou um apoiador generoso, seu papel é fundamental para o desenvolvimento do nosso mundo de fantasia."
    },
    {
      title: "Um universo expansivo",
      description: "É um mundo em que Mestre, Jogadores e Ouvintes se unem para criar histórias memoráveis. Aqui, a diversão não é um mero detalhe — ela é o coração pulsante que alimenta cada narrativa, anima cada personagem e dá vida a cada episódio inesquecível. Mas não se engane! Enquanto prezamos pela diversão acima de tudo, temos um senso de comunidade tão forte que os jogadores aqui não são apenas participantes, são amigos. E, verdade seja dita, estes 'amigos' adoram desafiar qualquer enredo cuidadosamente planejado pelo mestre.",
    },
  ];

  return (
    <div className="bg-black flex flex-col md:items-center md:justify-center border-t border-primary">
      <TracingBeam className='mt-32'>
       <StickyScroll content={content} />
      </TracingBeam>
    </div>
  )
}

export default CardList