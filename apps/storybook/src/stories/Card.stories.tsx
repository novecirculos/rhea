import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@novecirculos/design'

export default {
  title: 'Components/UI/Card',
  component: Button,
}

export function CardWithForm() {
  return (
    <Card className="mx-auto w-[350px]">
      <CardHeader>
        <CardTitle>Criar um artigo</CardTitle>
        <CardDescription>
          Compartilhe as suas ideias com o nosso universo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" placeholder="Título do artigo" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Categoria</Label>
              <Select>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="divinity">Divindade</SelectItem>
                  <SelectItem value="event">Evento</SelectItem>
                  <SelectItem value="region">Região</SelectItem>
                  <SelectItem value="reign">Reino</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancelar</Button>
        <Button>Criar</Button>
      </CardFooter>
    </Card>
  )
}
