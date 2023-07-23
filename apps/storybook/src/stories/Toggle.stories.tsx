import { Toggle } from '@novecirculos/design'

export default {
  title: 'Components/UI/Toggle',
  component: Toggle,
}

export const Default = () => {
  const categories = [
    'Cidade',
    'Conhecimento',
    'Conto',
    'Divindade',
    'Evento',
    'Organização',
    'Personagem',
    'Raça',
    'Região',
    'Reino',
  ]
  return (
    <div className="flex items-center justify-center space-x-4">
      {categories.map((category) => (
        <Toggle key={category}>{category}</Toggle>
      ))}
    </div>
  )
}
