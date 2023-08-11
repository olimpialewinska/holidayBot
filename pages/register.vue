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
            class="block text-sm dark:text-gray-300 text-zinc-800"
            >Email</label
          >
          <input
            type="email"
            placeholder="Email"
            class="block w-full px-4 py-2 mt-2 text-zinc-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div class="mt-4">
          <div>
            <label
              for="password"
              class="block text-sm dark:text-gray-300 text-zinc-800"
              >Password</label
            >
            <input
              type="password"
              placeholder="Password"
              class="block w-full px-4 py-2 mt-2 text-zinc-700 bg-white border rounded-md focus:border-teal-400 focus:ring-teal-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div>
            <input
              type="password"
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

<script></script>
