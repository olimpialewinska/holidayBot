<template>
  <div>
    <Modal
      :close="close"
      :is-open="open"
      :set-Countries="setCountries"
      :selected-Countries="destinations"
    />
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
                <label for="countries" class="btn" @click="openModal"
                  >Select a destination</label
                >
                <label for="countries" class="form-label mt-4"
                  >Choose the type of nutrition:
                </label>
                <div class="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value="All"
                    class="checkbox"
                    v-model="nutrition"
                  />
                  <label for="default-checkbox" class="checkbox-label"
                    >ALL INCLUSIVE</label
                  >
                </div>
                <div class="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value="HB"
                    class="checkbox"
                    v-model="nutrition"
                  />
                  <label for="checked-checkbox" class="checkbox-label"
                    >Dwa Posiłki</label
                  >
                </div>
                <div class="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value="BB"
                    class="checkbox"
                    v-model="nutrition"
                  />
                  <label for="default-checkbox" class="checkbox-label"
                    >Kolacja</label
                  >
                </div>
                <div class="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value="FB"
                    class="checkbox"
                    v-model="nutrition"
                  />
                  <label for="checked-checkbox" class="checkbox-label"
                    >Trzy posiłki</label
                  >
                </div>
                <div class="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value="RO"
                    class="checkbox"
                    v-model="nutrition"
                  />
                  <label for="default-checkbox" class="checkbox-label"
                    >Brak</label
                  >
                </div>
                <label for="countries" class="form-label mt-4"
                  >Choose the length of your trip:</label
                >
                <select id="duration" class="input" v-model="duration">
                  <option value="3">1-3 dni</option>
                  <option value="7">4-7 dni</option>
                  <option value="14">8-14 dni</option>
                  <option value="21">15-21 dni</option>
                </select>
                <label for="countries" class="form-label mt-4"
                  >Select the number of stars for the hotel:</label
                >
                <NuxtRating
                  :read-only="false"
                  :ratingValue="rating"
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
                    :value="rangeValue"
                    class="w-full"
                    @change="updateValue($event)"
                    @input="updateValue($event)"
                  />
                </div>

                <div class="btn" @click="sendData">Save preferences</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { countries, serverLink } from "../constants";
import { useUserStore } from "../stores/userstore";
definePageMeta({
  middleware: ["auth"],
});

const store = useUserStore();

console.log(useUserStore().preferences);

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
      rangeValue: useUserStore().preferences?.pricePerPerson ?? 0,
      email: useUserStore().email,
      password: "",
      confirmPassword: "",
      open: false,
      destinations: useUserStore().preferences?.destination ?? [],
      nutrition: useUserStore().preferences?.mealType ?? [],
      rating: useUserStore().preferences?.rating ?? 1,
      duration: useUserStore().preferences?.duration ?? 3,
    };
  },
  methods: {
    logRating(event: number) {
      this.rating = event;
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
    setCountries(countries: Array<string>) {
      this.destinations = countries;
    },
    close() {
      this.open = false;
    },
    openModal() {
      console.log("xd");
      this.open = true;
    },
    notify(message: string, type: string) {
      if (type === "success") {
        return this.$toast.success(message);
      }
      useNuxtApp().$toast.error(message);
    },
    async sendData() {
      const data = {
        email: this.email,
        preferences: {
          destination: this.destinations,
          mealType: this.nutrition,
          rating: this.rating,
          duration: this.duration,
          pricePerPerson: this.rangeValue,
        },
      };
      console.log(data);
      const response = await axios.post(
        `${serverLink}/preferences/addPreferences`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + useUserStore().$state.accessToken,
          },
          data: data,
        }
      );
      if (response.data.error) {
        return this.notify("Something went wrong", "error");
      }
      this.notify("Preferences saved", "success");
      useUserStore().updatePreferences(response.data);
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
