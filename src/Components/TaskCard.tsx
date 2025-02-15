import React from "react";

interface TaskCardProps {
  title: string;
  description: string;
  assignee: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ title, description, assignee, priority, dueDate }) => {
  return (
    <div className="bg-gray-700 p-3 rounded-lg shadow-md">
      <h3 className="font-bold">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
      <p className="text-xs text-gray-400">Assigned to: {assignee}</p>
      <p className={`text-xs font-bold ${priority === "High" ? "text-red-400" : priority === "Medium" ? "text-yellow-400" : "text-green-400"}`}>
        Priority: {priority}
      </p>
      <p className="text-xs text-gray-400">Due: {dueDate}</p>
    </div>
  );
};

export default TaskCard;
