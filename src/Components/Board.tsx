import React from "react";
import Column from "./Column";

const statuses = ["Not Started", "To-Do", "In Progress", "Completed"];

const Board = () => {
  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {statuses.map((status) => (
        <Column key={status} title={status} />
      ))}
    </div>
  );
};

export default Board;
