import { Input as HeadlessInput } from "@headlessui/react";
import clsx from "clsx";
import { ComponentPropsWithRef } from "react";

export const Input = ({
  className,
  ...props
}: ComponentPropsWithRef<"input">) => {
  return (
    <HeadlessInput
      className={clsx(
        "mt-2 block w-full rounded-lg border-none bg-slate-100 py-1.5 px-3 text-sm/6 text-black",
        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
        className
      )}
      {...props}
    />
  );
};
