import { ISort } from "constants/ISort";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): ISort => ({
    type: "asc",
  }),
  persist: true,

  actions: {
    updateUser(type: ISort) {
      Object.assign(this.$state, type);
    },
  },
});
