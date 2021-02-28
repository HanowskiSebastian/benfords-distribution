import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BaseSection from "./components/ui/BaseSection";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

createApp(App)
  .use(store)
  .use(router)
  .component("base-section", BaseSection)
  .mount("#app");
