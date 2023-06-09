import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "SUPPORT",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  mode: "spa",
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/main.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/axios", "~/plugins/formatter"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/axios"
  ],
  axios: {
    baseURL: '/',
    proxy: true
  },
  proxy: {
    "/v1alpha": {
      target: "https://kong-api-proxy-qlws7pv5wa-as.a.run.app",
      changeOrigin: true
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios", "vue-sweetalert2/nuxt"],
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    ALL_SUPPORT: process.env.ALL_SUPPORT,
    ALL_MEMBER: process.env.ALL_MEMBER,
    ALL_PROMOTION: process.env.ALL_PROMOTION,
    ALL_DEPOSIT: process.env.ALL_DEPOSIT,
    ALL_WITHDRAW: process.env.ALL_WITHDRAW,
    ALL_SUPPORT_V2: process.env.ALL_SUPPORT_V2,
    ALL_SETTING: process.env.ALL_SETTING,
    ALL_MESSAGE: process.env.ALL_MESSAGE,
    ALL_RICO_USER: process.env.ALL_RICO_USER,
    ALL_COMPANY_BANK: process.env.ALL_COMPANY_BANK,
    ALL_RICO_REPORT: process.env.ALL_RICO_REPORT,
    REAL_TIME_REPORT_URL_SEAMLESS: process.env.REAL_TIME_REPORT_URL_SEAMLESS,
    AFF_SETTING: process.env.AFF_SETTING,
    AFF_MEMBER: process.env.AFF_MEMBER,
    ALL_CASHBACK: process.env.ALL_CASHBACK,
    ALL_EDITCREDIT: process.env.ALL_EDITCREDIT
  }
};
