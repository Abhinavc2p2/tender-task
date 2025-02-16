import { Task } from "@/types/task";
export const getTaskById = (id: string): Task | null => {
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
    return tasks.find((task) => task.id === id) || null;
};

export const addCommentToTask = (id: string, comment: string) => {
    if (!comment.trim()) return;

    let tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");

    tasks = tasks.map((task) => {
        if (task.id === id) {
            return {
                ...task,
                comments: [...task.comments, comment], // ✅ Add comment properly
            };
        }
        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks)); // ✅ Save changes
};

  