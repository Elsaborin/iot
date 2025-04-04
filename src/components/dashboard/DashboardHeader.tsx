import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Panel de Control</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Monitoreo en tiempo real de sensores y cultivos</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button
            onClick={() => navigate("/graficos")}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver gráficos
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;