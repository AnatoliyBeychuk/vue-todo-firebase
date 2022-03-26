<template>
  <nav class="nav-container">
    <router-link to="/"> | Home </router-link>
    <router-link to="/todos" v-if="isLoggedIn"> | Todos </router-link>
    <router-link to="/register" v-if="!isLoggedIn"> | Register </router-link>
    <router-link to="/sign-in" v-if="!isLoggedIn"> | Login |</router-link>
    <span v-if="isLoggedIn">{{ email }}</span>
    <button @click="handleSignOut" v-if="isLoggedIn">Sign out</button>
  </nav>
</template>

<script>
import { onMounted, ref } from "vue";
import { auth } from "../firebase/db";
import { useRouter } from "vue-router";

export default {
  setup() {
    const isLoggedIn = ref(false);
    const router = useRouter();
    const email = ref("");

    const handleSignOut = () => {
      auth.signOut().then(() => {
        router.push("/");
      });
    };

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          isLoggedIn.value = true;
          email.value = user.email;
          return;
        }
        isLoggedIn.value = false;
        email.value = "";
      });
    });

    return { isLoggedIn, email, handleSignOut };
  },
};
</script>
<style scoped></style>
