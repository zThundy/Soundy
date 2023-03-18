<template>
  <v-sheet
    class="container"
    :class="accepted ? 'slide-down' : 'slide-up'"
    :width="400"
  >
    <v-icon style="font-size: 5em" class="icon" icon="mdi-cookie"></v-icon>

    <p class="mb-8">
      This website uses cookies to ensure you get the best experience on our
      website. Please accept our cookie policy to continue using our website. To
      learn more about our cookie policy, please this
      <router-link to="/cookies">page</router-link>.
    </p>

    <v-btn
      block
      class="text-none mb-4"
      color="purple"
      size="x-large"
      variant="flat"
      @click="action(true)"
    >
      Accept
    </v-btn>

    <v-btn
      block
      class="text-none"
      color="purple"
      size="x-large"
      variant="outlined"
      @click="action(true)"
    >
      Decline
    </v-btn>
  </v-sheet>
</template>

<script>
export default {
  data() {
    return {
      // cookiePolicy: this.$cookies.get('cookie-policy'),
      /* if in dev mode then accepted: true */
      accepted: process.env.NODE_ENV === "development" ? true : false
      // accepted: false
    };
  },

  methods: {
    action(b) {
      // this.$cookies.set('cookie-policy', 'accepted', '1Y');
      this.accepted = b;
    },
  },

  mounted() {},
};
</script>

<style scoped>
/* create container in bottom right side of screen fixed */
.container {
  position: fixed;
  bottom: -300px;
  right: 10px;
  z-index: 1;

  height: auto;
  width: 400px;
  /* make container not selectable */
  user-select: none;
  /* add black shadow behind */
  box-shadow: 0 0 10px 0 rgb(0, 0, 0);
  padding: 15px 10px 10px 15px;
  display: flex;
  flex-direction: column;
}

.slide-up {
  animation: slideUp .3s ease-in-out;
  animation-fill-mode: forwards;
}

/* make keyframes to slide container up */
@keyframes slideUp {
  0% {
    bottom: -300px;
    opacity: 0;
  }
  40% {
    bottom: -300px;
    opacity: 0;
  }
  100% {
    bottom: 10px;
    opacity: 1;
  }
}

.slide-down {
  animation: slideDown .3s ease-in-out;
  animation-fill-mode: forwards;
}

/* make keyframes to slide container down */
@keyframes slideDown {
  0% {
    bottom: 10px;
    opacity: 1;
  }
  100% {
    bottom: -300px;
    opacity: 0;
  }
}

.icon {
  color: rgb(124, 65, 42);
  text-align: center;
  font-size: 3em;
  margin-bottom: 10px;
}
</style>
