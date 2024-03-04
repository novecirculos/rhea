
import { TextGenerateEffect } from '@novecirculos/design'


const Quote = () => {
    const words = `"Nove Círculos não é minha história, 
é uma história contada por um grupo, 
e moldada pela comunidade. 
Não existe um real significado para tudo, 
nossos ouvintes têm a liberdade de imaginação total, 
e não existe uma definição arbitrária sobre como as coisas são. 
Nove Círculos não é sobre bem e mal, é sobre pessoas, sobre universos além do nosso." - Mestre Patrick`
    return <blockquote className="w-full md:w-1/2 leading-loose pb-20 mx-auto max-w-screen-xl text-center text-sm text-gray-400 font-semibold px-8">
        <TextGenerateEffect className='italic dark:text-gray-300 text-sm leading-loose' words={words}></TextGenerateEffect>
    </blockquote>
}

export default Quote
