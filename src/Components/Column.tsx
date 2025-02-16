import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";
import { Task } from "@/types/task";

interface ColumnProps {
  title: Task["status"];
  tasks: Task[];
  onDrop: (task: Task, newStatus: Task["status"]) => void;
  onAddTask: (status: Task["status"]) => void;
  onDelete: (id: string) => void;
}

const statusColors: Record<string, string> = {
  "To-Do": "bg-blue-500",
  "Not Started": "bg-red-500",
  "In Progress": "bg-yellow-500",
  "Completed": "bg-green-500",
};

const Column: React.FC<ColumnProps> = ({ title, tasks, onDrop, onAddTask, onDelete }) => {
  const ref = useRef<HTMLDivElement | null>(null); // Define ref properly

  // Enhanced drop functionality with hover state
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "TASK",
    drop: (task: Task) => onDrop(task, title),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // Attach drop ref correctly
  drop(ref);

  // Calculate dynamic background color based on drag state
  const getBackgroundColor = () => {
    if (isOver && canDrop) {
      return "bg-gray-800"; // Darker background when dragging over
    }
    return "bg-black";
  };

  return (
    <div
      ref={ref} // Corrected ref usage
      className={`w-[400px] h-full min-h-screen p-6 rounded-lg shadow-lg transition-all duration-300 ${getBackgroundColor()} 
        ${isOver ? "ring-2 ring-blue-500" : ""}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${statusColors[title]}`} />
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            {title}
            <span className="flex items-center justify-center w-6 h-6 text-sm font-semibold text-white bg-gray-700 rounded-full">
              {tasks.length}
            </span>
          </h2>
        </div>

        <div className="flex space-x-3">
          <button
            className="text-white text-lg font-bold hover:text-gray-300 transition-colors duration-200"
            onClick={() => onAddTask(title)}
          >
            +
          </button>
          <button className="text-white text-lg font-bold hover:text-gray-300 transition-colors duration-200">
            ⋮
          </button>
        </div>
      </div>

      <div 
        className={`space-y-4 max-h-[600px] overflow-y-auto hide-scrollbar
          ${isOver ? 'bg-gray-800/50' : ''} 
          transition-colors duration-300`}
      >
        {tasks.map((task, index) => (
          <div 
            key={task.id || index}
            className="group"
          >
            <TaskCard 
              {...task} 
              onDelete={onDelete}
              className={`
                transform transition-all duration-200
                hover:scale-[1.02] hover:shadow-lg
                group-hover:bg-gray-700
              `}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Column;
