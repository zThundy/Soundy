<template>
  <div class="container" :class="accepted ? 'slide-down' : 'slide-up'">
    <font-awesome-icon icon="fa-solid fa-cookie-bite" class="icon" />

    <div class="text-container">
      This website uses cookies to ensure you get the best experience on our
      website. Please accept our cookie policy to continue using our website. To
      learn more about our cookie policy, please visit this
      <router-link to="/cookies">page</router-link>.
    </div>

    <div class="button-container">
      <button class="accept-button" @click="acceptCookies">Accept</button>
      <button class="decline-button" @click="declineCookies">Decline</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // cookiePolicy: this.$cookies.get('cookie-policy'),
      /* if in dev mode then accepted: true */
      accepted: process.env.NODE_ENV === "development" ? true : false
    };
  },

  methods: {
    acceptCookies() {
      // this.$cookies.set('cookie-policy', 'accepted', '1Y');
      this.accepted = true;
    },
    declineCookies() {
      // this.$cookies.set('cookie-policy', 'declined', '1Y');
      this.accepted = true;
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
  color: black;
  z-index: 1;

  height: auto;
  width: 400px;
  /* make container transparent */
  background-color: rgb(255, 255, 255);
  /* make container not selectable */
  user-select: none;
  /* make container rounded */
  border-radius: 10px;
  /* add black shadow behind */
  box-shadow: 0 0 10px 0 rgb(0, 0, 0);
  padding: 15px 10px 10px 15px;
  display: flex;
  flex-direction: column;
}

.slide-up {
  animation: slideUp 1s ease-in-out;
  animation-fill-mode: forwards;
}

/* make keyframes to slide container up */
@keyframes slideUp {
  0% {
    bottom: -300px;
    opacity: 0;
  }
  100% {
    bottom: 10px;
    opacity: 1;
  }
}

.slide-down {
  animation: slideDown 1s ease-in-out;
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

.text-container {
  width: 100%;
  height: auto;
  font-size: 1em;
  color: rgb(0, 0, 0);
}

.button-container {
  justify-content: center;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  height: 4vh;
  margin-top: 2vh;
}
</style>
