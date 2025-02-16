import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { Task } from "@/types/task";

interface ColumnProps {
  title: Task["status"];
  tasks: Task[];
  onDrop: (task: Task, newStatus: Task["status"]) => void;
  onAddTask: (status: Task["status"]) => void;
}

const statusColors: Record<string, string> = {
  "To-Do": "bg-blue-500",
  "Not Started": "bg-gray-500",
  "In Progress": "bg-yellow-500",
  "Completed": "bg-green-500",
};

const Column: React.FC<ColumnProps> = ({ title, tasks, onDrop, onAddTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (task: Task) => onDrop(task, title),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className="w-[400px] h-full min-h-screen p-6 rounded-lg shadow-lg bg-black">
      {/* Header with status color, title, task count, +, and three dots */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          {/* Status Color Circle on the Left of Title */}
          <span className={`w-3 h-3 rounded-full ${statusColors[title]}`} />
          
          {/* Column Title with Task Count */}
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            {title}
            <span className="flex items-center justify-center w-6 h-6 text-sm font-semibold text-white bg-gray-700 rounded-full">
              {tasks.length}
            </span>
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            className="text-white text-lg font-bold hover:text-gray-300"
            onClick={() => onAddTask(title)}
          >
            +
          </button>
          <button className="text-white text-lg font-bold hover:text-gray-300">
            ⋮
          </button>
        </div>
      </div>

     
      <div className="space-y-4 max-h-[600px] overflow-y-auto hide-scrollbar">
  {tasks.map((task) => (
    <TaskCard key={task.id} {...task} />
  ))}
</div>
    </div>
  );
};

export default Column;
