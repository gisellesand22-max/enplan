import { PanelNav, PanelSidebar } from '../../components/PanelNav'
import { TopBar } from '../../components/TopBar'

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:flex">
      <PanelSidebar />
      <div className="flex-1">
        <TopBar />
        <main className="mx-auto max-w-3xl px-5 pb-24 pt-6 md:pb-10">{children}</main>
      </div>
      <PanelNav />
    </div>
  )
}
