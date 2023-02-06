<script>
export default {
  inject: ["$emitter"],
  data() {
    return {
      username: "",
      password: "",
    };
  },

  methods: {
    login() {
      if (this.username.length === 0 || this.password.length === 0) {
        this.$emitter.emit("notif", {
          message: "Please fill in all fields to login",
          type: "error",
          time: 2000,
        });
        return;
      }
      if (!this.isEmailValid(this.username)) {
        this.$emitter.emit("notif", {
          message: "Please enter a valid email address",
          type: "error",
          time: 2000,
        });
        return;
      }
      this.$emitter.emit("notif", {
        message: "Logged in successfully. Redirecting...",
        type: "success",
      });
      this.$router.push("/dashboard/:" + this.username);
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
      <label>USERNAME <span>*</span></label>
      <input type="text" id="username" v-model.trim="username" />
      <label style="margin-top: 6%">PASSWORD <span>*</span></label>
      <input type="password" id="password" v-model.trim="password" />
      <div class="text">
        <router-link class="a" to="/forgot">Forgot your password?</router-link>
      </div>
      <button type="submit" v-on:click="login">Log In</button>
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

  width: 672px;
  height: 702px;
  min-width: 672px;
  min-height: 702px;

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
  color: hsl(220, calc(1 * 7.7%), 80%);
  font-weight: bold;
}

/* make label span red and smaller */
label span {
  color: rgb(255, 102, 102);
  font-size: 0.9em;
}

.text {
  /* put content on same line */
  width: 80%;
  margin-top: 1%;
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
  width: 80%;
  height: 30%;

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
