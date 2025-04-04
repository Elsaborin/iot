"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { SunIcon, MoonIcon } from "lucide-react"

const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check if user has a preference stored
    const isDark =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)

    setDarkMode(isDark)

    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label={darkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {darkMode ? <SunIcon className="h-5 w-5 text-amber-500" /> : <MoonIcon className="h-5 w-5" />}
    </button>
  )
}

export default ThemeToggle

