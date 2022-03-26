import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/db";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: () => import("../pages/HomePage.vue") },
    { path: "/register", component: () => import("../pages/RegisterPage.vue") },
    { path: "/sign-in", component: () => import("../pages/SingInPage.vue") },
    {
      path: "/todos",
      component: () => import("../pages/TodosPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: "update",
      path: "/todos/update/:id",
      props: true,
      component: () => import("../pages/TaskDetailPage.vue"),
    },
    {
      name: "create",
      path: "/todos/create",
      props: true,
      component: () => import("../pages/TaskDetailPage.vue"),
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = auth.onAuthStateChanged((user) => {
      removeListener();
      resolve(user);
    }, reject);
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You dont have access!");
      next("/");
    }
  } else {
    next();
  }
});

export default router;
