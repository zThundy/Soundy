<template>
  <!-- table to contain sidebar and content of page -->

  <div class="dashboard-container">
    <SideMenu />

    <div class="homepage-content-container">
      <HeaderComponent />
      <div class="page-container">
        <RouterView class="router-view" />
        
        <!-- <Suspense>
          <template #default>
            <RouterView class="router-view" />
          </template>
          <template #fallback>
            <div class="loading">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
          </template>
        </Suspense> -->
      </div>
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
import SideMenu from "../../components/SideMenu.vue";
import HeaderComponent from "../../components/HeaderComponent.vue";
import FileUploader from "../../components/FileUploader.vue";

export default {
  name: "HomePage",
  components: { SideMenu, HeaderComponent, FileUploader },
  inject: ["$emitter"],
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
    this.$emitter.on("toggle-uploader", (bool) => {
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
.button {
  user-select: none;
  transition: all 0.1s ease-in-out;
  border-radius: 10px;
  padding: 10px 15px 10px 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: rgb(180, 0, 190);
  cursor: pointer;
  width: fit-content;
  color: white;
  text-align: center;
}

.button:hover {
  transition: all 0.1s ease-in-out;
  background-color: rgb(176, 49, 185);
  color: white;
}

.loading {
  display: flex;
  flex-direction: row;
  height: 50vh;
  width: 100%;
  margin-top: 25px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgb(70, 70, 70);
  color: rgb(247, 92, 255);
  border-radius: 10px;
  font-size: 4em;
  justify-content: center;
  align-items: center;
  background-size: 400% 400%;
  animation: colorShift 5s ease infinite;
}

/* keyframes to animate color change of spinner */
@keyframes colorShift {
  0% {
    color: rgb(247, 92, 255);
  }
  50% {
    color: rgb(163, 55, 167);
  }
  100% {
    color: rgb(247, 92, 255);
  }
}

.page-container {
  height: 100%;
  width: 80vw;
  margin-left: auto;
  margin-right: auto;
  margin-top: 25px;
  margin-bottom: 30px;
  background-color: rgb(70, 70, 70);
  border-radius: 10px;
}

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
