import { Button } from '@novecirculos/ui'
import { withRequiredRoles } from '~/hooks/withRequiredRoles'

function ExportArticles() {
  const handleExport = async () => {
    const response = await fetch('/api/content/export', { method: 'POST' })
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `articles-${new Date().toISOString()}.zip`) // or any other filename you want
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <div className="flex h-full items-center justify-center">
      <Button onClick={handleExport}>Exportar artigos</Button>
    </div>
  )
}

export default withRequiredRoles(ExportArticles, ['Admin'])
