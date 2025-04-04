import React, { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { ArrowLeftIcon, AlertCircleIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import ChartSelector from "../components/graficos/ChartSelector";
import LoadingState from "../components/graficos/LoadingState";
import ErrorState from "../components/graficos/ErrorState";
import HumidityComparisonChart from "../components/graficos/charts/HumidityComparisonChart";
import TimeSeriesChart from "../components/graficos/charts/TimeSeriesChart";
import VariableCorrelationChart from "../components/graficos/charts/VariableCorrelationChart";
import { useSensorData } from "../hooks/useSensorData";

const Graficos: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeChart, setActiveChart] = useState<string>("humidity-comparison");
  const [selectedParcela, setSelectedParcela] = useState<string>("all");
  const { data, loading, error } = useSensorData();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const chartType = params.get("type");
    if (chartType) {
      setActiveChart(chartType);
    }
  }, [location]);

  const renderChartContent = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (!data || !data.activas || data.activas.length === 0) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md h-full flex items-center justify-center">
          <div className="text-center">
            <AlertCircleIcon className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No hay datos disponibles
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              No se encontraron datos para generar las gráficas
            </p>
          </div>
        </div>
      );
    }

    const parcelas = data.activas;

    switch (activeChart) {
      case "humidity-comparison":
        return <HumidityComparisonChart parcelas={parcelas} />;
      case "time-changes":
        return (
          <TimeSeriesChart
            data={{ historicalData: data.historicalData }}
            selectedParcela={selectedParcela}
            parcelas={parcelas}
            onParcelaChange={setSelectedParcela}
          />
        );
      case "variable-correlation":
        return <VariableCorrelationChart data={{ historicalData: data.historicalData }} parcelas={parcelas} />;
      default:
        return <ErrorState message="Seleccione un tipo de gráfico" />;
    }
  };

  return (
    <Layout>
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center px-3 py-1 bg-[#e6f2f9] dark:bg-blue-900/20 text-[#0066a6] dark:text-blue-300 rounded-full text-sm font-medium mb-2">
              <div className="w-2 h-2 rounded-full bg-[#0066a6] dark:bg-blue-400 mr-2"></div>
              <span>Análisis de datos</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">
              Visualización Avanzada
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
              Descubre patrones y tendencias en tus cultivos
            </p>
          </div>
          <div className="mt-6 md:mt-0 flex items-center space-x-3">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center px-5 py-2.5 bg-[#0066a6] text-white rounded-full hover:bg-[#005b8f] transition-colors shadow-md hover:shadow-lg"
            >
              <ArrowLeftIcon className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <ChartSelector activeChart={activeChart} onChartChange={setActiveChart} />
        </div>
        <div className="lg:col-span-9">{renderChartContent()}</div>
      </div>
    </Layout>
  );
};

export default Graficos;