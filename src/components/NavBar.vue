<template>
  <nav class="flex items-center bg-blue-400 h-11">
    <div class="flex justify-start items-center h-full">
      <router-link
        class="text-lg text-white pl-3 pr-3 hover:text-amber-300"
        to="/"
        >Home</router-link
      >
      <router-link
        class="text-lg text-white pl-3 pr-3 hover:text-amber-300"
        to="/todos"
        v-if="isLoggedIn"
        >Todos</router-link
      >
      <router-link
        class="text-lg text-white pl-3 pr-3 hover:text-amber-300"
        to="/register"
        v-if="!isLoggedIn"
        >Register</router-link
      >
      <router-link
        class="text-lg text-white pl-3 pr-3 hover:text-amber-300"
        to="/sign-in"
        v-if="!isLoggedIn"
        >Login</router-link
      >
    </div>
    <div class="flex justify-end items-center ml-auto w-auto pr-3">
      <img
        class="rounded-full h-8 w-8"
        :src="photo"
        :alt="userName"
        v-if="isLoggedIn"
      />
      <span
        class="text-yellow-200 text-sm p-1 w-20 text-center h-full"
        v-if="isLoggedIn"
        >Welcome, <strong>{{ userName || "" }}</strong
        >!</span
      >
      <button
        class="bg-red-600 text-white text-xs rounded-lg w-20 p-1 hover:bg-red-700"
        @click="handleSignOut"
        v-if="isLoggedIn"
      >
        Sign out
      </button>
    </div>
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
    const photo = ref("");
    const userName = ref();

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
          photo.value = user.photoURL;
          userName.value = user.displayName.split(" ")[0];
          return;
        }
        isLoggedIn.value = false;
        email.value = "";
      });
    });

    return { isLoggedIn, email, photo, userName, handleSignOut };
  },
};
</script>
<style scoped></style>
