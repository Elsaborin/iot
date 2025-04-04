import React from "react";
import { PlusIcon, ClipboardXIcon } from "lucide-react";
import ParcelaCard from "../ParcelaCard";
import type { Parcela } from "../../types/parcela";

interface ParcelasGridProps {
  parcelas: Parcela[];
  viewMode: "grid" | "list";
  showInactives: boolean;
  loading: boolean;
  error: string | null;
}

const ParcelasGrid: React.FC<ParcelasGridProps> = ({ parcelas, viewMode, showInactives, loading, error }) => {
  if (error) {
    return (
      <div className="bg-red-500/10 dark:bg-red-900/20 border border-red-500/30 dark:border-red-500/20 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
        {error}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-16 h-16 border-4 border-[#0066a6] dark:border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (parcelas.length === 0) {
    return (
      <div className="text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md border border-gray-100 dark:border-gray-700">
        <div className="max-w-sm mx-auto">
          {showInactives ? (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                <ClipboardXIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No hay parcelas inactivas
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Todas las parcelas están funcionando correctamente en este momento.
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#e6f2f9] dark:bg-blue-900/30 mb-4">
                <PlusIcon className="w-8 h-8 text-[#0066a6] dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No hay parcelas registradas
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Comienza agregando una nueva parcela para monitorear tus cultivos.
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
      {parcelas.map((parcela) => (
        <ParcelaCard
          key={parcela.id}
          parcela={{
            ...parcela,
            disabled: showInactives
          }}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default ParcelasGrid;