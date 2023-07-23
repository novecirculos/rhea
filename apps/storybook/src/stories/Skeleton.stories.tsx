import { Card, CardContent, CardHeader, Skeleton } from '@novecirculos/design'

export default {
  title: 'Components/UI/Skeleton',
  component: Skeleton,
}

export const Default = () => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <Card>
        <CardHeader>
          <Skeleton className="h-12 w-12 rounded-full" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
