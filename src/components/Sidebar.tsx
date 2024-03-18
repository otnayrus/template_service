"use client"
import SigninIcon from "@/components/icons/SigninIcon"
import SignupIcon from "@/components/icons/SignupIcon"
import SidebarDropdownElement from "@/components/SidebarDropdownElement"
import { useState } from "react"
import SidebarButton from "./SidebarButton"

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <>
      <SidebarButton toggleSidebar={toggleSidebar} />
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          sidebarOpen ? "" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <SidebarDropdownElement />
            <li>
              <a
                href="signin"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <SigninIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </a>
            </li>
            <li>
              <a
                href="/signup"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <SignupIcon />
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
