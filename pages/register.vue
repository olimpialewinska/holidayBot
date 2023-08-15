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
            <label for="password" :class="passwordLabelClasses">
              {{ passwordLabel }}
            </label>
            <input
              type="password"
              placeholder="Password"
              v-model="password"
              class="input mb-3"
            />
          </div>
          <div>
            <input
              type="password"
              v-model="confirmPassword"
              class="input"
              placeholder="Confirm password"
              v-on:keyup.enter="handleSubmit"
            />
          </div>
          <div class="mt-6">
            <button class="btn" @click="handleSubmit">Register</button>
          </div>
        </div>
      </div>
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
import axios from "axios";
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
import { serverLink } from "../constants";

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
        "form-label": this.isPasswordValid && this.isPasswordsMatch,
        "form-label text-red-500":
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
  methods: {
    notify(message, type) {
      if (type === "success") {
        return this.$toast.success(message);
      }
      useNuxtApp().$toast.error(message);
    },
    async handleSubmit() {
      if (
        !this.isValidEmail ||
        !this.isPasswordValid ||
        !this.isPasswordsMatch ||
        !this.email ||
        !this.password ||
        !this.confirmPassword
      )
        return this.notify("Invalid data");

      try {
        const res = await axios.post(`${serverLink}/auth/register`, {
          email: this.email,
          password: this.password,
        });
        if (res.data.error) {
          return this.notify(res.data.error);
        }
        this.notify("Successfully registered, confirm your email", "success");
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      } catch (err) {
        this.notify("Something went wrong");
      }
    },
  },
};
</script>
