import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef } from 'react'
import { PlatformDialog } from './PlatformDialog'
import { ChevronDown } from 'lucide-react'
import { Button } from './ui'

export default function MultiLayerParallax() {
  const scrollRef = useRef(null)
  const typewriterRef = useRef(null)
  const wordIndexRef = useRef(0)
  const charIndexRef = useRef(0)

  const words = useMemo(
    () => ['fantasia', 'magia', 'batalhas', 'aventuras'],
    []
  )

  useEffect(() => {
    function typeWord() {
      if (charIndexRef.current < words[wordIndexRef.current].length) {
        typewriterRef.current.textContent += words[wordIndexRef.current].charAt(
          charIndexRef.current
        )
        charIndexRef.current++
        setTimeout(typeWord, 150)
      } else {
        wordIndexRef.current = (wordIndexRef.current + 1) % words.length
        charIndexRef.current = 0
        setTimeout(() => {
          typewriterRef.current.textContent = ''
          typeWord()
        }, 2000)
      }
      typewriterRef.current.classList.add('cursor')
    }

    typeWord()
  }, [words])

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end start'],
  })
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%'])

  return (
    <div
      ref={scrollRef}
      className="relative isolate grid h-screen w-full place-items-center overflow-hidden"
    >
      <main className="font-primary relative flex flex-col items-center justify-center gap-[32px]">
        <motion.h1
          style={{ y: textY }}
          className="font-primary z-10 -mt-64 h-[1.3em] max-w-xl text-center text-3xl font-semibold text-gray-50 md:text-6xl"
        >
          <a
            href="https://open.spotify.com/episode/31ETxfyDh56jiHGypyINK4?si=a7acdba8348147af"
            target="_blank"
            className="font-primary z-50 mx-auto mb-4 flex w-max cursor-pointer items-center gap-[14px] rounded-full border-2 border-white bg-white py-2 pl-2 pr-4 text-lg font-medium text-[#1DB954] shadow-sm transition-all hover:border-[#1DB954] hover:underline hover:shadow-md"
          >
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5786 0.375C18.9536 0.375 24.2036 5.625 24.2036 12C24.2036 18.4219 18.9536 23.625 12.5786 23.625C6.15674 23.625 0.953613 18.4219 0.953613 12C0.953613 5.625 6.15674 0.375 12.5786 0.375ZM17.2661 17.4844C17.6411 17.4844 17.9692 17.2031 17.9692 16.7812C17.9692 16.3594 17.8286 16.1719 17.5474 15.9844C14.1724 14.0156 10.2817 13.9219 6.43799 14.7656C6.06299 14.8594 5.78174 15.0938 5.78174 15.5625C5.78174 15.9375 6.06299 16.3125 6.53174 16.3125C6.67236 16.3125 6.90674 16.2188 7.09424 16.1719C10.4692 15.5156 13.8442 15.5625 16.7974 17.3438C16.938 17.4375 17.0786 17.4844 17.2661 17.4844ZM18.5317 14.4375C19.0474 14.4375 19.4224 14.0156 19.4692 13.5C19.4692 13.125 19.2817 12.7969 18.9067 12.6094C16.6099 11.2031 13.6567 10.4531 10.6099 10.4531C8.68799 10.4531 7.32861 10.7344 6.01611 11.1094C5.54736 11.25 5.31299 11.5781 5.31299 12.0469C5.31299 12.5625 5.73486 12.9844 6.20361 12.9844C6.43799 12.9844 6.53174 12.8906 6.76611 12.8438C10.6567 11.8125 15.0161 12.5156 17.9692 14.25C18.1099 14.2969 18.2974 14.4375 18.5317 14.4375ZM19.9849 10.875C20.5474 10.875 21.063 10.4062 21.063 9.75C21.063 9.1875 20.8286 8.90625 20.4536 8.71875C17.8755 7.17188 14.2661 6.46875 10.8442 6.46875C8.82861 6.46875 7.00049 6.70312 5.35986 7.17188C4.93799 7.3125 4.51611 7.64062 4.51611 8.29688C4.51611 8.90625 4.98486 9.42188 5.59424 9.42188C5.82861 9.42188 6.06299 9.32812 6.20361 9.28125C10.0942 8.20312 16.0474 8.67188 19.3755 10.6875C19.6099 10.7812 19.7505 10.875 19.9849 10.875Z"
                fill="#1DB954"
              />
            </svg>
            Ouvir o teaser no spotify
          </a>
          Um novo universo
          <p className="mx-auto flex w-min flex-row items-center">
            <span className="mt-2 md:mt-0">de</span>
            <span className="ml-3 w-min bg-white p-1">
              <strong
                ref={typewriterRef}
                className="from-primary to-secondary bg-gradient-to-b bg-clip-text text-transparent"
              ></strong>
            </span>
          </p>
        </motion.h1>

        <section className="z-50 flex translate-y-32 flex-row gap-[18px] px-2">
          <PlatformDialog />
          <Button variant="outline" className="px-8 text-white">
            Apoiar o projeto
          </Button>
        </section>
      </main>
      <motion.div
        className="absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url(/full-image-sun.webp)`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
          y: backgroundY,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-500"
        style={{
          backgroundImage: `url(/bottom-image-sun.webp)`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
        }}
      />
      <strong className="absolute bottom-2 z-20 flex animate-bounce flex-row items-center text-lg font-medium text-white md:hidden">
        <ChevronDown />
        Role para continuar
      </strong>
    </div>
  )
}
