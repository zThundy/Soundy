import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/cookies",
      component: () => import("../views/CookiesPage.vue"),
    },
    {
      path: "/register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/forgot",
      component: () => import("../views/ForgotView.vue"),
    },
    {
      name: "dashboard",
      path: "/dashboard/:id",
      component: () => import("../views/Dashboard/HomePage.vue"),
      children: [
        {
          icon: "home",
          name: "sounds",
          path: "",
          component: () => import("../views/Dashboard/SoundsPage.vue"),
        },
        {
          icon: "cog",
          name: "settings",
          path: "settings",
          component: () => import("../views/Dashboard/UserSettings.vue"),
        },
        {
          icon: "window-maximize",
          name: "alert-settings",
          path: "alert-settings",
          component: () => import("../views/Dashboard/AlertSettings.vue"),
        },
      ],
    },
  ],
});

export default router;
