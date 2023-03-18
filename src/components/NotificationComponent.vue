<template>
  <div class="notifications-container">
    <div v-for="notification of notif" :key="notification.id" :id="'notif' + notification.id" class="notif-container show">
      <v-alert
        :type="notification.type || 'info'"
        :title="notification.title || null"
        :text="notification.message"
        :al-id="notification.id"
      >
        <template v-slot:append>
          <v-btn
            size="x-small"
            variant="text"
            style="background-color: rgba(0, 0, 0, 0)"
            icon="mdi-close"
            @click="close(notification.id)"
          ></v-btn>
        </template>
      </v-alert>
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
      if (!this.playing) this.cycleNotif(data)
    },
    cycleNotif(first) {
      this.playing = true;
      setTimeout(() => {
        this.notif.shift();
        if (this.notif.length === 0) return this.playing = false;
        this.cycleNotif(this.notif[0])
      }, first.time);
    },
    close(id) {
      const notifDiv = document.getElementById("notif" + id);
      if (notifDiv) {
        notifDiv.classList.remove("show");
        setTimeout(() => notifDiv.classList.add("hide"), 100);
        setTimeout(() => { this.notif = this.notif.filter((notif) => notif.id !== id) }, 220);
      }
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
  animation-direction: normal;
}

.hide {
  animation: shiftLeft 0.1s ease-in-out;
  animation-fill-mode: forwards;
  animation-direction: reverse;
}

@keyframes shiftLeft {
  0% {
    right: -350px;
  }
  100% {
    right: 10px;
  }
}
</style>
