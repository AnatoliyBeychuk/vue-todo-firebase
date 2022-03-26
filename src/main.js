import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
// import { firestorePlugin } from "vuefire"; //Ошибка (работает без него)
import router from "./router/";

createApp(App).use(router).mount("#app");
