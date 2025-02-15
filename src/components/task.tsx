import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task as TTask } from "../types";
import { GripVertical, PencilIcon, TrashIcon } from "lucide-react";
import { useTaskStore } from "../stores/tasks.store";
import { useState } from "react";
import { TaskFormModal } from "./task-form-modal";

export function Task({ task }: { task: TTask }) {
  const removeTask = useTaskStore((state) => state.removeTask).bind(
    null,
    task.id
  );
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "task",
    },
  });
  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dueDate = (() => {
    if (!task.dueDate) return null;

    const date = new Date(task.dueDate);
    const isOverdue = date < new Date();

    return (
      <div
        data-overdue={isOverdue}
        className="group flex items-center gap-1 text-xs mt-2"
      >
        <div className="text-gray-700">Due at </div>
        <div className="bg-blue-200 font-medium p-0.5 rounded group-data-[overdue=true]:bg-red-400 group-data-[overdue=true]:text-white">
          {task.dueDate}
        </div>
      </div>
    );
  })();

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      // {...listeners}
      data-isdragging={isDragging}
      className="group bg-white p-2 rounded shadow-sm data-[isdragging=true]:shadow-lg touch-none"
    >
      <TaskFormModal
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        task={task}
      />
      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-1">
          <button
            {...attributes}
            {...listeners}
            className="text-gray-400 group-data-[isdragging=true]:text-gray-700 group-data-[isdragging=false]:cursor-grab"
          >
            <GripVertical size={18} />
          </button>
          <div className="font-semibold text-lg truncate md:max-w-[150px]">
            {task.title}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            aria-label="edit task"
            className="text-gray-400 hover:text-gray-700 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <PencilIcon size={14} />
          </button>
          <button
            aria-label="remove task"
            className="text-red-400 hover:text-red-700 cursor-pointer"
            onClick={removeTask}
          >
            <TrashIcon size={14} />
          </button>
        </div>
      </div>
      <div className="text-gray-500 mt-1 truncate">{task.description}</div>
      {dueDate}
    </div>
  );
}
