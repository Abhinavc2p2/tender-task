import React from "react";
import TaskCard from "./TaskCard";

const sampleTasks = [
  { title: "Task 1", description: "Description 1", assignee: "John", priority: "High", dueDate: "2024-07-20" },
  { title: "Task 2", description: "Description 2", assignee: "Jane", priority: "Medium", dueDate: "2024-07-21" },
];
const priorityValue = "High";
interface ColumnProps {
  title: string;
}

const Column: React.FC<ColumnProps> = ({ title }) => {
  return (
    <div className="w-64 bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {sampleTasks.map((task, index) => (
          <TaskCard key={index} {...task} priority={priorityValue as "High" | "Medium" | "Low"} />
        ))}
      </div>
    </div>
  );
};

export default Column;
