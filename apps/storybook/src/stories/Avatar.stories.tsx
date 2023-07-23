import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Label,
} from '@novecirculos/design'

export default {
  title: 'Components/UI/Avatar',
  component: Avatar,
  subcomponents: { AvatarFallback, AvatarImage },
}

type sizeType = 'default' | 'md' | 'lg'

export const Default = () => {
  const sizes: sizeType[] = ['default', 'md', 'lg']

  return (
    <div className="flex justify-center space-x-4">
      {sizes.map((size) => (
        <section className="flex flex-col">
          <Avatar key={size} size={size}>
            <AvatarImage
              src="https://media.graphassets.com/cXbzU4Tuyli9g6cRIHQt"
              alt="novecirculos"
            />
            <AvatarFallback>L</AvatarFallback>
          </Avatar>
          <Label className="mx-auto mt-2">{size}</Label>
        </section>
      ))}
    </div>
  )
}
