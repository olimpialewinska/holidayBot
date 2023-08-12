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
                class="w-28 h-28 rounded-full bg-cover bg-center bg-no-repeat"
                :style="{ backgroundImage: `url('/user.jpg')` }"
              />
              <form class="mt-6 w-10/12">
                <div class="mt-4">
                  <div class="mb-6">
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Email address</label
                    >
                    <input
                      type="email"
                      id="email"
                      :value="store.email"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Email address"
                      required
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >Password</label
                    >
                    <input
                      type="password"
                      id="password"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Password"
                      required
                    />

                    <input
                      type="password"
                      id="confirm_password"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
                      placeholder="Confirm password"
                      required
                    />
                  </div>

                  <div class="mt-6">
                    <button
                      class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-teal-500 hover:bg-teal-600 dark:bg-teal-800 dark:hover:bg-teal-900 rounded-md focus:outline-none focus:bg-teal-800"
                    >
                      Update account data
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="flex-1 md:border-l border-gray-300 dark:border-zinc-600">
            <div class="flex flex-col justify-center items-center py-4">
              <h1 class="text-2xl uppercase font-bold">Preferences</h1>
              <form class="w-10/12 mt-4">
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Select a destination:</label
                >
                <select
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option v-for="country in countries" :key="country">
                    {{ country }}
                  </option>
                </select>
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
                  >Choose the type of nutrition:
                </label>
                <div class="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Default checkbox</label
                  >
                </div>
                <div class="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Checked state</label
                  >
                </div>
                <div class="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Default checkbox</label
                  >
                </div>
                <div class="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Checked state</label
                  >
                </div>
                <div class="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Default checkbox</label
                  >
                </div>
                <div class="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value=""
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="checked-checkbox"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Checked state</label
                  >
                </div>
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
                  >Choose the length of your trip:</label
                >
                <select
                  id="duration"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option v-for="country in countries" :key="country">
                    {{ country }}
                  </option>
                </select>
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
                  >Select the number of stars for the hotel:</label
                >
                <NuxtRating
                  :read-only="false"
                  :ratingValue="store.preferences.rating"
                  @rating-selected="logRating"
                />
                <label
                  for="countries"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
                  >Select max price range for the hotel:
                  {{ rangeValue }} zł</label
                >
                <div class="w-full">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    :value="store.preferences.price"
                    class="w-full"
                    @change="updateValue($event)"
                    @input="updateValue($event)"
                  />
                  <datalist id="tickmarks">
                    <option value="0" label="0" />
                    <option value="1000" />
                    <option value="2000" />
                    <option :value="store.preferences.price" selected />
                    <option value="3000" />
                    <option value="4000" />
                    <option value="5000" label="5000" />
                  </datalist>
                </div>

                <button
                  class="w-full px-4 py-2 mt-4 tracking-wide text-white transition-colors duration-200 transform bg-teal-500 hover:bg-teal-600 dark:bg-teal-800 dark:hover:bg-teal-900 rounded-md focus:outline-none focus:bg-teal-800"
                >
                  Save preferences
                </button>
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
      rangeValue: useUserStore().preferences.price,
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
};
</script>
