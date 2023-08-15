import { useUserStore } from "../stores/userstore";

export default defineNuxtRouteMiddleware((to, from) => {
  const app = useNuxtApp();
  const userStore = useUserStore();
  const user = computed(() => userStore.$state);

  if (user.value.id === null) {
    return navigateTo("/");
  }
});
