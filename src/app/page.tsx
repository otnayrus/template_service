import MainContent from "@/components/MainContent"
import Sidebar from "@/components/Sidebar"

export default function Home() {
  return (
    <main>
      <Sidebar />

      <MainContent>
        <p className="text-2xl">Welcome to your next.js app! 🚀</p>
      </MainContent>
    </main>
  )
}
