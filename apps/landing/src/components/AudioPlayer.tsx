import { useRef, useEffect, useState } from 'react'
import { Play, Pause } from 'lucide-react'
import { Slider } from './ui'
import TeaserAudio from '../assets/teaser.mp3'

export const AudioPlayer = () => {
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = audioRef.current

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime)
      setDuration(audio.duration)
    }

    if (playing) {
      audio.play()
    } else {
      audio.pause()
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [playing])

  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <>
      <audio preload="auto" ref={audioRef} src={TeaserAudio} />
      <button
        onClick={() => setPlaying(!playing)}
        className="bg-primary absolute -top-[32px] right-[16px] w-min rounded-full p-4 md:left-[16px]"
      >
        {playing ? <Pause fill="#fff" /> : <Play fill="#fff" />}
        <span className="sr-only">Escutar trailer</span>
      </button>
      <Slider
        value={[currentTime]}
        max={duration}
        onValueChange={handleSliderChange}
      />
      <span className="ml-1 text-gray-400">
        {formatTime(currentTime)} - 07:11
      </span>
    </>
  )
}
