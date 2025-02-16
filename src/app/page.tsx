"use client"; // Required for Next.js client components

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "../Components/Board";

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Board />
    </DndProvider>
  );
}
