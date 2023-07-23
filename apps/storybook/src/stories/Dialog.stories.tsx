import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@novecirculos/design'

export default {
  title: 'Components/UI/Dialog',
  component: Dialog,
}

export function Default() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Editar personagem</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar personagem</DialogTitle>
            <DialogDescription>
              Faça as mudanças nas características do seu personagem aqui.
              Clique em salvar quando estiver pronto!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input id="name" defaultValue="Lorderon" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Classe
              </Label>
              <Select defaultValue="mago">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione uma classe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Classes</SelectLabel>
                    <SelectItem value="mago">Mago</SelectItem>
                    <SelectItem value="ladino">Ladino</SelectItem>
                    <SelectItem value="guerreiro">Guerreiro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
