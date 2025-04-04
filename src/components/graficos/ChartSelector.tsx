import React from "react";
import { BarChart3Icon, LineChartIcon, BarChartHorizontalIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ChartOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ChartSelectorProps {
  activeChart: string;
  onChartChange: (chartId: string) => void;
}

const ChartSelector: React.FC<ChartSelectorProps> = ({ activeChart, onChartChange }) => {
  const navigate = useNavigate();

  const chartOptions: ChartOption[] = [
    {
      id: "humidity-comparison",
      title: "Comparación de humedad",
      description: "Análisis por parcela",
      icon: <BarChartHorizontalIcon />,
    },
    {
      id: "time-changes",
      title: "Evolución temporal",
      description: "Tendencias de variables",
      icon: <LineChartIcon />,
    },
    {
      id: "variable-correlation",
      title: "Correlación de variables",
      description: "Análisis multivariable",
      icon: <BarChart3Icon />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
      <div className="p-6 bg-[#0066a6] dark:bg-blue-600">
        <h3 className="text-xl font-bold text-white">Visualizaciones</h3>
        <p className="text-blue-100 mt-1 text-sm">Seleccione un tipo de análisis</p>
      </div>
      <div className="p-4">
        {chartOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => {
              onChartChange(option.id);
              navigate(`/graficos?type=${option.id}`);
            }}
            className={`flex items-center w-full px-4 py-4 text-sm font-medium rounded-lg transition-all duration-200 mb-3 ${
              activeChart === option.id
                ? "bg-[#e6f2f9] dark:bg-blue-900/20 border-l-4 border-[#0066a6] dark:border-blue-500 text-[#0066a6] dark:text-blue-400"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                activeChart === option.id
                  ? "bg-[#e6f2f9] dark:bg-blue-900/20"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}
            >
              {React.cloneElement(option.icon as React.ReactElement, {
                className: `h-5 w-5 ${
                  activeChart === option.id
                    ? "text-[#0066a6] dark:text-blue-400"
                    : "text-gray-500 dark:text-gray-400"
                }`,
              })}
            </div>
            <div className="ml-3 text-left">
              <div className="font-medium">{option.title}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{option.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChartSelector;