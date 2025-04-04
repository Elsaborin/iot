import React, { useState, useEffect } from "react";
import { ThermometerIcon, DropletIcon, CloudRainIcon, SunIcon, AlertCircleIcon } from "lucide-react";
import axios from "axios";

interface ApiResponse {
  sensores: {
    temperatura: number;
    humedad: number;
    lluvia: number;
    sol: number;
  };
  parcelas: any[];
}

const defaultSensorData = {
  temperatura: 0,
  humedad: 0,
  lluvia: 0,
  sol: 0
};

const SensorCards: React.FC = () => {
  const [sensorData, setSensorData] = useState(defaultSensorData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<ApiResponse>("https://moriahmkt.com/iotapp/updated/");
        if (response.data?.sensores) {
          setSensorData(response.data.sensores);
          setLastUpdate(new Date());
          setError(null);
        } else {
          setError("No hay datos de sensores disponibles");
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error);
        setError("Error al obtener datos de los sensores");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Update data every minute (60000 milliseconds)
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-100 dark:border-slate-700 animate-pulse">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              <div className="ml-3 h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
            <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-md border border-slate-100 dark:border-slate-700">
        <div className="flex flex-col items-center justify-center text-center">
          <AlertCircleIcon className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Sin datos disponibles</h3>
          <p className="text-slate-500 dark:text-slate-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Temperatura Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <ThermometerIcon className="h-6 w-6 text-red-500" />
            </div>
            <span className="ml-3 text-slate-500 dark:text-slate-400 font-medium">Temperatura</span>
          </div>
          <div className="text-4xl font-bold text-red-500">{sensorData.temperatura.toFixed(1)} °C</div>
        </div>

        {/* Humedad Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <DropletIcon className="h-6 w-6 text-blue-500" />
            </div>
            <span className="ml-3 text-slate-500 dark:text-slate-400 font-medium">Humedad</span>
          </div>
          <div className="text-4xl font-bold text-blue-500">{sensorData.humedad.toFixed(1)}%</div>
        </div>

        {/* Lluvia Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center">
              <CloudRainIcon className="h-6 w-6 text-cyan-500" />
            </div>
            <span className="ml-3 text-slate-500 dark:text-slate-400 font-medium">Lluvia</span>
          </div>
          <div className="text-4xl font-bold text-cyan-500">{sensorData.lluvia.toFixed(1)} mm</div>
        </div>

        {/* Intensidad del sol Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-100 dark:border-slate-700">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
              <SunIcon className="h-6 w-6 text-amber-500" />
            </div>
            <span className="ml-3 text-slate-500 dark:text-slate-400 font-medium">Intensidad del sol</span>
          </div>
          <div className="text-4xl font-bold text-amber-500">{sensorData.sol.toFixed(1)}%</div>
        </div>
      </div>

      {lastUpdate && (
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          Última actualización: {lastUpdate.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default SensorCards;