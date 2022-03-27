<template>
  <transition name="toast">
    <Toast v-if="showToast" :toast="error" />
  </transition>
  <nav-bar></nav-bar>
  <router-view />
</template>

<script>
import { inject } from "vue";
import { ref } from "vue";
import NavBar from "./components/NavBar.vue";
import Toast from "./components/toast/Toast.vue";

export default {
  components: { NavBar, Toast },
  setup() {
    const error = ref("Error message!");
    const showToast = ref(false);
    const emitter = inject("emitter");

    emitter.on("toast", (message) => {
      triggerToast(message);
    });

    const triggerToast = (message) => {
      error.value = message;
      showToast.value = true;
      setTimeout(() => (showToast.value = false), 3000);
    };
    return { showToast, triggerToast, error };
  },
};
</script>

<style scoped>
.toast-enter-form {
  opacity: 0;
  transform: translateY(-60px);
}
.toast-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.toast-enter-active {
  transition: all 0.3s ease;
}
</style>
