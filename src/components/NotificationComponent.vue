<template>
  <div class="notifications-container">
    <div v-for="notification of notif" :key="notification.id" class="notif-container">
      <v-alert
        :type="notification.type || 'info'"
        :title="notification.title || null"
        :text="notification.message"
        closable
        close-label="Close"
        :al-id="notification.id"
        @click:close="close(notification.id)"
      ></v-alert>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["$emitter"],
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
      playing: false
    };
  },

  methods: {
    addNotif(data) {
      data.id = this.notif.length + 1;
      if (!data.type || !data.message) return;
      if (!data.time) data.time = 5000;
      this.notif.push(data);
      console.log(data);
      console.log(this.notif.length)
      if (!this.playing) this.cycleNotif(data)
    },
    cycleNotif(first) {
      this.playing = true;
      // this.notif.shift();
      setTimeout(() => {
        this.notif.shift();
        if (this.notif.length === 0) return this.playing = false;
        this.cycleNotif(this.notif[0])
      }, first.time);
    },
    close(id) {
      this.notif = this.notif.filter((notif) => notif.id !== id);
    }
  },

  mounted() {
    this.$emitter.on("notif", (data) => this.addNotif(data));
  },
};
</script>

<style scoped>
.notifications-container {
  display: flex;
  flex-direction: column;
  /* float notification in top right corner of screen */
  position: fixed;

  width: 350px;
  /* make height using the amount of text */
  height: auto;
  padding: 10px 10px 15px 15px;

  right: 10px;
  z-index: 99;
}

.notif-container {
  width: 350px;
  padding: 5px 10px 5px 10px;
  right: 10px;
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
