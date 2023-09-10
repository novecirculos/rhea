import type { CSSProperties } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui'
import {
  ApplePodcastsIcon,
  GooglePodcastsIcon,
  SpotifyIcon,
} from '../assets/Icons'

const PlatformButton = ({
  source,
}: {
  source: 'Apple' | 'Google' | 'Spotify'
}) => {
  const platformStyles = {
    spotify: {
      title: 'Spotify',
      color: '#1DB954',
      icon: <SpotifyIcon />,
      link: 'https://open.spotify.com/show/2SkgWMa36aTgoHq3aGfJ4i?si=b5110f0db8004be5',
    },
    apple: {
      title: 'Apple Podcasts',
      color: '#832BC1',
      icon: <ApplePodcastsIcon />,
      link: 'https://podcasts.apple.com/us/podcast/nove-c%C3%ADrculos-rpg/id1705487519',
    },
    google: {
      title: 'Google Podcasts',
      color: '#0066D9',
      icon: <GooglePodcastsIcon />,
      link: '',
    },
  }
  const platform = platformStyles[source.toLowerCase()]

  return (
    <a
      href={platform.link}
      className="hover:text-accent-foreground ring-offset-background focus-visible:ring-ring inline-flex max-h-8 flex-1 items-center justify-start gap-2 rounded-md border border-gray-950 bg-transparent px-2 py-7 text-sm font-medium transition-colors hover:border-gray-50 hover:bg-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:bg-white/5 dark:text-gray-50 dark:hover:text-gray-50 md:px-0"
    >
      <span
        className={`ml-2 flex h-8 w-8 items-center justify-center rounded-sm bg-[${platform.color}]/25}`}
      >
        {platform.icon}
      </span>
      {platform.title}
    </a>
  )
}

export const PlatformDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-8 drop-shadow-2xl">Ouvir agora</Button>
      </DialogTrigger>
      <DialogContent className="gap-11 md:min-w-[653px]">
        <DialogHeader>
          <DialogTitle>🎧 Escolha a plataforma</DialogTitle>
          <DialogDescription>
            <span className="mt-11 block max-w-xs text-left text-sm text-gray-500 md:max-w-full">
              Selecione uma plataforma para você escutar
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 md:grid-cols-3">
          <PlatformButton source="Spotify" />
          <PlatformButton source="Apple" />
          <PlatformButton source="Google" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
