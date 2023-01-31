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
  <div class="app-container">
    <Notification />
    <Cookies />

    <RouterView />
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  width: 100vw;
  block-size: auto;
}
</style>
