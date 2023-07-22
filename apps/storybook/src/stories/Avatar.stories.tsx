import { Avatar, AvatarFallback, AvatarImage } from '@novecirculos/design'

export default {
  title: 'Components/UI/Avatar',
  component: Avatar,
  subcomponents: { AvatarFallback, AvatarImage },
}

export const Default = () => {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/araujooj.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}
