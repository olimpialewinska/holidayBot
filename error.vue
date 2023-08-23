<template>
  <div
    id="sky"
    class="fixed z-50 top-0 h-screen w-screen flex flex-col justify-center items-center font-mono"
  >
    <nuxt-picture
      src="/hb-dark.png"
      height="42"
      width="200"
      fit="cover"
      alt="Logo"
      class="absolute top-0 m-8"
    />
    <h1 class="text-white z-50 text-9xl">
      {{ error.statusCode }}
    </h1>
    <div v-if="error.statusCode === 404">
      <NuxtLink to="/">
        <div class="btn">Go back home</div>
      </NuxtLink>
    </div>
    <div v-if="error.statusCode !== 404">
      <div class="text-white text-xl hover:text-gray-300 transition-all">
        Something went wrong
      </div>
      <button class="btn mt-4" @click="reload">Reload</button>
    </div>
  </div>
</template>

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
