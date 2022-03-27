import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
// import { firestorePlugin } from "vuefire"; //Ошибка (работает без него)
import router from "./router/";

import mitt from "mitt";
const emitter = mitt();

createApp(App).use(router).provide("emitter", emitter).mount("#app");
