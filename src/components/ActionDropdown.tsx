import { useEffect, useRef, useState } from "react"
import DropdownArrowIcon from "./icons/DropdownArrowIcon"

const ActionDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="actionsDropdownButton"
        onClick={toggleDropdown}
        className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        type="button"
      >
        <DropdownArrowIcon />
        Actions
      </button>
      {isOpen && (
        <div
          id="actionsDropdown"
          className="absolute z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="actionsDropdownButton"
          >
            <li>
              <a
                href="#"
                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Mass Edit
              </a>
            </li>
          </ul>
          <div className="py-1">
            <a
              href="#"
              className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Delete all
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default ActionDropdown
