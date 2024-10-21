import { createApp } from "vue";
import "./assets/index.css";
import Notifications from "@kyvg/vue3-notification";
import Vue3Lottie from "vue3-lottie";
import "nprogress/nprogress.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";
const recordManager = createApp(App);
const store = createPinia();
recordManager.use(router);
recordManager.use(store);
recordManager.use(Notifications, {
  ignoreDuplicates: true,
});
recordManager.use(Vue3Lottie);
recordManager.mount("#app");
