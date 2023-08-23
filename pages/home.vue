<template>
  <div
    class="container px-2 mx-auto flex-col flex items-center w-screen"
    style="margin-bottom: 20px"
  >
    <div
      class="flex flex-col justify-between gap-2 sm:gap-10 mb-6 mt-4 sm:flex-row w-11/12 sm:w-auto"
    >
      <NuxtLink
        :to="{
          path: '/home',
          query: { type: 'all', sort: sortStore.sort, page: 1 },
        }"
        class="btn-offer-type"
      >
        All Offers
      </NuxtLink>
      <NuxtLink
        :to="{
          path: '/home',
          query: { type: 'preferred', sort: sortStore.sort, page: 1 },
        }"
        class="btn-offer-type"
      >
        My Preferred Offers
      </NuxtLink>
    </div>
    <div class="flex flex-col px-4 gap-4 w-full max-w-screen-xl">
      <div
        class="flex flex-row w-full text-sm text-zinc-600 dark:text-zinc-400 items-center border-y border-gray-300 dark:border-zinc-600 py-2"
      >
        <div
          v-if="!isPreferred"
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
            v-if="!isPreferred"
            class="cursor-pointer pl-4 border-l border-gray-300 dark:border-zinc-600 opacity-70 hover:opacity-100 transition-all duration-150 ease-in-out"
            style="max-width: 80px"
            @click="clearAll"
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
            <li @click="changeSort('asc')">
              <div class="popup-item">Price: from the lowest</div>
            </li>
            <li @click="changeSort('desc')">
              <div class="popup-item">Price: from the highest</div>
            </li>
            <li @click="changeSort('stars')">
              <div class="popup-item">Highest rating</div>
            </li>
          </ul>
        </div>
      </div>
      <div
        v-if="showContent && !isPreferred"
        class="flex flex-col w-full text-sm text-zinc-600 dark:text-zinc-400 items-center px-2 md:flex-row md:justify-between md:items-start justify-start md:space-x-4 md:space-y-0 space-y-4 gap-2 pb-6 mb-2 border-b border-gray-300 dark:border-zinc-600 py-2"
      >
        <div class="w-full">
          <label for="destination" class="form-label-filter">Destination</label>
          <select
            id="destination"
            ref="destination"
            class="input mb-6"
            v-model="query.destination"
          >
            <option value="" disabled selected hidden>
              Select destination
            </option>
            <option v-for="c in data.destinations" :key="c" :value="c">
              {{ c }}
            </option>
          </select>
          <label for="countries" class="form-label-filter mt-4"
            >Select max price range for the hotel:
            {{ query.maxPrice }} zł</label
          >
          <div class="w-full">
            <input
              type="range"
              :min="data.prices.minPrice"
              :max="data.prices.maxPrice"
              class="w-full"
              @change="updateValue($event)"
              @input="updateValue($event)"
              v-model="query.maxPrice"
            />
          </div>
          <label for="countries" class="form-label-filter mt-4"
            >Select the number of stars for the hotel:</label
          >
          <NuxtRating
            :read-only="false"
            :rating-value="query.stars"
            @rating-selected="logRating"
            :ratingSize="'24px'"
          />
        </div>
        <div class="w-full">
          <label for="destination" class="form-label-filter">Start Date:</label>
          <input type="date" class="input" v-model="query.startDate" />
          <label for="destination" class="form-label-filter mt-6"
            >End Date:</label
          >
          <input type="date" class="input" v-model="query.endDate" />
        </div>
        <div class="w-full">
          <label for="nutrition" class="form-label-filter"
            >Choose the type of nutrition:</label
          >
          <div
            v-for="(checkbox, index) in checkboxes"
            :key="index"
            class="flex items-center mb-2"
          >
            <input
              type="checkbox"
              :value="checkbox.value"
              class="checkbox"
              v-model="selectedCheckboxes"
              @change="updateNutrition"
            />
            <label :for="'checkbox-' + index" class="checkbox-label-filter">
              {{ checkbox.label }}
            </label>
          </div>

          <div class="flex min-w-full flex-row items-end justify-end mt-4">
            <button
              class="btn w-full lg:w-auto whitespace-nowrap px-12"
              @click="search"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div v-for="offer in paginatedResults" :key="offer.id">
        <OfferItem :offer="offer" />
      </div>
      <div v-if="fetchError" class="text-center text-red-500 mt-4 text-lg">
        An error occurred while loading data. Please try again later.
      </div>

      <div v-if="searchResults?.length === 0 && !fetchError">
        <h1
          class="text-center text-zinc-600 dark:text-zinc-400 text-lg font-bold uppercase mt-10"
        >
          No offers found
        </h1>
      </div>
      <div class="flex flex-row justify-center my-4 dark:text-white text-black">
        <vue-awesome-paginate
          :total-items="totalPages"
          :items-per-page="1"
          :max-pages-shown="3"
          v-model="currentPage"
          :on-click="paginate"
          :hide-prev-next="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "../stores/userstore";
