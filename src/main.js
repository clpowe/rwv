import { createApp } from "vue";
import { store } from './store'
import App from "./App.vue";
import router from "./router";
import GStore from "./store/GStore.js";
import 'nprogress/nprogress.css'



createApp(App)
  .use(store)
  .use(router)
  .provide('GStore',GStore)
  .mount("#app");
