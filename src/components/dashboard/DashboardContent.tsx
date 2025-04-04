import React from "react";
import type { ApiResponse } from "../../types/api-types";
import SensorCards from "../SensorCards";
import MapView from "./MapView";
import ErrorState from "./ErrorState";

interface DashboardContentProps {
  apiData: ApiResponse;
  error: string | null;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ apiData, error }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
      <div className="w-full lg:w-[60%] bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 p-4 transition-all duration-300 hover:shadow-lg">
        {error ? (
          <div className="h-full flex flex-col">
            <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Mapa de ubicaciones</h2>
            <div className="flex-1 flex items-center justify-center">
              <ErrorState message={error} />
            </div>
          </div>
        ) : (
          <MapView parcelas={apiData.parcelas} />
        )}
      </div>
      
      <div className="w-full lg:w-[40%]">
        <SensorCards
          temperatura={apiData.sensores.temperatura}
          humedad={apiData.sensores.humedad}
          lluvia={apiData.sensores.lluvia}
          sol={apiData.sensores.sol}
        />
      </div>
    </div>
  );
};

export default DashboardContent;