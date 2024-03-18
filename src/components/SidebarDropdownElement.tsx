"use client"
import { useState } from "react"
import UserIcon from "@/components/icons/UserIcon"
import DropdownArrowIcon from "@/components/icons/DropdownArrowIcon"

const SidebarDropdownElement = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <li>
      <button
        type="button"
        className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
        aria-controls="dropdown-example"
        onClick={toggleDropdown}
      >
        <UserIcon />
        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
          Roles & Access
        </span>
        <DropdownArrowIcon isOpen={isOpen} />
      </button>
      {isOpen && (
        <ul id="dropdown-example" className="py-2 space-y-2">
          <li>
            <a
              href="/rbac/roles"
              className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              Roles
            </a>
          </li>
          <li>
            <a
              href="/rbac/access"
              className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              Access
            </a>
          </li>
        </ul>
      )}
    </li>
  )
}

export default SidebarDropdownElement
