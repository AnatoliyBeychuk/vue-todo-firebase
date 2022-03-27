<template>
  <div class="flex flex-col justify-center items-center h-80 border-2">
    <h1 class="bold text-lg mb-5">Sign In to an Account</h1>
    <input
      class="mb-4 w-60 rounded-md border focus:outline-none hover:outline-none focus:ring-2 hover:ring-2 focus:to-blue-600 hover:to-blue-600 h-10 p-1"
      type="text"
      placeholder="Email"
      v-model="email"
    />
    <input
      class="mb-4 w-60 rounded-md border focus:outline-none hover:outline-none focus:ring-2 hover:ring-2 focus:to-blue-600 hover:to-blue-600 h-10 p-1"
      type="password"
      placeholder="Password"
      v-model="password"
    />
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <button
      class="w-48 rounded-lg bg-green-500 text-white p-2 uppercase m-3 hover:bg-green-600"
      @click="login"
    >
      Login
    </button>
    <button
      @click="signInWithGoogle"
      class="flex border-2 rounded-md p-1 mt-2 justify-center items-center w-60"
      data-provider="google"
      data-oauthserver="https://accounts.google.com/o/oauth2/auth"
      data-oauthversion="2.0"
    >
      <svg
        aria-hidden="true"
        class="native svg-icon iconGoogle"
        width="18"
        height="18"
        viewBox="0 0 18 18"
      >
        <path
          d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18Z"
          fill="#4285F4"
        ></path>
        <path
          d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17Z"
          fill="#34A853"
        ></path>
        <path
          d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07Z"
          fill="#FBBC05"
        ></path>
        <path
          d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3Z"
          fill="#EA4335"
        ></path>
      </svg>
      Sign up with Google
    </button>
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
