export type Comment = {
  id: string;
  text: string;
  createdAt: string;
  author: string;
};

export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  assignee: string;
  tags: string[];
  comments: Comment[];
  subtasks: Subtask[];
};