"use client"

import type React from "react"

import { type ReactNode, useState } from "react"
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

interface LayoutProps {
  children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 pt-16">
        {" "}
        {/* Add pt-16 to account for fixed header height */}
        <Sidebar open={sidebarOpen} />
        <main
          className={`flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-all duration-300 ease-in-out ${
            sidebarOpen ? "md:ml-64" : "md:ml-16"
          }`}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  )
}

export default Layout