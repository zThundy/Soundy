<script>
// import { RouterLink, RouterView } from "vue-router";
import { RouterView } from "vue-router";
import Notification from "./components/NotificationComponent.vue";
import Cookies from "./components/CookiesComponent.vue";

export default {
  name: "App",
  components: { Notification, Cookies, RouterView },
};
</script>

<template>
  <v-app style="flex-direction: column;" class="app-container">
    <Notification />
    <Cookies />

    <RouterView />
  </v-app>
</template>

<style scoped>
.app-container {
  height: 100vh;
  width: 100%;
  block-size: auto;
  background-color: rgba(0, 0, 0, 0);
}
</style>
