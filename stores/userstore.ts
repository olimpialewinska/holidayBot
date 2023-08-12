import { IUser } from "constants/IUser";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: (): IUser => ({
    id: 1,
    email: "aaa@wp.pl",
    preferences: {
      destination: "",
      mealType: "",
      duration: 0,
      rating: 3,
      price: 1200,
    },
  }),

  actions: {
    updateUser(user: IUser) {
      Object.assign(this.$state, user);
    },
    deleteUser() {
      Object.assign(this.$state, {
        id: 0,
        email: "",
        preferences: {
          destination: "",
          mealType: "",
          duration: 0,
          rating: 0,
          price: 0,
        },
      });
    },
  },
});
