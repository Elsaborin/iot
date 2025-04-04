"use client"

import type React from "react"

import { useNavigate } from "react-router-dom"
import { HomeIcon, Leaf } from "lucide-react"

const NotFound: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex flex-col justify-center items-center p-4">
      <div className="text-center relative max-w-lg">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white dark:bg-slate-800 rounded-full shadow-xl mb-4">
            <Leaf className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300">
            404
          </h1>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Página no encontrada</h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg mb-8">
            La página que estás buscando no existe o ha sido movida.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3.5 border-0 rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotFound

