import React from "react";
import { GridIcon, ListIcon } from "lucide-react";

interface ParcelasToolbarProps {
  showInactives: boolean;
  viewMode: "grid" | "list";
  onToggleInactives: (show: boolean) => void;
  onChangeViewMode: (mode: "grid" | "list") => void;
}

const ParcelasToolbar: React.FC<ParcelasToolbarProps> = ({
  showInactives,
  viewMode,
  onToggleInactives,
  onChangeViewMode,
}) => {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex space-x-2 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => onToggleInactives(true)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
              showInactives
                ? "bg-[#0066a6] text-white font-medium"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Parcelas inactivas
          </button>
          <button
            onClick={() => onToggleInactives(false)}
            className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
              !showInactives
                ? "bg-[#0066a6] text-white font-medium"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            Parcelas activas
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onChangeViewMode("grid")}
            className={`p-2 rounded-lg ${
              viewMode === "grid"
                ? "bg-[#e6f2f9] dark:bg-blue-900/20 text-[#0066a6] dark:text-blue-300"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <GridIcon className="h-5 w-5" />
          </button>
          <button
            onClick={() => onChangeViewMode("list")}
            className={`p-2 rounded-lg ${
              viewMode === "list"
                ? "bg-[#e6f2f9] dark:bg-blue-900/20 text-[#0066a6] dark:text-blue-300"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <ListIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParcelasToolbar;