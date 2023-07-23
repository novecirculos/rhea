import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Label,
} from '@novecirculos/design'

export default {
  title: 'Components/UI/Tooltip',
  component: Tooltip,
}

export const Default = () => {
  return (
    <Tooltip>
      <div className="flex flex-col items-center">
        <TooltipTrigger asChild>
          <Avatar size="lg" className="hover:cursor-pointer">
            <AvatarImage
              src="https://media.graphassets.com/cXbzU4Tuyli9g6cRIHQt"
              alt="lorderon"
            />
            <AvatarFallback>L</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <Label className="mt-1">Coloque o mouse sobre o avatar</Label>
      </div>

      <TooltipContent side="top">
        <p>Lorderon</p>
      </TooltipContent>
    </Tooltip>
  )
}
