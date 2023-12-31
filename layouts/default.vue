<template>
  <nav
    class="relative flex flex-wrap items-center justify-between px-2 py-3 dark:bg-teal-900 bg-teal-500 mb-3"
  >
    <div
      class="container px-2 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start"
      >
        <NuxtLink to="/">
          <nuxt-picture
            v-if="logoSrc"
            :src="logoSrc"
            height="42"
            width="200"
            fit="cover"
            alt="Logo"
          />
        </NuxtLink>
        <button
          class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
          v-on:click="toggleNavbar()"
        >
          <div class="space-y-2">
            <span class="block w-8 h-1 dark:bg-gray-600 bg-white"></span>
            <span class="block w-8 h-1 dark:bg-gray-600 bg-white"></span>
            <span class="block w-8 h-1 dark:bg-gray-600 bg-white"></span>
          </div>
        </button>
      </div>
      <div
        v-bind:class="{ hidden: !showMenu, flex: showMenu }"
        class="lg:flex lg:flex-grow items-center"
      >
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <NuxtLink
            v-for="link in filteredNavLinks"
            :to="link.to"
            :key="link.to"
            @click="toggleNavbar()"
          >
            <li class="nav-item">
              <div
                class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug dark:text-white hover:opacity-75"
              >
                <span class="ml-2">{{ link.text }}</span>
              </div>
            </li>
          </NuxtLink>
          <li v-if="userLoggedIn" class="nav-item">
            <div
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug dark:text-white hover:opacity-75"
            >
              <span class="ml-2" @click="logout">Logout</span>
            </div>
          </li>

          <li class="nav-item">
            <div
              class="px-3 py-2 flex items-center text-xs uppercase font-bold"
            >
              <select
                v-model="colorMode.preference"
                class="border w-24 h-5 dark:bg-zinc-900 dark:text-white dark:border-gray-700"
                style="font-size: 12px"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <slot />
</template>

<script setup>
import { useUserStore } from "../stores/userstore";
const colorMode = useColorMode();
const logoSrc = ref(null);

onMounted(() => {
  updateLogoSrc();
});

watch(colorMode, () => {
  updateLogoSrc();
});

function updateLogoSrc() {
  logoSrc.value = colorMode.value === "dark" ? "/hb-dark.png" : "/hb-light.png";
}
</script>

<script>
export default {
  data() {
    return {
      showMenu: false,
      user: useUserStore().$state,
      userstate: useUserStore(),
    };
  },
  methods: {
    toggleNavbar: function () {
      this.showMenu = !this.showMenu;
    },
    logout() {
      this.userstate.deleteUser();
      this.$router.push("/");
    },
  },
  computed: {
    userLoggedIn() {
      return this.user.id && this.user.id !== null;
    },
    filteredNavLinks() {
      return this.navLinks.filter((link) => link.condition);
    },
    navLinks() {
      return [
        { to: "/", text: "Login", condition: !this.userLoggedIn },
        { to: "/register", text: "Register", condition: !this.userLoggedIn },
        {
          to: "/home?type=all",
          text: "Offers",
          condition: this.userLoggedIn,
        },
        { to: "/user", text: this.user.email, condition: this.userLoggedIn },
      ];
    },
  },
};
</script>

<style>
body {
  @apply min-h-screen bg-white dark:bg-zinc-900 dark:text-gray-200;
}
</style>
