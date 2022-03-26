<template>
  <div>
    <h1>Create an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>
    <p><button @click="signInWithGoogle">Sign In With Google</button></p>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, provider } from "../firebase/db";
import { useRouter } from "vue-router";
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const register = () => {
      auth
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((data) => {
          console.log("Successfully registered!");
          router.push("/todos");
        })
        .catch((error) => {
          console.log(error.code);
          alert(error.message);
        });
    };
    const signInWithGoogle = () => {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          router.push("/todos");
        })
        .catch((error) => {});
    };

    return { email, password, register, signInWithGoogle };
  },
};
</script>
<style scoped></style>
