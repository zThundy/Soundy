<template>
  <div
    v-if="currentNotif.type && currentNotif.message"
    class="notif-container show"
    :class="currentNotif.type"
  >
    <font-awesome-icon
      v-if="currentNotif.type === 'error'"
      id="icon"
      icon="fa-solid fa-triangle-exclamation"
    />
    <font-awesome-icon
      v-else-if="currentNotif.type === 'success'"
      id="icon"
      icon="fa-solid fa-check"
    />
    <span class="notif-container-text">{{ currentNotif.message }}</span>
  </div>
</template>

<script>
import emitter from "tiny-emitter/instance";

export default {
  data() {
    return {
      notif: [
        // {
        //   type: "error",
        //   message: "Error: This is a test notification and it's a super long error notification that can be extended to multiple lines.",
        //   time: 5000
        // },
        // {
        //   type: "success",
        //   message: "Success: This is a test notification and it's a super long error notification that can be extended to multiple lines.",
        //   time: 10000
        // }
      ],
      currentNotif: {},
    };
  },

  methods: {
    addNotif(data) {
      if (!data.type || !data.message) return;
      if (!data.time) data.time = 5000;
      this.notif.push(data);
      if (!this.currentNotif.message) this.cycleNotif();
    },
    cycleNotif() {
      if (this.notif.length === 0) {
        this.currentNotif = {};
        return;
      }
      this.currentNotif = this.notif.shift();
      return setTimeout(() => {
        // remove class "show" from notification container
        const ref = document.querySelector(".notif-container");
        ref.classList.remove("show");
        ref.classList.add("hide");
        return setTimeout(() => {
          this.currentNotif = {};
          setTimeout(() => this.cycleNotif(), 100);
        }, 100);
      }, this.currentNotif.time);
    },
  },

  mounted() {
    emitter.on("notif", (data) => this.addNotif(data));
  },
};
</script>

<style scoped>
.notif-container {
  transition: all 0.1s ease-in-out;
  /* make notification container a flexbox */
  display: flex;
  flex-direction: row;
  /* float notification in top right corner of screen */
  position: fixed;

  width: 350px;
  /* make height using the amount of text */
  height: auto;
  padding: 10px 10px 15px 15px;

  top: 10px;
  right: 10px;
  z-index: 1;
  border-radius: 10px;
  justify-content: center;
}

.show {
  animation: shiftLeft 0.1s ease-in-out;
  animation-fill-mode: forwards;
}

.hide {
  animation: shiftRight 0.1s ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes shiftLeft {
  0% {
    right: -350px;
    height: 0;
  }
  100% {
    right: 10px;
    height: auto;
  }
}

@keyframes shiftRight {
  0% {
    right: 10px;
    height: auto;
  }
  100% {
    right: -350px;
    height: 0;
  }
}

#icon {
  padding: 5px;
  /* top: 5px; */
  font-size: 1.5em;
}

.notif-container-text {
  width: 90%;
  margin-left: 10px;
}

.error {
  color: white;
  background-color: rgb(255, 78, 78);
}

.success {
  color: white;
  background-color: rgb(53, 158, 53);
}
</style>
