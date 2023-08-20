import { ISort } from "constants/ISort";
import { defineStore } from "pinia";

export const useSortStore = defineStore("sort", {
  state: () => ({
    sort: "asc",
  }),
  persist: true,

  actions: {
    updateSort(sort: ISort) {
      this.sort = sort;
    },
  },
});
