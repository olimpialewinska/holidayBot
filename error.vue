<template>
  <div
    id="sky"
    class="fixed z-50 bg-gray-200 dark:bg-zinc-800 top-0 h-screen w-screen flex flex-col justify-center items-center font-mono dark:text-white text-zinc-900 bg"
  >
    <nuxt-picture
      v-if="logoSrc"
      :src="logoSrc"
      height="42"
      width="200"
      fit="cover"
      alt="Logo"
      class="absolute top-0 m-8"
    />
    <h1 class="z-50 text-9xl">
      {{ error.statusCode }}
    </h1>
    <div v-if="error.statusCode === 404">
      <NuxtLink to="/">
        <div class="btn">Go back home</div>
      </NuxtLink>
    </div>
    <div v-if="error.statusCode !== 404">
      <div class="text-xl hover:text-gray-300 transition-all">
        Something went wrong
      </div>
      <button class="btn mt-4" @click="reload">Reload</button>
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

<script>
export default {
  props: ["error"],
  layout: "error",
  methods: {
    reload() {
      window.location.reload();
    },
  },
};
</script>
