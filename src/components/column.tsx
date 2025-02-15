import { useDroppable } from "@dnd-kit/core";
import type { Task as TTask } from "../types";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "./task";

export function Column({ tasks, title }: { tasks: TTask[]; title: string }) {
  const { setNodeRef } = useDroppable({
    id: title,
    data: {
      type: "column",
    },
  });
  return (
    <div
      ref={setNodeRef}
      className="bg-slate-100 rounded p-3 flex flex-col gap-3 min-h-24 shadow-sm"
    >
      <h2 className="font-bold text-gray-400">{title}</h2>
      <SortableContext
        id={title}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </SortableContext>
      {/* <button
        aria-label="add a new task"
        className="flex items-center justify-center gap-2 rounded py-2 px-1 text-gray-600 font-semibold hover:bg-slate-200 mt-auto"
        title="Add a new task"
      >
        <PlusIcon size={18} />
      </button> */}
    </div>
  );
}
