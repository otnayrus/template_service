"use client"

import React, { useEffect, useRef, useState } from "react"

type TableMetaProps = {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  from: number
  to: number
}

class TableMaker {
  collection: any[] = []
  headers: { key: string; display: string }[] = []
  meta: TableMetaProps = {
    total: 0,
    perPage: 0,
    currentPage: 0,
    lastPage: 0,
    from: 0,
    to: 0,
  }

  constructor(
    payload: any[] = [],
    headers: { key: string; display: string }[] = [],
  ) {
    Object.assign(this.collection, payload)
    Object.assign(this.headers, headers)
  }

  getHeaders(): string[] {
    return this.headers.map((h) => h.display)
  }

  getRows(): any[] {
    return this.collection.map((item) => {
      return this.headers.map((h) => item[h.key])
    })
  }
}


const ThreeDotsDropdown = ({ options }: { options: { label: string }[] }) => {
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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        id="dropdown-button"
        onClick={toggleDropdown}
        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
        type="button"
      >
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 z-10">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            {options.map((option, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {option.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

const CompactTable: any = ({
  headers,
  rows,
  rowActions,
}: {
  headers?: string[]
  rows?: any[][] // 2D array
  rowActions?: { label: string }[]
}) => {
  return (
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {headers &&
            headers.map((h, i) => (
              <th key={i} className="px-4 py-3">
                {h}
              </th>
            ))}
          <th scope="col" className="px-4 py-3">
            <span className="sr-only">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((row, i) => (
            <tr className="border-b dark:border-gray-700" key={i}>
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3">
                  {cell}
                </td>
              ))}
              {rowActions && (
                <td className="px-4 py-3">
                  <ThreeDotsDropdown
                    options={rowActions.map((action) => ({
                      label: action.label,
                    }))}
                  />
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  )
}

const TableMeta: React.FC<TableMetaProps> = ({
  total,
  perPage,
  currentPage,
  lastPage,
  from,
  to,
}) => {
  return (
    <nav
      className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400 space-x-1">
        <span>Showing</span>
        <span className="font-semibold text-gray-900 dark:text-white">
          {from}-{to}
        </span>
        <span>of</span>
        <span className="font-semibold text-gray-900 dark:text-white">
          {total}
        </span>
      </span>
      <div className="flex items-center space-x-3">
        {currentPage > 1 && (
          <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            {`< Prev`}
          </button>
        )}
        {currentPage < lastPage && (
          <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
            {`Next >`}
          </button>
        )}
      </div>
    </nav>
  )
}

export default function Roles() {
  const tableMaker = new TableMaker(
    [
      {
        name: "Monitor BenQ EX2710Q",
        category: "TV/Monitor",
        brand: "BenQ",
        description: "354",
        price: "$499",
      },
    ],
    [
      { key: "name", display: "Name" },
      { key: "category", display: "Category" },
      { key: "brand", display: "Brand" },
      { key: "description", display: "Description" },
    ]
  )

  return (
    <>
      <p className="text-2xl">Roles</p>
      <div className="bg-white dark:bg-gray-800 relative sm:rounded-lg space-y-3">
        <CompactTable
          headers={tableMaker.getHeaders()}
          rows={tableMaker.getRows()}
          rowActions={[{ label: "Edit" }, { label: "Delete" }]}
        />
        <TableMeta
          total={1000}
          perPage={10}
          currentPage={2}
          lastPage={100}
          from={1}
          to={10}
        />
      </div>
    </>
  )
}
