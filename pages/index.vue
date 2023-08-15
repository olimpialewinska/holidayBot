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
      <div class="mt-6">
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
            <input
              type="password"
              placeholder="Password"
              class="input"
              v-model="password"
              v-on:keyup.enter="login"
            />
          </div>
          <div class="mt-6">
            <button class="btn" @click="login">Login</button>
          </div>
        </div>
      </div>
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
import axios from "axios";
import { useUserStore } from "../stores/userstore";
const store = useUserStore();
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
import { serverLink } from "../constants";
export default {
  data() {
    return {
      email: "",
      password: "",
      userStore: useUserStore(),
    };
  },
  computed: {
    isValidEmail() {
      if (!this.email) return true;
      return /^[^@]+@\w+(\.\w+)+\w$/.test(this.email);
    },
  },
  methods: {
    notify(message, type) {
      if (type === "success") {
        return this.$toast.success(message);
      }
      useNuxtApp().$toast.error(message);
    },
    async login() {
      if (!this.isValidEmail || !this.password || !this.email) {
        return this.notify("Please fill correctly all fields");
      }
      try {
        const response = await axios.post(`${serverLink}/auth/login`, {
          email: this.email,
          password: this.password,
        });
        if (response.data.error) {
          return this.notify(response.data.error);
        }
        this.userStore.updateUser(response.data);

        this.$router.push("/home");
      } catch (error) {
        this.notify(error.message);
      }
    },
  },
};
</script>
