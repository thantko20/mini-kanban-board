import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import { Task } from "../types";
import { nanoid } from "nanoid";
import localforage from "localforage";

const indexedDBStorage: StateStorage = {
  async getItem(name) {
    return localforage.getItem(name);
  },
  async setItem(name, value) {
    return localforage.setItem(name, value);
  },
  async removeItem(name) {
    return localforage.removeItem(name);
  },
};

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  setTasks: (tasks: Task[]) => void;
  removeTask: (id: string) => void;
  updateTask: (task: Task) => void;
};

const initialTasks: Task[] = [
  {
    id: nanoid(),
    title: "Task 1",
    description: "This is the first task",
    category: "Todo",
  },
  {
    id: nanoid(),
    title: "Task 2",
    description: "This is the second task",
    category: "Todo",
  },
  {
    id: nanoid(),
    title: "Task 3",
    description: "This is the third task",
    category: "Todo",
  },
];

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: initialTasks,
      addTask: (task) => set({ tasks: [...get().tasks, task] }),
      setTasks: (tasks) => set({ tasks }),
      removeTask: (id: string) =>
        set({ tasks: get().tasks.filter((task) => task.id !== id) }),
      updateTask: (task) => {
        const tasks = get().tasks.map((t) => (t.id === task.id ? task : t));
        return set({ tasks });
      },
    }),
    {
      name: "tasks-storage",
      storage: createJSONStorage(() => indexedDBStorage),
    }
  )
);
