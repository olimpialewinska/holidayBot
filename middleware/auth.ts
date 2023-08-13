import { useUserStore } from "../stores/userstore";

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useUserStore();
  if (store.id === null) {
    return navigateTo("/", { redirectCode: 401 });
  }
});
