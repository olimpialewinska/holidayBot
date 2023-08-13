// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxt/image",
    "nuxt-rating",
    "@pinia/nuxt",
  ],
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  imports: {
    dirs: ["stores"],
  },
  colorMode: {
    classSuffix: "",
  },
  app: {
    head: {
      title: "HolidayBot",
      meta: [
        { name: "description", content: "HolidayBot" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    exposeLevel: 2,
    config: {},
    injectPosition: "first",
    viewer: true,
  },
});
