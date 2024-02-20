import { AudioPlayer } from "./AudioPlayer";
import { WavyBackground } from '@novecirculos/design'


const Player = () => <>
<WavyBackground containerClassName="max-h-[60vh] overflow-hidden"> 
<h1 className="text-white text-4xl text-center sm:mt-0 sm:text-9xl z-10">A viúva do sol</h1> 
</WavyBackground>
<section className="bg-gray-950 border border-gray-700 -translate-y-[30%] mx-auto p-4 md:p-8 shadow-lg rounded-md max-w-3xl w-4/5 relative z-20 text-white">
  <strong className="mt-4 inline-block font-medium text-gray-300">Temporada 1</strong>
  <div className="flex flex-col gap-4">
   <h2 className="inline-block text-3xl font-semibold mt-2 mb-2">A viúva do sol</h2>
   <p className="text-gray-400 inline-block leading-loose mb-2">Uma campanha repleta de Magia, Lendas e Intrigas no Mundo de Elfaer. 
    Durante os eventos que culminaram o fim da Quarta Era - A era dos conflitos. 
    Os heróis se veem envoltos em uma trama além de sua compreensão. 
    Lendas, Intrigas e é claro, muita risada, são elementos principais desta aventura fantástica.
   </p>
   <AudioPlayer />
   </div>
  </section>
</>

export default Player