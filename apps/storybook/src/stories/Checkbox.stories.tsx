import { Checkbox, Label } from '@novecirculos/design'

export default {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
  subcomponents: { Label },
}

export function Default() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  )
}
