<script setup>
const OfferItem = resolveComponent("OfferItem");
</script>

<template>
  <div
    class="container px-2 mx-auto flex-col flex items-center w-screen"
    style="margin-bottom: 20px"
  >
    <div class="relative flex flex-col px-4 gap-4 w-full max-w-screen-xl">
      <OfferItem />
      <OfferItem /><OfferItem /><OfferItem /><OfferItem /><OfferItem /><OfferItem />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Home",
    };
  },
};
</script>

<style scoped></style>
