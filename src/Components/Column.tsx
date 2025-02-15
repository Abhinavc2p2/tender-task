import React from "react";

interface ColumnProps {
  title: string;
}

const Column: React.FC<ColumnProps> = ({ title }) => {
  return (
    <div className="w-64 bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {/* Task cards will go here */}
      </div>
    </div>
  );
};

export default Column;
