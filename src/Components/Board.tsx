"use client";
import React, { useState, useEffect } from "react";
import Column from "./Column";
import { Task } from "@/types/task";
import { FaBell } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

const defaultTasks: Task[] = [
  { id: "1", title: "Task 1", description: "Fix bug", assignee: "John", priority: "High", dueDate: "2024-02-10", status: "To-Do", comments: [] },
  { id: "2", title: "Task 2", description: "Refactor code", assignee: "Jane", priority: "Medium", dueDate: "2024-02-12", status: "In Progress", comments: [] },
  { id: "3", title: "Task 3", description: "Write tests", assignee: "Alice", priority: "Low", dueDate: "2024-02-15", status: "Not Started", comments: [] },
  { id: "4", title: "Task 4", description: "Deploy app", assignee: "Bob", priority: "High", dueDate: "2024-02-18", status: "Completed", comments: [] },
  { id: "5", title: "Task 5", description: "Update documentation", assignee: "Eve", priority: "High", dueDate: "2024-02-05", status: "Overdue", comments: [] },
];

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "null");
    if (storedTasks) {
      setTasks(storedTasks);
    } else {
      localStorage.setItem("tasks", JSON.stringify(defaultTasks));
      setTasks(defaultTasks);
    }
  }, []);

  const updateTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  };

  const handleDrop = (task: Task, newStatus: Task["status"]) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status: newStatus } : t
    );
    updateTasks(updatedTasks);
  };

  const handleAddTask = (status: Task["status"]) => {
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      title: `New Task ${tasks.length + 1}`,
      description: "Description",
      assignee: "Unassigned",
      priority: "Low",
      dueDate: "2024-02-20",
      status,
      comments: [],
    };
    updateTasks([...tasks, newTask]);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white">
      {/* Top Navigation */}
      <div className="flex justify-between items-center p-4 bg-gray-800">
      <h1 className="text-3xl font-extrabold">Tender Tasks</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for Tenders"
              className="bg-white text-grey-700 p-2 rounded pl-10"
            />
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <FaBell className="text-xl cursor-pointer" />
          <div className="bg-gray-700 p-2 rounded-full">S</div>
        </div>
      </div>
      
      <div className="border-b border-white w-full"></div>
     
      <div className="w-full flex items-center p-4 relative">
 
  <div className="bg-black p-3 rounded-lg flex justify-between items-center w-full max-w-7xl">
 
    <div className="flex space-x-4">
      <button className="bg-black border-2 border-yellow-500 text-white px-4 py-2 rounded-lg">
        List View
      </button>
      <button className="bg-black border-2 border-yellow-500 text-white px-4 py-2 rounded-lg">
        Board View
      </button>
    </div>
  </div>

 
  <div className="ml-8 flex space-x-4">
    <button className="bg-black px-5 py-2 rounded-md text-white">View Tender Details</button>
    <button className="bg-gray-700 px-5 py-2 rounded-md text-white">Columns</button>
  </div>
</div>


      {/* Task Board */}
      <div className="flex space-x-4 p-4 overflow-x-auto">
        <Column title="To-Do" tasks={tasks.filter((t) => t.status === "To-Do")} onDrop={handleDrop} onAddTask={handleAddTask} />
        <Column title="In Progress" tasks={tasks.filter((t) => t.status === "In Progress")} onDrop={handleDrop} onAddTask={handleAddTask} />
        <Column title="Not Started" tasks={tasks.filter((t) => t.status === "Not Started")} onDrop={handleDrop} onAddTask={handleAddTask} />
        <Column title="Completed" tasks={tasks.filter((t) => t.status === "Completed")} onDrop={handleDrop} onAddTask={handleAddTask} />
       
      </div>
    </div>
  );
};

export default Board;
