<script>
// import { RouterLink, RouterView } from "vue-router";
import SideMenu from "../../components/SideMenu.vue";
import HeaderComponent from "../../components/HeaderComponent.vue";

export default {
  name: "HomePage",
  components: { SideMenu, HeaderComponent },
  setup() {
    return {};
  },
};
</script>

<template>
  <!-- table to contain sidebar and content of page -->
  
  <div class="dashboard-container">
    <SideMenu />
    
    <div class="homepage-content-container">
      <HeaderComponent />
      <RouterView class="router-view" />
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  background: linear-gradient(
    130deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(30, 30, 30, 1) 80%,
    rgba(40, 40, 40, 1) 100%
  );
  background-size: 400% 400%;
	animation: gradient 20s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.homepage-content-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
