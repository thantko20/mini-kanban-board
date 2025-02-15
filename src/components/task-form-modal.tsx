import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
  Button,
  Field,
  Label,
} from "@headlessui/react";
import type { Task } from "../types";
import { useTaskStore } from "../stores/tasks.store";
import { nanoid } from "nanoid";
import clsx from "clsx";
import { Input } from "./input";

type Props = {
  isOpen: boolean;
  close: () => void;
  task?: Task;
};

export const TaskFormModal = ({ isOpen, close, task }: Props) => {
  const title = task ? "Edit task" : "Add task";
  const buttonText = task ? "Edit" : "Add";
  const taskStore = useTaskStore();
  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-full max-w-lg space-y-4 rounded shadow-xl bg-white p-4">
          <DialogTitle className="font-bold">{title}</DialogTitle>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const title = formData.get("title")?.toString() ?? "";
              const description = formData.get("description")?.toString() ?? "";
              const dueDate = formData.get("dueDate")?.toString() ?? "";
              if (task) {
                taskStore.updateTask({ ...task, title, description, dueDate });
                return close();
              }
              taskStore.addTask({
                id: nanoid(),
                title,
                description,
                category: "To Do",
                dueDate,
              });
              e.currentTarget.reset();
              close();
            }}
          >
            <Field>
              <Label className="text-sm/6 font-medium text-black">Title</Label>
              <Input
                defaultValue={task?.title}
                name="title"
                className={clsx(
                  "mt-2 block w-full rounded-lg border-none bg-slate-100 py-1.5 px-3 text-sm/6 text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
                required
              />
            </Field>
            <Field>
              <Label className="text-sm/6 font-medium text-black">
                Description
              </Label>
              <Input
                defaultValue={task?.description}
                name="description"
                className={clsx(
                  "mt-2 block w-full rounded-lg border-none bg-slate-100 py-1.5 px-3 text-sm/6 text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
              />
            </Field>
            <Field>
              <Label className="text-sm/6 font-medium text-black">
                Due Date
              </Label>
              <Input
                defaultValue={task?.dueDate?.toString()}
                type="date"
                name="dueDate"
                className={clsx(
                  "mt-2 block w-full rounded-lg border-none bg-slate-100 py-1.5 px-3 text-sm/6 text-black",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
              />
            </Field>
            <div className="flex gap-4">
              <Button
                className="w-full border border-blue-500 text-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-500/10"
                onClick={close}
              >
                Cancel
              </Button>
              <Button
                className="w-full bg-blue-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-blue-600"
                type="submit"
              >
                {buttonText}
              </Button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
