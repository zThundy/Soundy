<template>
  <div class="user-settings-container">
    <div class="settings-input-container">
      <label class="label">Username:</label>
      <input v-model="profile.name" maxlength="20" placeholder="Type the name of your sound file (max 20)"/>
      <label class="label">Email:</label>
      <input v-model="profile.email" maxlength="50" placeholder="Type the description of your sound file (max 50)"/>
      <div class="refresh-button" @click="saveProfile()">
        <span><font-awesome-icon icon="floppy-disk" /> Save</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "settings",
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
</style>