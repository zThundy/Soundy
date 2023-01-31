<script>
import emitter from "tiny-emitter/instance";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    };
  },

  methods: {
    register() {
      if (
        this.username.length === 0 ||
        this.email.length === 0 ||
        this.password.length === 0 ||
        this.repeatPassword.length === 0
      ) {
        emitter.emit("notif", {
          message: "Please fill in all fields to create an account",
          type: "error",
          time: 1000,
        });
        return;
      }
      if (!this.isEmailValid(this.email)) {
        emitter.emit("notif", {
          message: "Please enter a valid email address",
          type: "error",
          time: 1000,
        });
        return;
      }
      if (this.isEmailValid(this.username)) {
        emitter.emit("notif", {
          message: "Please enter a valid username",
          type: "error",
          time: 1000,
        });
        return;
      }
      if (this.password !== this.repeatPassword) {
        emitter.emit("notif", {
          message: "Passwords do not match",
          type: "error",
          time: 1000,
        });
        return;
      }
      emitter.emit("notif", {
        message: "Account created successfully",
        type: "success",
      });
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

    <div class="form-cotainer">
      <div id="form">
        <label>USERNAME <span>*</span></label>
        <input type="text" id="username" v-model.trim="username" />
        <label style="margin-top: 8%">EMAIL <span>*</span></label>
        <input type="text" id="email" v-model.trim="email" />
      </div>

      <div class="divider"></div>

      <div id="form">
        <label>PASSWORD <span>*</span></label>
        <input type="password" id="password" v-model.trim="password" />
        <label style="margin-top: 8%">REPEAT PASSWORD <span>*</span></label>
        <input
          type="password"
          id="repeatPassword"
          v-model.trim="repeatPassword"
        />
      </div>
    </div>

    <button type="submit" v-on:click="register">Register</button>
    <div class="text">
      Already have an account? <router-link class="a" to="/">Login</router-link>
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

  width: 1500px;
  height: 700px;
  min-width: 1500px;
  min-height: 700px;

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

.form-cotainer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
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

.divider {
  width: 1px;
  height: 80%;
  background-color: rgb(77, 77, 77);
}

/* align label element on left side of input */
label {
  align-self: flex-start;
  margin-left: 10%;
  margin-bottom: 2%;
  color: hsl(220, calc(1 * 7.7%), 80%);
  font-weight: bold;
}

/* make label span red and smaller */
label span {
  color: rgb(255, 102, 102);
  font-size: 0.9em;
}

.text {
  width: 80%;
  margin-top: 1%;
  margin-bottom: 2%;
  text-align: center;
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
  height: 30%;

  /* add black shadow behind */
  box-shadow: 0 0 5px 0 hsl(220, calc(1 * 7.7%), 15%);
  /* remove border when focusing on input */
  outline: none;
  /* fill input with text when writing something in */
  font-size: 1.2em;
  /* add a bit of padding on text */
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
  width: 40%;
  height: 15%;
  margin-top: 2%;

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
