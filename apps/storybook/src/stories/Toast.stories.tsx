import { ToastAction, Button } from '@novecirculos/design'
import { useToast } from '@novecirculos/toast-context'

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
            title: 'Scheduled: Catch up ',
            description: 'Friday, February 10, 2023 at 5:57 PM',
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          })
        }}
      >
        Add to calendar
      </Button>
    </div>
  )
}
