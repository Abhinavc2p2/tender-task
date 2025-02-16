export interface Task {
  id: string;
  title: string;
  description: string;
    assignee?: string; 
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  status: "Not Started" | "In Progress" | "To-Do" | "Completed";
  comments: string[];
}
