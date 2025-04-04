import React from "react";

const LoadingState: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#0066a6] dark:border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
        <p className="text-[#0066a6] dark:text-blue-400 font-medium">Cargando datos...</p>
      </div>
    </div>
  );
};

export default LoadingState;