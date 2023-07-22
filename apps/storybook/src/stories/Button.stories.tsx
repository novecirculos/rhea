import { Button } from '@novecirculos/design'

export default {
  title: 'Components/UI/Button',
  component: Button,
}

type ButtonVariants =
  | 'default'
  | 'destructive'
  | 'matching'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'

export const AllVariants = () => {
  const variantNames: ButtonVariants[] = [
    'default',
    'secondary',
    'destructive',
    'ghost',
    'link',
    'outline',
  ]

  return (
    <div className="mx-auto grid w-full max-w-sm grid-cols-1 gap-4">
      {variantNames.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Button>
      ))}
    </div>
  )
}
