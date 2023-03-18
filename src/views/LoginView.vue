<template>
  <div class="container">
    <div class="img-container">
      <img src="/assets/logoname-500x500.png" />
    </div>

    <div id="form">
      <span class="welcome">Welcome to the most advanced and complete (not really) solution for implementing alerts, gifs and videos in your streams</span>
      <button type="submit" class="twitch-button" v-on:click="login"><v-icon icon="mdi-twitch"></v-icon> Log In witch Twitch</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { onServerPrefetch } from 'vue';
// import { useAppStore } from '../stores/appStore';
// const appStore = useAppStore();

// onServerPrefetch(() => {
//   console.log("server render");

//   setTimeout(() => {
//     console.log("updating store")
//     appStore.dataFrom = 'server';
//     console.log(appStore)
//   }, 5000)
// });

// appStore.$subscribe((mutation, state) => {
//   console.log(mutation)
//   console.log(state)
  
//   // localStorage.setItem('cart', JSON.stringify(state))
// })

function login() {
  console.log("login")
  // console.log(appStore.dataFrom)
  // console.log(appStore.test)
}

</script>

<style scoped>
.container {
  margin: auto;

  border-radius: 15px;
  border: 1px solid hsl(220, calc(1 * 7.7%), 15%);
  /* add black shadow behind */
  box-shadow: 0 0 10px 0 hsl(220, calc(1 * 7.7%), 15%);

  display: flex;
  flex-direction: column;
  background-color: hsl(220, calc(1 * 7.7%), 22.9%);
  align-items: center;
  justify-content: center;

  width: 600px;
  height: 300px;
  min-width: 600px;
  min-height: 300px;

  animation: showAnim 0.5s ease-in-out;
  animation-fill-mode: forwards;
}

@keyframes showAnim {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.img-container {
  position: relative;
  width: 80%;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* fit image in img-container in div */
img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

#form {
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.welcome {
  width: 80%;
  margin-bottom: 5%;
  color: white;
}

.twitch-button {
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  border-radius: 5px;
  border: 1px solid hsl(220, calc(1 * 7.7%), 15%);
  background-color: rgb(100, 65, 165);
  color: rgba(255, 255, 255, 1);
  padding: 5px;
  width: 80%;
  height: 30%;

  /* add black shadow behind */
  box-shadow: 0 0 5px 0 hsl(220, calc(1 * 7.7%), 15%);
  font-size: 1.2em;
  font-weight: bold;
}

.twitch-button:focus {
  transition: all 0.2s ease-in-out;
  outline: none;
  background-color: rgb(85, 55, 141);
}

.twitch-button:hover {
  transition: all 0.2s ease-in-out;
  background-color: rgb(85, 55, 141);
}
</style>
