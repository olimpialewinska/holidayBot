<template>
  <svg
    v-for="index in totalStars"
    :key="index"
    class="fill-current w-4 h-4 md:w-4 md:h-4 lg:w-4 lg:h-4"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      d="M10.788 3.103c.495-1.004 1.926-1.004 2.421 0l2.358 4.777 5.273.766c1.107.161 1.549 1.522.748 2.303l-3.816 3.72.901 5.25c.19 1.103-.968 1.944-1.959 1.424l-4.716-2.48-4.715 2.48c-.99.52-2.148-.32-1.96-1.424l.901-5.25-3.815-3.72c-.801-.78-.359-2.142.748-2.303L8.43 7.88l2.358-4.777Z"
      :fill="fillColor"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  totalStars: {
    type: Number,
    required: true,
  },
  fillColor: {
    type: String,
    default: "#ccaa00",
  },
});
</script>
