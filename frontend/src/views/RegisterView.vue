<template>
  <div class="container">
    <div class="img-container">
      <img src="/assets/logoname-500x500.png" />
    </div>

    <div class="form-cotainer">
      <div id="form">
        <label style="margin-top: 2%">EMAIL <span>*</span></label>
        <input type="text" id="email" v-model.trim="email" />
        <label style="margin-top: 8%">REPEAT EMAIL <span>*</span></label>
        <input type="text" id="email" v-model.trim="remail" />
      </div>

      <div class="divider"></div>

      <div id="form">
        <label style="margin-top: 2%">PASSWORD <span>*</span></label>
        <input type="password" id="password" v-model.trim="password" />
        <label style="margin-top: 8%">REPEAT PASSWORD <span>*</span></label>
        <input type="password" id="repeatPassword" v-model.trim="repeatPassword" />
      </div>
    </div>

    <button type="submit" v-on:click="register">Register</button>
    <div class="text">
      Already have an account? <router-link class="a" to="/">Login</router-link>
    </div>
  </div>
</template>

<script>
import { useCookies } from 'vue3-cookies';

export default {
  inject: ["$emitter"],
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
      remail: "",
      $cookies: useCookies()
    };
  },

  methods: {
    register() {
      if (
        this.remail.length === 0 ||
        this.email.length === 0 ||
        this.password.length === 0 ||
        this.repeatPassword.length === 0
      ) {
        return this.$emitter.emit("notif", {
          message: "Please fill in all fields to create an account",
          type: "error",
          time: 1000,
        });
      }
      if (!this.isEmailValid(this.email) || !this.isEmailValid(this.remail)) {
        return this.$emitter.emit("notif", {
          message: "Please enter a valid email address",
          type: "error",
          time: 1000,
        });
      }
      if (this.isEmailValid(this.username)) {
        return this.$emitter.emit("notif", {
          message: "Please enter a valid username",
          type: "error",
          time: 1000,
        });
      }
      if (this.password !== this.rpassword) {
        return this.$emitter.emit("notif", {
          message: "Passwords do not match",
          type: "error",
          time: 1000,
        });
      }
      // make an api call to the server
      this.$profileAPI.tryRegister({ email: this.email, remail: this.remail, password: this.password, rpassword: this.rpassword })
        .then(response => {
          
        })
        .catch(e => {
          this.$emitter.emit("notif", {
            message: e,
            type: "error",
            time: 5000,
          });
        });
    },

    // add function that checks if email is valid wirh regex
    isEmailValid(email) {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },

  mounted() {
    const userid = this.$cookies.get("userId");
    if (userid) this.$router.push("/dashboard/" + userid);
  }
};
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

  width: 1300px;
  height: 600px;
  min-width: 1300px;
  min-height: 600px;

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
  height: 100%;
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
  height: 55px;

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
