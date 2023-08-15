<template>
  <div>
    <div
      class="container px-2 mx-auto flex-col flex items-center w-screen"
      style="margin-bottom: 20px"
    >
      <div
        class="relative flex flex-col items-center px-4 w-full max-w-screen-xl"
      >
        <div
          class="flex flex-col w-full min-w-full rounded-xl p-4 py-8 shadow-md dark:bg-zinc-800 md:flex-row"
        >
          <div class="flex-1">
            <div class="flex flex-col justify-center items-center py-4 h-full">
              <div
                class="w-48 h-48 rounded-full bg-cover bg-center bg-no-repeat"
                :style="{ backgroundImage: `url('/user.jpg')` }"
              />
              <form class="mt-6 w-10/12">
                <div class="mt-4">
                  <div class="mb-6">
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
                      id="email"
                      v-model="email"
                      class="input"
                      placeholder="Email address"
                    />
                  </div>
                  <div class="mb-6">
                    <label for="password" :class="passwordLabelClasses">
                      {{ passwordLabel }}
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      v-model="password"
                      class="input mb-3"
                    />
                    <input
                      type="password"
                      v-model="confirmPassword"
                      class="input"
                      placeholder="Confirm password"
                    />
                  </div>

                  <div class="mt-6">
                    <button class="btn">Update account data</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="flex-1 md:border-l border-gray-300 dark:border-zinc-600">
            <div class="flex flex-col justify-center items-center py-4">
              <h1 class="text-2xl uppercase font-bold">Preferences</h1>
              <form class="w-10/12 mt-4">
                <label for="countries" class="form-label"
                  >Select a destination:</label
                >
                <select id="countries" class="input">
                  <option v-for="country in countries" :key="country">
                    {{ country }}
                  </option>
                </select>
                <label for="countries" class="form-label mt-4"
                  >Choose the type of nutrition:
                </label>
                <div class="flex items-center mb-2">
                  <input type="checkbox" value="" class="checkbox" />
                  <label for="default-checkbox" class="checkbox-label"
                    >Default checkbox</label
                  >
                </div>
                <div class="flex items-center mb-2">
                  <input type="checkbox" value="" class="checkbox" />
                  <label for="checked-checkbox" class="checkbox-label"
                    >Checked state</label
                  >
                </div>
                <div class="flex items-center mb-2">
                  <input type="checkbox" value="" class="checkbox" />
                  <label for="default-checkbox" class="checkbox-label"
                    >Default checkbox</label
                  >
                </div>
                <div class="flex items-center mb-2">
                  <input type="checkbox" value="" class="checkbox" />
                  <label for="checked-checkbox" class="checkbox-label"
                    >Checked state</label
                  >
                </div>
                <div class="flex items-center mb-2">
                  <input type="checkbox" value="" class="checkbox" />
                  <label for="default-checkbox" class="checkbox-label"
                    >Default checkbox</label
                  >
                </div>
                <div class="flex items-center mb-2">
                  <input type="checkbox" value="" class="checkbox" />
                  <label for="checked-checkbox" class="checkbox-label"
                    >Checked state</label
                  >
                </div>
                <label for="countries" class="form-label mt-4"
                  >Choose the length of your trip:</label
                >
                <select id="duration" class="input">
                  <option v-for="country in countries" :key="country">
                    {{ country }}
                  </option>
                </select>
                <label for="countries" class="form-label mt-4"
                  >Select the number of stars for the hotel:</label
                >
                <NuxtRating
                  :read-only="false"
                  :ratingValue="store.preferences?.rating"
                  @rating-selected="logRating"
                />
                <label for="countries" class="form-label mt-4"
                  >Select max price range for the hotel:
                  {{ rangeValue }} zł</label
                >
                <div class="w-full">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    :value="store.preferences?.price"
                    class="w-full"
                    @change="updateValue($event)"
                    @input="updateValue($event)"
                  />
                  <datalist id="tickmarks">
                    <option value="0" label="0" />
                    <option value="1000" />
                    <option value="2000" />
                    <option :value="store.preferences?.price" selected />
                    <option value="3000" />
                    <option value="4000" />
                    <option value="5000" label="5000" />
                  </datalist>
                </div>

                <button class="btn">Save preferences</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { countries } from "../constants";
import { useUserStore } from "../stores/userstore";
definePageMeta({
  middleware: ["auth"],
});

const store = useUserStore();

useHead({
  title: "HolidayBot - User Dashboard",
  meta: [
    {
      name: "description",
      content: "HolidayBot - User Dashboard",
    },
  ],
});
</script>

<script lang="ts">
export default {
  data() {
    return {
      rangeValue: useUserStore().preferences?.price,
      email: useUserStore().email,
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    logRating(event: number) {
      console.log(event);
    },
    updateValue(event: Event) {
      const target = event.target as HTMLInputElement;
      this.rangeValue = Number(target.value);
    },
    savePreferences() {
      console.log("preferences saved");
    },
    updateAccountData() {
      console.log("account data updated");
    },
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
};
</script>
