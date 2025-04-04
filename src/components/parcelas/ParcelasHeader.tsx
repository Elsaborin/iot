import React from "react";

interface ParcelasHeaderProps {
  title: string;
  subtitle: string;
  badge: string;
}

const ParcelasHeader: React.FC<ParcelasHeaderProps> = ({ title, subtitle, badge }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <div className="inline-flex items-center px-3 py-1 bg-[#e6f2f9] dark:bg-blue-900/20 text-[#0066a6] dark:text-blue-300 rounded-full text-sm font-medium mb-2">
          <div className="w-2 h-2 rounded-full bg-[#0066a6] dark:bg-blue-400 mr-2"></div>
          <span>{badge}</span>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white tracking-tight">{title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">{subtitle}</p>
      </div>
    </div>
  );
};

export default ParcelasHeader;