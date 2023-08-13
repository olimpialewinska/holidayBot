<template>
  <div
    class="relative flex flex-wrap items-center"
    style="height: calc(100vh - 60px)"
  >
    <div class="form-bg">
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
              'form-label': isValidEmail,
              'form-label text-red-500': !isValidEmail,
            }"
          >
            Email {{ isValidEmail ? "" : "is invalid" }}
          </label>
          <input
            type="email"
            placeholder="Email"
            v-model="email"
            class="input"
          />
        </div>
        <div class="mt-4">
          <div>
            <label for="password" class="form-label">Password</label>
            <input type="password" placeholder="Password" class="input" />
          </div>
          <div class="mt-6">
            <button class="btn">Login</button>
          </div>
        </div>
      </form>
      <div class="flex items-center justify-center mt-8">
        <div
          class="text-xs font-light dark:text-gray-300 text-gray-700"
          style="margin-right: 4px"
        >
          Don't have an account?
        </div>
        <NuxtLink to="/register">
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
definePageMeta({
  middleware: ["is-user"],
});
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
      email: "",
    };
  },
  computed: {
    isValidEmail() {
      if (!this.email) return true;
      return /^[^@]+@\w+(\.\w+)+\w$/.test(this.email);
    },
  },
};
</script>
