<template>
  <div
    class="flex flex-col gap-4 w-full min-w-full rounded-xl p-4 shadow-md dark:bg-zinc-800 dark:hover:bg-zinc-700 hover:bg-gray-100 transition-all lg:flex-row"
  >
    <div class="w-full lg:w-96">
      <div
        class="h-60 lg:h-60 bg-cover bg-center bg-no-repeat rounded-lg"
        :style="{ backgroundImage: `url('/xd.jpg')` }"
      ></div>
    </div>
    <div class="flex-1 flex flex-col">
      <div class="text-2xl">Hotel ABC</div>
      <p class="inline-flex items-center">
        <StarRating :totalStars="5" />
      </p>
      <p class="text-sm text-gray-500 truncate dark:text-gray-400 mt-1">
        Grecja/Ateny
      </p>
      <p class="inline-flex items-center" style="margin-top: 10px">
        <svg
          class="fill-current w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M17.75 3A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25A3.25 3.25 0 0 1 6.25 3h11.5Zm1.75 5.5h-15v9.25c0 .966.784 1.75 1.75 1.75h11.5a1.75 1.75 0 0 0 1.75-1.75V8.5Zm-11.75 6a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm4.25 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm-4.25-4a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm4.25 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm4.25 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm1.5-6H6.25A1.75 1.75 0 0 0 4.5 6.25V7h15v-.75a1.75 1.75 0 0 0-1.75-1.75Z"
            v-if="fill"
            :fill="fill"
          />
        </svg>
        <span class="text-sm text-gray-500 truncate dark:text-gray-400"
          >14.09.2023-28.09.2023</span
        >
      </p>
      <p class="inline-flex items-center" style="margin-top: 4px">
        <svg
          class="fill-current w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M18 3a1 1 0 0 1 .993.883L19 4v16a1 1 0 0 1-1.993.117L17 20v-5h-1a1 1 0 0 1-.993-.883L15 14V8c0-2.21 1.5-5 3-5Zm-6 0a1 1 0 0 1 .993.883L13 4v5a4.002 4.002 0 0 1-3 3.874V20a1 1 0 0 1-1.993.117L8 20v-7.126a4.002 4.002 0 0 1-2.995-3.668L5 9V4a1 1 0 0 1 1.993-.117L7 4v5a2 2 0 0 0 1 1.732V4a1 1 0 0 1 1.993-.117L10 4l.001 6.732a2 2 0 0 0 .992-1.563L11 9V4a1 1 0 0 1 1-1Z"
            v-if="fill"
            :fill="fill"
          />
        </svg>
        <span class="text-sm text-gray-500 truncate dark:text-gray-400"
          >All-inclusive</span
        >
      </p>
      <p class="inline-flex items-center" style="margin-top: 4px">
        <svg
          class="fill-current w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 1.999c5.524 0 10.002 4.478 10.002 10.002 0 5.523-4.478 10.001-10.002 10.001-5.524 0-10.002-4.478-10.002-10.001C1.998 6.477 6.476 1.999 12 1.999Zm0 1.5a8.502 8.502 0 1 0 0 17.003A8.502 8.502 0 0 0 12 3.5Zm-.004 7a.75.75 0 0 1 .744.648l.007.102.003 5.502a.75.75 0 0 1-1.493.102l-.007-.101-.003-5.502a.75.75 0 0 1 .75-.75ZM12 7.003a.999.999 0 1 1 0 1.997.999.999 0 0 1 0-1.997Z"
            v-if="fill"
            :fill="fill"
          />
        </svg>
        <span class="text-sm text-gray-500 truncate dark:text-gray-400"
          >Wakacje.pl</span
        >
      </p>
      <div style="flex: 1"></div>
    </div>
    <div
      class="flex flex-row max-h-max justify-between items-center px-8 py-3 bg-transparent lg:flex-col lg:border-l border-gray-300 dark:border-gray-600 bg-gray-300 dark:bg-zinc-600 lg:bg-transparent lg:dark:bg-transparent rounded-lg lg:rounded-none"
    >
      <div class="text-3xl">1200$</div>
      <button
        class="bg-teal-500 hover:bg-teal-600 dark:bg-teal-800 dark:hover:bg-teal-900 font-bold py-2 px-4 rounded transition-all"
      >
        See offer
      </button>
    </div>
  </div>
</template>

<script setup>
const colorMode = useColorMode();
const StarRating = resolveComponent("Star");
const fill = ref(null);

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
