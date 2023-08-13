<template>
  <div
    class="relative flex flex-wrap items-center"
    style="height: calc(100vh - 60px)"
  >
    <div
      class="w-11/12 p-6 m-auto dark:bg-zinc-800 bg-white border-t-4 border-teal-500 dark:border-teal-800 rounded-md shadow-md border-top sm:max-w-md"
    >
      <div class="flex justify-center mb-4">
        <nuxt-picture
          v-if="logoSrc"
          :src="logoSrc"
          height="42"
          width="200"
          fit="cover"
          alt="Logo"
        />
      </div>
      <form class="mt-6">
        <div>
          <label
            for="email"
            :class="{
              'block text-sm dark:text-gray-300 text-gray-800': isValidEmail,
              'block text-sm text-red-500': !isValidEmail,
            }"
          >
            Email {{ isValidEmail ? "" : "is invalid" }}
          </label>
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            class="block w-full px-4 py-2 mt-2 text-zinc-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div class="mt-4">
          <div>
            <label for="password" :class="passwordLabelClasses">
              {{ passwordLabel }}
            </label>
            <input
              type="password"
              placeholder="Password"
              v-model="password"
              class="block w-full px-4 py-2 mt-2 text-zinc-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <input
              type="password"
              v-model="confirmPassword"
              class="block w-full px-4 py-2 mt-2 text-zinc-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Confirm password"
            />
          </div>
          <div class="mt-6">
            <button
              class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-500 hover:bg-teal-600 dark:bg-teal-800 dark:hover:bg-teal-900 rounded-md focus:outline-none focus:bg-teal-600"
            >
              Login
            </button>
          </div>
        </div>
      </form>
      <div class="flex items-center justify-center mt-8">
        <div
          class="text-xs font-light dark:text-gray-300 text-gray-700"
          style="margin-right: 4px"
        >
          Already have an account?
        </div>
        <NuxtLink to="/">
          <div class="text-xs font-medium text-teal-600 hover:underline">
            Register
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["is-user"],
});
const colorMode = useColorMode();
const logoSrc = ref(null);

useHead({
  title: "HolidayBot - Register",
});

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
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    isValidEmail() {
      if (!this.email) return true;
      return /^[^@]+@\w+(\.\w+)+\w$/.test(this.email);
    },
    isPasswordValid() {
      if (!this.password) return true;
      return this.password.length >= 6;
    },
    isPasswordsMatch() {
      if (!this.confirmPassword) return true;
      return this.password === this.confirmPassword;
    },
    passwordLabelClasses() {
      return {
        "block text-sm dark:text-gray-300 text-gray-800":
          this.isPasswordValid && this.isPasswordsMatch,
        "block text-sm text-red-500":
          !this.isPasswordValid || !this.isPasswordsMatch,
      };
    },
    passwordLabel() {
      if (this.isPasswordValid && this.isPasswordsMatch) {
        return "Password";
      } else if (!this.isPasswordValid) {
        return "Password must have at least 6 characters";
      } else {
        return "Passwords don't match";
      }
    },
  },
};
</script>
