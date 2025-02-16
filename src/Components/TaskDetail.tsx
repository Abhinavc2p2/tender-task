"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Task } from "@/types/task";
import { getTaskById, addCommentToTask } from "@/utils/storage";

const TaskDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<string[]>([]); 
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) {
      const foundTask = getTaskById(id as string);
      setTask(foundTask || null);
      setComments(foundTask?.comments || []); 
    }
  }, [id]);

  if (!task) return <p className="text-white">Task not found</p>;

 
  const handleAddComment = () => {
    if (!comment.trim()) return;

    addCommentToTask(task.id, comment);
    
    
    setComments((prevComments) => [...prevComments, comment]);  
    setComment("");
  };

  return (
    <div className="p-6 text-white bg-gray-900 min-h-screen">
      <button onClick={() => router.push("/")} className="mb-4 text-blue-400">
        ← Back
      </button>

      <h2 className="text-2xl font-bold">{task.title}</h2>
      <p className="text-gray-300">{task.description}</p>

      <h3 className="mt-4 font-semibold">Comments</h3>
      <ul>
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <li key={index} className="text-gray-400">• {c}</li>
          ))
        ) : (
          <p className="text-gray-500">No comments yet.</p>
        )}
      </ul>

      <input
        type="text"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="p-2 bg-gray-800 border border-gray-600 rounded w-full mt-2"
      />
      <button
        onClick={handleAddComment}
        className="mt-2 p-2 bg-blue-600 rounded"
      >
        Add Comment
      </button>
    </div>
  );
};

export default TaskDetail;
