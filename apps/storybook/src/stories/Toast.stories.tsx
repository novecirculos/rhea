import { ToastAction, Button } from '@novecirculos/design'
import { useToast } from '@novecirculos/context'

export default {
  title: 'Components/UI/Toast',
  component: ToastAction,
}

export const Default = () => {
  const { toast } = useToast()
  return (
    <div className="flex justify-center">
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Postagem de artigo agendada!',
            description: 'Sexta, 10 de Agosto, 2023',
            action: (
              <ToastAction altText="Desfazer agendamento">Desfazer</ToastAction>
            ),
          })
        }}
      >
        Agendar postagem
      </Button>
    </div>
  )
}
