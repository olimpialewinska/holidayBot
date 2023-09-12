<template>
  <div
    v-if="props.isOpen"
    class="fixed top-0 left-0 right-0 z-50 w-screen h-screen"
    style="background-color: rgba(0, 0, 0, 0.6)"
  >
    <div
      class="fixed top-0 left-0 right-0 z-50 w-screen h-screen flex justify-center items-center"
    >
      <div
        class="bg-white dark:bg-zinc-800 rounded-lg w-11/12 md:max-w-md shadow-lg z-50 h-5/6"
      >
        <div class="py-4 text-left px-6 h-full">
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold">Select Destination</p>
            <div class="cursor-pointer z-50" @click="props.close">
              <svg
                class="fill-current text-black dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M18 1.5L16.5 0 9 7.5 1.5 0 0 1.5 7.5 9 0 16.5 1.5 18 9 10.5 16.5 18 18 16.5 10.5 9z"
                />
              </svg>
            </div>
          </div>
          <div class="h-5/6 flex flex-col">
            <div class="flex-1 overflow-y-auto">
              <label
                v-for="(country, index) in countries"
                :key="index"
                class="checkbox-label flex items-center py-2"
              >
                <input
                  type="checkbox"
                  :value="country.code"
                  v-model="selected"
                  class="checkbox mr-2"
                />
                <span>{{ country.country }}</span>
              </label>
            </div>
          </div>
          <div class="btn text-center" @click="props.close">Select</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { countries } from "../constants";

const props = defineProps({
  setCountries: {
    type: Function,
    required: true,
  },
  selectedCountries: {
    type: Array,
    required: true,
  },
  isOpen: {
    type: Boolean,
    required: true,
  },
  close: {
    type: Function,
    required: true,
  },
});
</script>

<script lang="ts">
export default {
  data() {
    return {
      selected: this.selectedCountries ?? [],
    };
  },
  watch: {
    selected() {
      this.setCountries(this.selected);
    },
  },
};
</script>
