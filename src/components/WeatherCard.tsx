import type React from "react"
import { ThermometerIcon, DropletIcon, CloudRainIcon, SunIcon } from 'lucide-react'

interface WeatherCardProps {
  name: string
  value: string
  icon: "thermometer" | "droplet" | "cloud-rain" | "sun"
  iconType?: "outline" | "solid"
  color: "red" | "blue" | "cyan" | "yellow" | "green"
}

const WeatherCard: React.FC<WeatherCardProps> = ({ name, value, icon, iconType = "outline", color }) => {
  const getIcon = () => {
    switch (icon) {
      case "thermometer":
        return <ThermometerIcon className={`h-4 w-4 text-${color}-500`} />
      case "droplet":
        return <DropletIcon className={`h-4 w-4 text-${color}-500`} />
      case "cloud-rain":
        return <CloudRainIcon className={`h-4 w-4 text-${color}-500`} />
      case "sun":
        return <SunIcon className={`h-4 w-4 text-${color}-500`} />
      default:
        return null
    }
  }

  const getBgColor = () => {
    if (iconType === "solid") {
      return `bg-${color}-500 text-white`
    }
    return `bg-${color}-50 dark:bg-${color}-900/20 text-${color}-700 dark:text-${color}-300`
  }

  return (
    <div className={`flex items-center p-2 rounded-lg ${getBgColor()}`}>
      <div className="mr-2">{getIcon()}</div>
      <div>
        <p className="text-xs opacity-80">{name}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  )
}

export default WeatherCard