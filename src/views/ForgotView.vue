<script>
import emitter from "tiny-emitter/instance";

export default {
  data() {
    return {
      email: "",
    };
  },

  methods: {
    login() {
      if (!this.isEmailValid(this.email)) {
        emitter.emit("notif", {
          message:
            "Please enter a valid email address to request a password reset",
          type: "error",
          time: 1000,
        });
        return;
      }
      console.log(this.email);
    },

    // add function that checks if email is valid wirh regex
    isEmailValid(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="img-container">
      <img src="/assets/logoname-500x500.png" />
    </div>

    <div id="form">
      <label>EMAIL</label>
      <input type="text" id="username" v-model.trim="email" />
      <button type="submit" v-on:click="login">Reset password</button>
      <div class="text">
        Need an account?
        <router-link class="a" to="/register">Register</router-link>
      </div>
    </div>
  </div>
</template>

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

  width: 670px;
  height: 550px;
  min-width: 670px;
  min-height: 550px;

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
  width: 50%;
  height: 50%;
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
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* align label element on left side of input */
label {
  align-self: flex-start;
  margin-left: 10%;
  margin-bottom: 2%;
  margin-top: 4%;
  color: hsl(220, calc(1 * 7.7%), 80%);
  font-weight: bold;
}

/* make label span red and smaller */
label span {
  color: rgb(255, 102, 102);
  font-size: 0.9em;
}

.text {
  margin-top: 1%;
  width: 80%;
  margin-bottom: 6%;
  align-self: flex-start;
  margin-left: 10%;
}

/* make link purple and align it to left side under last input */
.text .a {
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  margin-top: 1%;
  margin-bottom: 5%;
  align-self: flex-start;
  color: rgb(181, 101, 187);
  text-decoration: none;
}

.text .a:hover {
  transition: all 0.1s ease-in-out;
  text-decoration: underline;
  color: rgb(246, 124, 255);
}

/* style the input filed like discord */
input {
  transition: all 0.2s ease-in-out;
  border: 1px solid hsl(220, calc(1 * 7.7%), 15%);
  border-radius: 5px;
  background-color: hsl(220, calc(1 * 7.7%), 18%);
  color: hsl(220, calc(1 * 7.7%), 80%);
  padding: 5px;
  width: 80%;
  height: 20%;

  box-shadow: 0 0 5px 0 hsl(220, calc(1 * 7.7%), 15%);
  outline: none;
  font-size: 1.2em;
  padding-left: 12px;
}

/* style the input when in focus */
input:focus {
  transition: all 0.2s ease-in-out;
  border: 1px solid hsl(220, calc(1 * 7.7%), 12%);
  box-shadow: 0 0 10px 0 hsl(220, calc(1 * 7.7%), 12%);
}

button {
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  border-radius: 5px;
  border: 1px solid hsl(220, calc(1 * 7.7%), 15%);
  background-color: rgb(180, 0, 190);
  color: rgba(255, 255, 255, 1);
  padding: 5px;
  width: 80%;
  height: 20%;
  margin-top: 10%;

  /* add black shadow behind */
  box-shadow: 0 0 5px 0 hsl(220, calc(1 * 7.7%), 15%);
  font-size: 1.2em;
  font-weight: bold;
}

button:focus {
  transition: all 0.2s ease-in-out;
  outline: none;
  background-color: rgb(130, 0, 140);
}

button:hover {
  transition: all 0.2s ease-in-out;
  background-color: rgb(130, 0, 140);
}
</style>
