import React from "react"

interface SummaryCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  change?: {
    value: number
    isPositive: boolean
  }
  color: "blue" | "cyan" | "purple" | "green" | "yellow" | "red"
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color }) => {
  const getIconBgColor = () => {
    switch (color) {
      case "blue":
        return "bg-blue-50 dark:bg-blue-900/20"
      case "cyan":
        return "bg-cyan-50 dark:bg-cyan-900/20"
      case "purple":
        return "bg-purple-50 dark:bg-purple-900/20"
      case "green":
        return "bg-green-50 dark:bg-green-900/20"
      case "yellow":
        return "bg-amber-50 dark:bg-amber-900/20"
      case "red":
        return "bg-red-50 dark:bg-red-900/20"
      default:
        return "bg-blue-50 dark:bg-blue-900/20"
    }
  }

  const getTextColor = () => {
    switch (color) {
      case "blue":
        return "text-blue-500 dark:text-blue-400"
      case "cyan":
        return "text-cyan-500 dark:text-cyan-400"
      case "purple":
        return "text-purple-500 dark:text-purple-400"
      case "green":
        return "text-green-500 dark:text-green-400"
      case "yellow":
        return "text-amber-500 dark:text-amber-400"
      case "red":
        return "text-red-500 dark:text-red-400"
      default:
        return "text-blue-500 dark:text-blue-400"
    }
  }

  const getIconColor = () => {
    switch (color) {
      case "blue":
        return "text-blue-500 dark:text-blue-400"
      case "cyan":
        return "text-cyan-500 dark:text-cyan-400"
      case "purple":
        return "text-purple-500 dark:text-purple-400"
      case "green":
        return "text-green-500 dark:text-green-400"
      case "yellow":
        return "text-amber-500 dark:text-amber-400"
      case "red":
        return "text-red-500 dark:text-red-400"
      default:
        return "text-blue-500 dark:text-blue-400"
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm h-full p-6 hover:shadow-md transition-all duration-300">
      <div className="flex flex-col h-full">
        <div className="flex items-start">
          <div className={`${getIconBgColor()} p-3 rounded-lg w-12 h-12 flex items-center justify-center`}>
            {React.cloneElement(icon as React.ReactElement, {
              className: `w-6 h-6 ${getIconColor()}`,
            })}
          </div>
          <div className="ml-3">
            <h3 className="text-base font-medium text-slate-500 dark:text-slate-400">{title}</h3>
          </div>
        </div>
        <div className="mt-3">
          <p className={`text-3xl font-bold ${getTextColor()}`}>{value}</p>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard

