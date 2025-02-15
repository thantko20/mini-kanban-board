import { Button } from "@headlessui/react";
import { Board } from "./components/board";
import { useState } from "react";
import { TaskFormModal } from "./components/task-form-modal";
import { useFilterStore } from "./stores/filter.store";
import { Input } from "./components/input";

function App() {
  const [isModalOpen, setIsOpen] = useState(false);
  const filterStore = useFilterStore();
  return (
    <div className="w-full max-w-[800px] mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="font-bold text-xl">Mini Kanban</h1>
        <Button
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded min-w-[100px]"
          onClick={() => setIsOpen(true)}
        >
          Add
        </Button>
      </div>
      <Input
        placeholder="Search"
        className="w-full"
        value={filterStore.search}
        onChange={(e) => filterStore.setSearch(e.target.value)}
      />
      <TaskFormModal isOpen={isModalOpen} close={() => setIsOpen(false)} />
      <Board />
    </div>
  );
}
export default App;
