import React, { useState, forwardRef } from "react";
import { useDrag } from "react-dnd";
import { MoreHorizontal, MessageSquare, Paperclip, Trash } from "lucide-react";
import { Task } from "@/types/task";

interface TaskCardProps extends Omit<Task, 'priority' | 'status' | 'comments'> {
  priority?: string;
  status?: string;
  assigneeImage?: string;
  attachments?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  comments?: any[];
  className?: string;
  onDelete: (id: string) => void;
}

const getPriorityColor = (priority?: string) => {
  const priorityMap: Record<string, string> = {
    high: "bg-red-600",
    medium: "bg-yellow-600",
    low: "bg-green-700",
  };
  return priority ? priorityMap[priority.toLowerCase()] || "bg-gray-600" : "bg-gray-600";
};

const getStatusColor = (status?: string) => {
  const statusMap: Record<string, string> = {
    "not started": "bg-red-500",
    "to do": "bg-blue-500",
    "in progress": "bg-yellow-500",
    completed: "bg-green-500",
    "to-do list": "bg-yellow-500",
    todo: "bg-yellow-500",
  };
  return status ? statusMap[status.toLowerCase()] || "bg-gray-500" : "bg-gray-500";
};

const TaskCard = forwardRef<HTMLDivElement, TaskCardProps>(
  ({ id, title, description, status, className = '', assignee, assigneeImage, dueDate, priority, comments = [], attachments = 0, onDelete }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Drag functionality
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "TASK",
      item: { id, status },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    // Handle menu actions
    const handleMenuClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsMenuOpen(!isMenuOpen);
    };

    const handleDeleteClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDelete(id);
      setIsMenuOpen(false);
    };

    return (
      <div
        ref={(node) => {
          drag(node);
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        className={`bg-gray-800 rounded-lg p-4 mb-3 space-y-3 cursor-pointer transition-all 
          ${isDragging ? "opacity-50" : "opacity-100"} 
          ${className}`}
      >
        <div className="flex justify-between items-start">
          <div
            className={`flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium text-white ${getStatusColor(status)} bg-opacity-30`}
          >
            <span className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
            {status}
          </div>
          <div className="relative">
            <button className="text-gray-400 hover:text-white" onClick={handleMenuClick}>
              <MoreHorizontal size={16} />
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg z-10">
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-600" onClick={handleDeleteClick}>
                  <Trash size={14} />
                  Delete Task
                </button>
              </div>
            )}
          </div>
        </div>

        <h3 className="text-white font-medium">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>

        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Assignee</span>
          {assigneeImage ? (
            /* eslint-disable @next/next/no-img-element */
            <img src={assigneeImage} alt={assignee || "Assignee"} className="w-6 h-6 rounded-full" />
          ) : (
            <div className="w-6 h-6 rounded-full bg-gray-600" />
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">{dueDate || "No due date"}</span>
          <span className={`px-2 py-1 rounded text-xs text-white ${getPriorityColor(priority)}`}>
            {priority || "No priority"}
          </span>
        </div>

        <div className="flex gap-4 text-gray-400 text-sm">
          <div className="flex items-center gap-1">
            <MessageSquare size={14} />
            <span>{comments.length} Comments</span>
          </div>
          <div className="flex items-center gap-1">
            <Paperclip size={14} />
            <span>{attachments} Attachments</span>
          </div>
        </div>
      </div>
    );
  }
);

TaskCard.displayName = "TaskCard";

export default TaskCard;
