import { SidebarItem } from './sidebar-item'

export async function SidebarList() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="space-y-2 px-2">
        <SidebarItem path="/" title="Cenas" />
        <SidebarItem path="/transcriptions" title="Transcrições" />
      </div>
    </div>
  )
}
