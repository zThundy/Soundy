<template>
  <div class="user-settings-container">
    <div class="settings-input-container">
      <label class="label">Username:</label>
      <input
        v-model="profile.name"
        maxlength="20"
        placeholder="Type the name of your sound file (max 20)"
      />
      <label class="label">Email:</label>
      <input
        v-model="profile.email"
        maxlength="50"
        placeholder="Type the description of your sound file (max 50)"
      />

      <div class="pfp-container" ref="pfp-container">
        <img :src="profile.profilePicture" />
        <font-awesome-icon class="faicon" icon="camera" />
      </div>
      
      <div class="refresh-button" @click="saveProfile()">
        <span><font-awesome-icon icon="floppy-disk" /> Save</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserSettings",
  inject: ["$profileAPI", "$emitter"],
  data() {
    return {
      profile: this.$profileAPI.getCachedProfile(),
    };
  },

  methods: {
    saveProfile() {
      this.$profileAPI.saveProfile(this.profile);
      this.$emitter.emit("notif", {
        type: "success",
        message: "Profile saved!",
        time: 1000,
      });
    },
  },
};
</script>

<style>
.user-settings-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: auto;
  margin: 15px;
  background-color: rgb(128, 128, 128);
  border-radius: 20px;
}

.settings-input-container {
  display: flex;
  flex-direction: column;
  height: auto;
  width: 92%;
  margin: auto;
  margin-top: 25px;
  border-radius: 10px;
}

.settings-input-container input {
  transition: all 0.1s ease-in-out;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: auto;
  background-color: rgb(70, 70, 70);
  height: auto;
  padding: 15px;
  width: 100%;
  border: none;
  border-radius: 15px;
  color: white;
}

.settings-input-container input:hover {
  transition: all 0.1s ease-in-out;
  background-color: rgb(80, 80, 80);
}

.settings-input-container input:focus {
  transition: all 0.1s ease-in-out;
  outline: none;
  background-color: rgb(90, 90, 90);
  box-shadow: 0 0 5px 0 rgb(255, 255, 255);
}

.pfp-container {
  width: 100%;
  /* margin: auto; */
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
  z-index: 1;
}

.pfp-container img {
  transition: all 0.1s ease-in-out;
  object-fit: cover;
  width: 150px;
  height: 150px;
  border-radius: 15px;
  border: 3px solid white;
  margin: auto;
  cursor: pointer;
  box-shadow: 0 0 2px 0 rgb(255, 255, 255);
  background-color: black;
}

.pfp-container img:hover {
  transition: all 0.1s ease-in-out;
  box-shadow: 0 0 10px 0 rgb(255, 255, 255);
  opacity: 0.5;
}

.faicon {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5em;
  color: rgb(0, 0, 0);
  z-index: -1;
}

/* show faicon on hover of img */
.pfp-container img:hover + .faicon {
  display: block;
}
</style>
