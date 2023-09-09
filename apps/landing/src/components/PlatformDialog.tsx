import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui'

export const PlatformDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-8 drop-shadow-2xl">Ouvir agora</Button>
      </DialogTrigger>
      <DialogContent className="gap-11">
        <DialogHeader>
          <DialogTitle>🎧 Escolha a plataforma</DialogTitle>
          <DialogDescription>
            <span className="mt-11 block max-w-xs text-left text-sm text-gray-500 md:max-w-full">
              Selecione uma plataforma para você escutar
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 md:grid-cols-3">
          <Button
            variant="outline"
            className="flex-1 justify-start gap-2 border-gray-950 px-2 py-7 hover:border-gray-50 hover:bg-gray-950 dark:bg-white/5 dark:hover:text-gray-50 md:px-0"
          >
            <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-sm bg-[#1DB954]/25">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.6875 0.8125C15 0.8125 19.375 5.1875 19.375 10.5C19.375 15.8516 15 20.1875 9.6875 20.1875C4.33594 20.1875 0 15.8516 0 10.5C0 5.1875 4.33594 0.8125 9.6875 0.8125ZM13.5938 15.0703C13.9062 15.0703 14.1797 14.8359 14.1797 14.4844C14.1797 14.1328 14.0625 13.9766 13.8281 13.8203C11.0156 12.1797 7.77344 12.1016 4.57031 12.8047C4.25781 12.8828 4.02344 13.0781 4.02344 13.4688C4.02344 13.7812 4.25781 14.0938 4.64844 14.0938C4.76562 14.0938 4.96094 14.0156 5.11719 13.9766C7.92969 13.4297 10.7422 13.4688 13.2031 14.9531C13.3203 15.0312 13.4375 15.0703 13.5938 15.0703ZM14.6484 12.5312C15.0781 12.5312 15.3906 12.1797 15.4297 11.75C15.4297 11.4375 15.2734 11.1641 14.9609 11.0078C13.0469 9.83594 10.5859 9.21094 8.04688 9.21094C6.44531 9.21094 5.3125 9.44531 4.21875 9.75781C3.82812 9.875 3.63281 10.1484 3.63281 10.5391C3.63281 10.9688 3.98438 11.3203 4.375 11.3203C4.57031 11.3203 4.64844 11.2422 4.84375 11.2031C8.08594 10.3438 11.7188 10.9297 14.1797 12.375C14.2969 12.4141 14.4531 12.5312 14.6484 12.5312ZM15.8594 9.5625C16.3281 9.5625 16.7578 9.17188 16.7578 8.625C16.7578 8.15625 16.5625 7.92188 16.25 7.76562C14.1016 6.47656 11.0938 5.89062 8.24219 5.89062C6.5625 5.89062 5.03906 6.08594 3.67188 6.47656C3.32031 6.59375 2.96875 6.86719 2.96875 7.41406C2.96875 7.92188 3.35938 8.35156 3.86719 8.35156C4.0625 8.35156 4.25781 8.27344 4.375 8.23438C7.61719 7.33594 12.5781 7.72656 15.3516 9.40625C15.5469 9.48438 15.6641 9.5625 15.8594 9.5625Z"
                  fill="#1DB954"
                />
              </svg>
            </span>
            Spotify
          </Button>
          <Button variant="outline" className="flex-1">
            Apple Podcasts
          </Button>
          <Button variant="outline" className="flex-1">
            Google Podcasts
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
