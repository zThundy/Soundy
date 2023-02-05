<template>
  <!-- table to contain sidebar and content of page -->
  
  <div class="dashboard-container">
    <SideMenu />
    
    <div class="homepage-content-container">
      <HeaderComponent />
      <RouterView class="router-view" />
    </div>

    <div v-if="uploaderActive" class="uploader-container">
      <div class="file-uploader">
        <FileUploader />
      </div>
    </div>
  </div>
</template>

<script>
// import { RouterLink, RouterView } from "vue-router";
import emitter from "tiny-emitter/instance";
import SideMenu from "../../components/SideMenu.vue";
import HeaderComponent from "../../components/HeaderComponent.vue";
import FileUploader from "../../components/FileUploader.vue";

export default {
  name: "HomePage",
  components: { SideMenu, HeaderComponent, FileUploader },
  data() {
    return {
      uploaderActive: false,
    };
  },

  methods: {
    // disableUploader() {
    //   console.log("disableUploader")
    //   if (this.uploaderActive) {
    //     this.uploaderActive = false;
    //   }
    // },
  },

  mounted() {
    emitter.on("toggle-uploader", (bool) => {
      if (!bool) {
        this.uploaderActive = !this.uploaderActive;
      } else {
        this.uploaderActive = Boolean(bool) || false;
      }
    });
  },
};
</script>

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

.uploader-container {
  position: absolute;
  /* display: flex; */
  /* flex-direction: column; */
  /* text-align: center; */
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
  width: 100%;
  height: 100%;
  /* color: white; */
  /* background-color: white; */
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.file-uploader {
  border-radius: 20px;
  background-color: rgb(107, 107, 107);
  margin: auto;
  width: 50%;
  height: auto;
  opacity: 0;
  animation: showUploader 0.1s ease-in-out;
  animation-fill-mode: forwards;
  z-index: 2;
}

@keyframes showUploader {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
