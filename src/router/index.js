import { createRouter, createWebHistory, createMemoryHistory } from "vue-router";

const router = createRouter({
  history: import.meta.env.SSR
      ? createMemoryHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/cookies",
      component: () => import("../views/CookiesPage.vue"),
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
