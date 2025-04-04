import React from "react";

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md h-full flex items-center justify-center">
      <div className="text-center text-red-500 dark:text-red-400">
        <p className="font-medium text-lg">{message}</p>
      </div>
    </div>
  );
};

export default ErrorState;