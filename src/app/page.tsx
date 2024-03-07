import MainContent from "@/components/MainContent"
import Sidebar from "@/components/Sidebar"
import SidebarButton from "@/components/SidebarButton"

export default function Home() {
  return (
    <main>
      <SidebarButton />
      <Sidebar />

      <MainContent>
        <p className="text-2xl">Welcome to your next.js app! 🚀</p>
      </MainContent>
    </main>
  )
}
