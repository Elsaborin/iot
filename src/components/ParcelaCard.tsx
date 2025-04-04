import type React from "react"
import {
  MapPinIcon,
  UserIcon,
  Leaf,
  DropletIcon,
  MoreVerticalIcon,
  AlertTriangleIcon,
  ThermometerIcon,
} from "lucide-react"

interface Sensor {
  temperatura: number
  humedad: number
  lluvia: number
  sol: number
}

interface Parcela {
  id: number
  nombre: string
  ubicacion: string
  responsable: string
  tipo_cultivo: string
  sensor: Sensor
  ultimo_riego: string
  disabled?: boolean
}

interface ParcelaCardProps {
  parcela: Parcela
  viewMode?: "grid" | "list"
}

const ParcelaCard: React.FC<ParcelaCardProps> = ({ parcela, viewMode = "grid" }) => {
  const hasWarning = !parcela.disabled && (parcela.sensor.humedad < 30 || parcela.sensor.temperatura > 30)

  if (viewMode === "list") {
    return (
      <div
        className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 
        ${parcela.disabled ? "opacity-50 grayscale cursor-not-allowed" : "hover:shadow-md"} 
        transition-all duration-300 relative`}
      >
        {parcela.disabled && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs z-10">
            Inactiva
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center p-4">
          <div className="flex items-center mb-3 md:mb-0 md:mr-6">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                hasWarning
                  ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                  : "bg-[#e6f2f9] dark:bg-blue-900/30 text-[#0066a6] dark:text-blue-400"
              }`}
            >
              {hasWarning ? <AlertTriangleIcon className="w-5 h-5" /> : <Leaf className="w-5 h-5" />}
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">{parcela.nombre}</h3>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <MapPinIcon className="w-3 h-3 mr-1" />
                <p className="text-xs">{parcela.ubicacion}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 md:ml-auto">
            <div className="flex items-center px-2 py-1 bg-red-50 dark:bg-red-900/30 rounded text-xs">
              <ThermometerIcon className="w-3 h-3 mr-1 text-red-500 dark:text-red-400" />
              <span className="text-red-700 dark:text-red-400">
                {parcela.disabled ? "--" : `${parcela.sensor.temperatura}°C`}
              </span>
            </div>
            <div className="flex items-center px-2 py-1 bg-[#e6f2f9] dark:bg-blue-900/30 rounded text-xs">
              <DropletIcon className="w-3 h-3 mr-1 text-[#0066a6] dark:text-blue-400" />
              <span className="text-[#0066a6] dark:text-blue-400">
                {parcela.disabled ? "--" : `${parcela.sensor.humedad}%`}
              </span>
            </div>
            <div className="flex items-center px-2 py-1 bg-gray-50 dark:bg-gray-700 rounded text-xs">
              <UserIcon className="w-3 h-3 mr-1 text-gray-500 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{parcela.responsable}</span>
            </div>
            <div className="flex items-center px-2 py-1 bg-[#e6f2f9] dark:bg-blue-900/30 rounded text-xs">
              <Leaf className="w-3 h-3 mr-1 text-[#0066a6] dark:text-blue-400" />
              <span className="text-[#0066a6] dark:text-blue-400">{parcela.tipo_cultivo}</span>
            </div>
          </div>

          <button className="ml-4 p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300">
            <MoreVerticalIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border 
      ${hasWarning ? "border-yellow-200 dark:border-yellow-700" : "border-gray-100 dark:border-gray-700"} 
      ${parcela.disabled ? "opacity-50 grayscale cursor-not-allowed" : "hover:shadow-lg"} 
      transition-all duration-300 relative overflow-hidden`}
    >
      {parcela.disabled && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs z-10">Inactiva</div>
      )}

      <div className="mb-4 flex justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#0066a6] dark:group-hover:text-blue-400 transition-colors">
            {parcela.nombre}
          </h3>
          <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1">
            <MapPinIcon className="w-4 h-4 mr-1" />
            <p className="text-sm">{parcela.ubicacion}</p>
          </div>
        </div>
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center ${
            hasWarning
              ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
              : "bg-[#e6f2f9] dark:bg-blue-900/30 text-[#0066a6] dark:text-blue-400"
          }`}
        >
          {hasWarning ? <AlertTriangleIcon className="w-5 h-5" /> : <Leaf className="w-5 h-5" />}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-sm flex items-center">
          <UserIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-2" />
          <div>
            <p className="text-gray-500 dark:text-gray-400">Responsable</p>
            <p className="text-gray-900 dark:text-white font-medium">{parcela.responsable}</p>
          </div>
        </div>
        <div className="text-sm flex items-center">
          <Leaf className="w-4 h-4 text-gray-400 dark:text-gray-500 mr-2" />
          <div>
            <p className="text-gray-500 dark:text-gray-400">Cultivo</p>
            <p className="text-gray-900 dark:text-white font-medium">{parcela.tipo_cultivo}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <ThermometerIcon className="w-4 h-4 text-red-500 dark:text-red-400 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Temperatura</span>
              </div>
              <span className="text-red-600 dark:text-red-400 font-bold">
                {parcela.disabled ? "--" : `${parcela.sensor.temperatura}°C`}
              </span>
            </div>
            {!parcela.disabled && (
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div
                  className="bg-red-500 dark:bg-red-400 h-2.5 rounded-full"
                  style={{ width: `${Math.min(parcela.sensor.temperatura * 2, 100)}%` }}
                ></div>
              </div>
            )}
          </div>

          <div className="bg-[#f8fafc] dark:bg-gray-700/50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <DropletIcon className="w-4 h-4 text-[#0066a6] dark:text-blue-400 mr-2" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Humedad</span>
              </div>
              <span className="text-[#0066a6] dark:text-blue-400 font-bold">
                {parcela.disabled ? "--" : `${parcela.sensor.humedad}%`}
              </span>
            </div>
            {!parcela.disabled && (
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div
                  className="bg-[#0066a6] dark:bg-blue-400 h-2.5 rounded-full"
                  style={{ width: `${parcela.sensor.humedad}%` }}
                ></div>
              </div>
            )}
          </div>

          <div className="bg-[#f8fafc] dark:bg-gray-700/50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-[#00a8e8] dark:text-blue-400 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2v1M12 21v1M4.2 4.2l.7.7M19.1 19.1l.7.7M2 12h1M21 12h1M4.2 19.8l.7-.7M19.1 4.9l.7-.7" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">Lluvia</span>
              </div>
              <span className="text-[#00a8e8] dark:text-blue-400 font-bold">
                {parcela.disabled ? "--" : `${parcela.sensor.lluvia}mm`}
              </span>
            </div>
            {!parcela.disabled && (
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div
                  className="bg-[#00a8e8] dark:bg-blue-400 h-2.5 rounded-full"
                  style={{ width: `${Math.min(parcela.sensor.lluvia * 2, 100)}%` }}
                ></div>
              </div>
            )}
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 text-amber-500 dark:text-amber-400 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" />
                  <path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" />
                  <path d="m19.07 4.93-1.41 1.41" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-300">Intensidad del sol</span>
              </div>
              <span className="text-amber-600 dark:text-amber-400 font-bold">
                {parcela.disabled ? "--" : `${parcela.sensor.sol}%`}
              </span>
            </div>
            {!parcela.disabled && (
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                <div
                  className="bg-amber-500 dark:bg-amber-400 h-2.5 rounded-full"
                  style={{ width: `${parcela.sensor.sol}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
        <DropletIcon className="w-4 h-4 mr-2 text-[#0066a6] dark:text-blue-400" />
        <p>
          Último riego:{" "}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {parcela.disabled ? "--" : new Date(parcela.ultimo_riego).toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  )
}

export default ParcelaCard