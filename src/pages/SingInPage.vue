<template>
  <div>
    <h1>Sign In to an Account</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <p><button @click="login">Login</button></p>
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
    const errorMessage = ref("");
    const router = useRouter();

    const login = () => {
      auth
        .signInWithEmailAndPassword(email.value, password.value)
        .then((data) => {
          console.log("Successfully signed in!");
          router.push("/todos");
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/invalid-email":
              errorMessage.value = "Invalid email";
              break;
            case "auth/user-not-found":
              errorMessage.value = "No account with that email was found";
              break;
            case "auth/wrong-password":
              errorMessage.value = "Incorrect password";
              break;
            default:
              errorMessage.value = "Email or password was incorrect";
              break;
          }
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

    return { email, password, errorMessage, login, signInWithGoogle };
  },
};
</script>
<style scoped></style>
