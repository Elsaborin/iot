import React from "react";
import { BarChart3Icon, LineChartIcon, BarChartHorizontalIcon } from "lucide-react";

interface ChartContainerProps {
  title: string;
  subtitle: string;
  icon: "bar" | "line" | "horizontal-bar";
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ title, subtitle, icon, children }) => {
  const getIcon = () => {
    switch (icon) {
      case "bar":
        return <BarChart3Icon className="h-6 w-6 text-white" />;
      case "line":
        return <LineChartIcon className="h-6 w-6 text-white" />;
      case "horizontal-bar":
        return <BarChartHorizontalIcon className="h-6 w-6 text-white" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md h-full border-t-4 border-[#0066a6] dark:border-blue-500">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-[#0066a6] dark:bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
            {getIcon()}
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-[#0066a6] dark:text-blue-400">{title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="h-[calc(100vh-380px)]">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;