import { useSortStore } from "../stores/sortStore";
import { serverLink } from "../constants";
import { IOffer } from "constants/IOffer";
import { onMounted, ref } from "vue";
import { reactive, watch } from "vue";
const fetchError = ref(false);

definePageMeta({
  middleware: ["auth"],
});

const route = useRoute();
const router = useRouter();
const searchResults = ref<IOffer[] | null>([]);

watch([() => route.query], ([query]) => {
  fetchSearchResults(query);
  resetPageOnQueryChange();
});

const res = await fetch(`${serverLink}/preferences/data`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
});
const currentPage = ref(1);
const perPage = 20;
const paginatedResults = computed(() => {
  const startIndex = (currentPage.value - 1) * perPage;
  const endIndex = startIndex + perPage;
  return searchResults.value?.slice(startIndex, endIndex);
});
const totalPages = computed(() =>
  Math.ceil(searchResults.value!.length / perPage)
);

const data = reactive(await res.json());

const fetchSearchResults = async (query: any) => {
  try {
    let response = null;
    if (query.type === "preferred") {
      response = await fetch(`${serverLink}/preferences/dedicatedOffers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + useUserStore().$state.accessToken,
        },
        body: JSON.stringify({
          email: useUserStore().$state.email,
          order: query.sort,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      searchResults.value = await response.json();
    } else if (query.type === "search") {
      response = await fetch(
        `${serverLink}/preferences/offers?` +
          new URLSearchParams({
            destination: query.destination,
            maxPrice: query.maxPrice,
            stars: query.stars,
            startDate: query.startDate,
            endDate: query.endDate,
            nutrition: query.nutrition,
            sort: query.sort,
          }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + useUserStore().$state.accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      searchResults.value = await response.json();
    } else {
      response = await fetch(
        `${serverLink}/preferences/getAllOffers?` +
          new URLSearchParams({
            sort: query.sort,
          }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + useUserStore().$state.accessToken,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      searchResults.value = await response.json();
    }
  } catch (error) {
    fetchError.value = true;
  }
};
const resetPageOnQueryChange = () => {
  currentPage.value = route.query.page ? Number(route.query.page) : 1;
};

function paginate(page: number) {
  router.push({
    path: "/home",
    query: {
      ...route.query,
      page: page,
    },
  });
  currentPage.value = page;
}

onMounted(() => {
  fetchSearchResults(route.query);
});

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

<script lang="ts">
import { ISort } from "constants/ISort";
import { get } from "http";
export default {
  data() {
    return {
      msg: "Home",
      showContent: false,
      rangeValue: 0,
      sort: false,
      sortStore: useSortStore(),
      store: useUserStore().$state,
      checkboxes: [
        { label: "All inclusive", value: "All" },
        { label: "Śniadania", value: "BB" },
        { label: "Śniadania i obiadokolacje", value: "HB" },
        { label: "Trzy Posiłki", value: "FB" },
        { label: "Bez wyżywienia", value: "RO" },
        { label: "Zgodnie z programem", value: "AI" },
      ],
      selectedCheckboxes: this.$route!.query.nutrition
        ? (this.$route!.query.nutrition as string).split(",")
        : [],
      query: {
        type: "all",
        destination: this.$route!.query.destination || "",
        maxPrice: this.$route!.query.maxPrice || 1500,
        stars: (this.$route!.query.stars as unknown as number) || 5,
        startDate: this.$route!.query.startDate || "",
        endDate: this.$route!.query.endDate || "",
        nutrition: this.$route!.query.nutrition || "",
      },
      countries: ["Malta", "Bułgaria", "Grecja", "Hiszpania", "Turcja", "Cypr"],
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
  computed: {
    isPreferred() {
      return this.$route!.query.type === "preferred";
    },
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
      this.query.stars = event;
    },
    search() {
      this.showContent = false;
      this.$router.push({
        path: "/home",
        query: {
          type: "search",
          destination: this.query.destination,
          maxPrice: this.query.maxPrice,
          stars: this.query.stars,
          startDate: this.query.startDate,
          endDate: this.query.endDate,
          nutrition: this.query.nutrition,
          sort: this.sortStore.$state.sort,
        },
      });
    },
    updateNutrition() {
      this.query.nutrition = this.selectedCheckboxes.join(",");
    },
    clearAll() {
      this.showContent = false;
      this.query = {
        type: "all",
        destination: "",
        maxPrice: "",
        stars: 0,
        startDate: "",
        endDate: "",
        nutrition: "",
      };
      this.$router.push({
        path: "/home",
        query: {
          type: "all",
          sort: this.sortStore.$state.sort,
        },
      });
    },
    changeSort(type: ISort) {
      this.sortStore.updateSort(type);

      const query = Object.assign({}, this.$route.query);
      query.sort = type;
      this.sort = false;

      this.$router.push({
        path: "/home",
        query: query,
      });
    },
  },
};
</script>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.active-page {
  background-color: rgb(20 184 166);
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
}
</style>
