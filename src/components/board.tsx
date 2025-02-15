import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Column } from "./column";
import { categories, Category } from "../types";
import { useTaskStore } from "../stores/tasks.store";
import { useFilterStore } from "../stores/filter.store";
import { useMemo } from "react";

export function Board() {
  const searchFilter = useFilterStore((state) => state.search);
  const taskStore = useTaskStore();
  const tasks = taskStore.tasks;
  const filteredTasks = useMemo(
    () =>
      searchFilter
        ? tasks.filter(
            (task) =>
              task.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
              task.description
                .toLowerCase()
                .includes(searchFilter.toLowerCase())
          )
        : tasks,
    [searchFilter, tasks]
  );
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (active.id === over?.id) return;
    if (!active.data.current) return;
    const activeCategory = active.data.current.sortable.containerId as Category;
    if (!categories.includes(activeCategory)) return;

    const tmp = [...tasks];

    const tasksWithActiveCategory = tmp.filter(
      (task) => task.category === activeCategory
    );

    const overIndex = tasksWithActiveCategory.findIndex(
      (task) => task.id === over!.id
    );
    const activeIndex = tasksWithActiveCategory.findIndex(
      (task) => task.id === active.id
    );
    const result = [
      ...tmp.filter((task) => task.category !== activeCategory),
      ...arrayMove(tasksWithActiveCategory, activeIndex, overIndex),
    ];
    taskStore.setTasks(result);
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;
    const isDraggingOverSameColumn =
      active.data.current?.sortable.containerId ===
      over.data.current?.sortable?.containerId;
    if (isDraggingOverSameColumn) {
      return;
    }
    const isDraggingOverColumn = over.data.current?.type === "column";
    const overCategory = (
      isDraggingOverColumn ? over.id : over.data.current?.sortable.containerId
    ) as Category;
    const tmp = [...tasks];
    const activeIndex = tmp.findIndex((task) => task.id === active.id);
    tmp[activeIndex].category = overCategory;
    taskStore.setTasks(tmp);
  };

  return (
    <div>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        collisionDetection={closestCorners}
        sensors={sensors}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {categories.map((category) => (
            <Column
              key={category}
              title={category}
              tasks={filteredTasks.filter((task) => task.category === category)}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}
