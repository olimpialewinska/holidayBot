import { IUser } from "constants/IUser";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: (): IUser => ({
    id: null,
    email: null,
    accessToken: null,
    preferences: null,
  }),
  persist: true,

  actions: {
    updateUser(user: IUser) {
      Object.assign(this.$state, user);
    },
    deleteUser() {
      Object.assign(this.$state, {
        id: null,
        email: null,
        preferences: null,
      });
    },
  },
});
