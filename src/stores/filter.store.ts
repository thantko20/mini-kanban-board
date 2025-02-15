import { create } from "zustand";

type FilterStore = {
  search: string;
  setSearch: (search: string) => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
}));
