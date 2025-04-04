"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { HomeIcon, SettingsIcon, CloudIcon, CalendarIcon, BarChartHorizontalIcon } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

interface SidebarProps {
  open: boolean
}

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const location = useLocation()
  const [activeItem, setActiveItem] = useState("")

  // Update active item based on current path
  useEffect(() => {
    const path = location.pathname
    if (path === "/" || path === "/dashboard") {
      setActiveItem("dashboard")
    } else if (path.includes("/parcelas")) {
      setActiveItem("parcelas")
    } else if (path.includes("/graficos")) {
      setActiveItem("graficos")
    } else if (path.includes("/configuracion")) {
      setActiveItem("configuracion")
    }
  }, [location])

  return (
    <aside
      className={`fixed top-0 bottom-0 left-0 z-30 flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out overflow-hidden ${
        open ? "w-64" : "w-0 md:w-16"
      }`}
    >
      <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
        <div className={`flex items-center ${!open && "md:hidden"}`}>
          <div className="h-8 w-8 bg-sky-600 rounded-md flex items-center justify-center">
            <CloudIcon className="h-5 w-5 text-white" />
          </div>
          {open && <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">AgroMonitor</span>}
        </div>
        {!open && <CloudIcon className="h-6 w-6 text-sky-600 dark:text-sky-400" />}
      </div>

      <div className="flex-1 flex flex-col overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {/* Dashboard */}
          <Link
            to="/dashboard"
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg ${
              activeItem === "dashboard"
                ? "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveItem("dashboard")}
          >
            <HomeIcon
              className={`mr-3 h-5 w-5 flex-shrink-0 ${
                activeItem === "dashboard" ? "text-sky-700 dark:text-sky-300" : ""
              }`}
            />
            <span className={`${!open && "md:hidden"}`}>Dashboard</span>
          </Link>

          {/* Parcelas */}
          <Link
            to="/parcelas"
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg ${
              activeItem === "parcelas"
                ? "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveItem("parcelas")}
          >
            <CalendarIcon
              className={`mr-3 h-5 w-5 flex-shrink-0 ${
                activeItem === "parcelas" ? "text-sky-700 dark:text-sky-300" : ""
              }`}
            />
            <span className={`${!open && "md:hidden"}`}>Parcelas</span>
          </Link>

          {/* Gráficos */}
          <Link
            to="/graficos"
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-lg ${
              activeItem === "graficos"
                ? "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
            onClick={() => setActiveItem("graficos")}
          >
            <BarChartHorizontalIcon
              className={`mr-3 h-5 w-5 flex-shrink-0 ${
                activeItem === "graficos" ? "text-sky-700 dark:text-sky-300" : ""
              }`}
            />
            <span className={`${!open && "md:hidden"}`}>Gráficos</span>
          </Link>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        
       
      </div>
    </aside>
  )
}

export default Sidebar

