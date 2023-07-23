import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@novecirculos/design'

export default {
  title: 'Components/Forms/Select',
  component: Select,
}

export function Default() {
  return (
    <div>
      <Select>
        <SelectTrigger className="max-w-xs">
          <SelectValue
            className="dark:text-gray-50"
            placeholder="Selecione uma divindade"
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Divindades</SelectLabel>
            <SelectItem value="gofthar">Gofthar</SelectItem>
            <SelectItem value="ranwind">Ranwind</SelectItem>
            <SelectItem value="rhea">Rhéa</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
