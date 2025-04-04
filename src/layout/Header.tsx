"use client"

import type React from "react"
import { MenuIcon, BarChart2, BellIcon, SearchIcon } from "lucide-react"
import ThemeToggle from "../components/ThemeToggle"
import UserMenu from "../ui/UserMenu"
import { useState } from "react"

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Alerta de humedad", message: "Parcela 3 tiene niveles bajos de humedad", time: "Hace 2h" },
    {
      id: 2,
      title: "Mantenimiento programado",
      message: "Sensor de temperatura requiere calibración",
      time: "Hace 5h",
    },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 h-16">
      <div className="px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center">
            <button
              type="button"
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white focus:outline-none transition-colors duration-200"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <MenuIcon className="h-5 w-5" />
            </button>

            <div className="flex items-center ml-4">
              <div className="bg-gradient-to-br from-sky-500 to-sky-600 p-2.5 rounded-lg shadow-lg">
                <BarChart2 className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                Moni<span className="text-sky-600 dark:text-sky-400">Parce</span>
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
           

           

            <ThemeToggle />

            <div className="border-l border-gray-200 dark:border-gray-700 h-6 mx-2"></div>

            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

