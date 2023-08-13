<template>
  <div
    class="container px-2 mx-auto flex-col flex items-center w-screen"
    style="margin-bottom: 20px"
  >
    <div
      class="flex flex-col justify-between gap-2 sm:gap-10 mb-6 mt-4 sm:flex-row w-11/12 sm:w-auto"
    >
      <NuxtLink to="/home?type=all" class="btn-offer-type">
        All Offers
      </NuxtLink>
      <NuxtLink to="/home?type=preferred" class="btn-offer-type">
        My Preferred Offers
      </NuxtLink>
    </div>
    <div class="flex flex-col px-4 gap-4 w-full max-w-screen-xl">
      <div
        class="flex flex-row w-full text-sm text-zinc-600 dark:text-zinc-400 items-center border-y border-gray-300 dark:border-zinc-600 py-2"
      >
        <div
          class="cursor-pointer mr-4 opacity-70 hover:opacity-100 transition-all duration-150 ease-in-out overflow-visible"
        >
          <button
            class="inline-flex items-center"
            style="margin-top: 4px"
            @click="toggleContent($event)"
          >
            <svg
              class="fill-current w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                d="M10 16h4a1 1 0 0 1 .117 1.993L14 18h-4a1 1 0 0 1-.117-1.993L10 16h4-4Zm-2-5h8a1 1 0 0 1 .117 1.993L16 13H8a1 1 0 0 1-.117-1.993L8 11h8-8ZM5 6h14a1 1 0 0 1 .117 1.993L19 8H5a1 1 0 0 1-.117-1.993L5 6h14H5Z"
                v-if="fill"
                :fill="fill"
              />
            </svg>
            <span class="text-sm text-zinc-600 dark:text-zinc-400 font-bold"
              >Filter</span
            >
          </button>
        </div>

        <div class="flex-1">
          <p
            class="cursor-pointer pl-4 border-l border-gray-300 dark:border-zinc-600 opacity-70 hover:opacity-100 transition-all duration-150 ease-in-out"
            style="max-width: 80px"
          >
            Clear all
          </p>
        </div>

        <div class="relative overflow-visible">
          <button
            class="cursor-pointer opacity-70 hover:opacity-100 transition-all duration-150 ease-in-out"
            id="sortBtn"
          >
            <div class="inline-flex items-center">
              <span class="text-sm text-zinc-600 dark:text-zinc-400 font-bold"
                >Sort</span
              >
              <svg
                class="fill-current w-5 h-5 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z"
                  v-if="fill"
                  :fill="fill"
                />
              </svg>
            </div>
          </button>

          <ul
            id="modal"
            data-te-dropdown-menu-ref
            class="absolute min-w-max list-none overflow-hidden rounded-lg border-none bg-gray-100 bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700"
            style="right: 0; width: 200px"
            :style="{
              display: sort ? 'block' : 'none',
            }"
          >
            <li>
              <div class="popup-item">Price: from the lowest</div>
            </li>
            <li>
              <div class="popup-item">Price: from the highest</div>
            </li>
            <li>
              <div class="popup-item">Highest rating</div>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-if="showContent"
        class="flex flex-col w-full text-sm text-zinc-600 dark:text-zinc-400 items-center px-2 md:flex-row md:justify-between md:items-start justify-start md:space-x-4 md:space-y-0 space-y-4 gap-2 pb-6 mb-2 border-b border-gray-300 dark:border-zinc-600 py-2"
      >
        <div class="w-full">
          <label for="destination" class="form-label-filter">Destination</label>
          <select id="destination" class="input mb-6">
            <option v-for="country in countries" :key="country">
              {{ country }}
            </option>
          </select>
          <label for="countries" class="form-label-filter mt-4"
            >Select max price range for the hotel: {{ rangeValue }} zł</label
          >
          <div class="w-full">
            <input
              type="range"
              min="0"
              max="5000"
              class="w-full"
              @change="updateValue($event)"
              @input="updateValue($event)"
            />
            <datalist id="tickmarks">
              <option value="0" label="0" />
              <option value="1000" />
              <option value="2000" />
              <option value="3000" />
              <option value="4000" />
              <option value="5000" label="5000" />
            </datalist>
          </div>
          <label for="countries" class="form-label-filter mt-4"
            >Select the number of stars for the hotel:</label
          >
          <NuxtRating
            :read-only="false"
            :ratingValue="4"
            :ratingSize="'24px'"
            @rating-selected="logRating"
          />
        </div>
        <div class="w-full">
          <label for="destination" class="form-label-filter">Start Date:</label>
          <input type="date" class="input" />
          <label for="destination" class="form-label-filter mt-6"
            >End Date:</label
          >
          <input type="date" class="input" />
        </div>
        <div class="w-full">
          <label for="countries" class="form-label-filter"
            >Choose the type of nutrition:
          </label>
          <div class="flex items-center mb-2">
            <input type="checkbox" value="" class="checkbox" />
            <label for="default-checkbox" class="checkbox-label-filter"
              >Default checkbox</label
            >
          </div>
          <div class="flex items-center mb-2">
            <input type="checkbox" value="" class="checkbox" />
            <label for="checked-checkbox" class="checkbox-label-filter"
              >Checked state</label
            >
          </div>
          <div class="flex items-center mb-2">
            <input type="checkbox" value="" class="checkbox" />
            <label for="default-checkbox" class="checkbox-label-filter"
              >Default checkbox</label
            >
          </div>
          <div class="flex items-center mb-2">
            <input type="checkbox" value="" class="checkbox" />
            <label for="checked-checkbox" class="checkbox-label-filter"
              >Checked state</label
            >
          </div>
          <div class="flex items-center mb-2">
            <input type="checkbox" value="" class="checkbox" />
            <label for="default-checkbox" class="checkbox-label-filter"
              >Default checkbox</label
            >
          </div>
          <div class="flex min-w-full flex-row items-end justify-end mt-4">
            <button class="btn w-full lg:w-auto whitespace-nowrap px-12">
              Search
            </button>
          </div>
        </div>
      </div>

      <OfferItem />
      <OfferItem /><OfferItem /><OfferItem /><OfferItem /><OfferItem /><OfferItem />
    </div>
  </div>
