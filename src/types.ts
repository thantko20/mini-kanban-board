export const categories = ["Todo", "In Progress", "Done"] as const;

export type Category = (typeof categories)[number];

export type Task = {
  id: string;
  title: string;
  description: string;
  category: Category;
  dueDate?: string;
};

export type CategorizedTasks = Record<Category, Task[]>;