</template>

<script lang="ts">
import { countries } from "../constants";
export default {
  data() {
    return {
      msg: "Home",
      showContent: false,
      rangeValue: 0,
      sort: false,
    };
  },
  mounted() {
    const modal = document.getElementById("modal");
    const button = document.getElementById("sortBtn");
    window.addEventListener("click", (event) => {
      const target = event.target as Node;
      if (button?.contains(target) && this.sort === false) {
        this.sort = true;
      } else if (!modal?.contains(target) && this.sort === true) {
        this.sort = false;
      }
    });
  },
  methods: {
    toggleContent(event: Event) {
      event.preventDefault();
      this.showContent = !this.showContent;
    },
    updateValue(event: Event) {
      const target = event.target as HTMLInputElement;
      this.rangeValue = Number(target.value);
    },
    logRating(event: number) {
      console.log(event);
    },
  },
};
</script>
<script setup lang="ts">
import { useUserStore } from "../stores/userstore";
definePageMeta({
  middleware: ["auth"],
});

const store = useUserStore();

const OfferItem = resolveComponent("OfferItem");
useHead({
  title: "Home",
  meta: [
    {
      name: "description",
      content: "HolidayBot - Home page",
    },
  ],
});

const colorMode = useColorMode();
const fill = ref("");

onMounted(() => {
  updateLogoSrc();
});

watch(colorMode, () => {
  updateLogoSrc();
});

function updateLogoSrc() {
  fill.value = colorMode.value === "dark" ? "#9ca3af" : "#6b7280";
}
</script>

<style scoped></style>
