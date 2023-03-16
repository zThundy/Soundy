<template>
  <div class="container">
    <div class="info-container">
      <div class="custom-button">
        <font-awesome-icon class="icon" icon="bullhorn" />
      </div>
    </div>
    <div class="profile-container">
      <div class="multitext-container">
        <span class="profile-name" @click="click('url')">{{ profile.name }}</span>
        <div class="profile-edit"  @click="click('url')">
          <font-awesome-icon class="icon" icon="pencil" /> Account
        </div>
      </div>
      <img src="/assets/zThundy.png"  @click="click('pic')" />
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboardHeader",
  inject: ["$profileAPI"],
  data() {
    return {
      profile: this.$profileAPI.getProfile(),
    };
  },

  methods: {
    click(type) {
      switch(type) {
        case "url":
          this.$router.push("/dashboard/" + this.profile.username + "/settings");
          break;
        case "pic":
          this.$router.push("/dashboard/" + this.profile.username + "/settings");
          this.$refs["pfp-container"].scrollIntoView({ behavior: "smooth" });
          break;
      }
    }
  },

  watch: {
    $route() {
      this.profile = this.$profileAPI.getProfile();
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
  border-bottom: 1px solid white;
  /* margin: 15px; */
}

.info-container {
  height: 100%;
  width: 100%;
  margin: 15px;
}

/* size of container as fit-content + 10px */
.custom-button {
  transition: all 0.1s ease-in-out;
  width: fit-content;
  padding: 12px;
  border-radius: 10px;
  background-color: #333333;
  cursor: pointer;
}

.custom-button:hover {
  transition: all 0.1s ease-in-out;
  background-color: #555555;
}

.custom-button .icon {
  margin: auto;
  font-size: 1.2em;
}

.profile-container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  text-align: right;
  margin: auto;
  flex-basis: content;
}

.profile-container img {
  transition: all 0.1s ease-in-out;
  object-fit: cover;
  width: 70px;
  height: 70px;
  border-radius: 15px;
  border: 3px solid white;
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 40px;
  cursor: pointer;
  box-shadow: 0 0 2px 0 rgb(255, 255, 255);
}

.profile-container img:hover {
  transition: all 0.1s ease-in-out;
  box-shadow: 0 0 10px 0 rgb(255, 255, 255);
}

.multitext-container {
  transition: all 0.1s ease-in-out;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: fit-content;
  margin: auto;
  margin-left: auto;
  margin-right: 30px;
  font-size: 1.2em;
  cursor: pointer;
}

.profile-name:hover {
  transition: all 0.1s ease-in-out;
  text-decoration: underline;
  color: white;
}

.profile-edit {
  font-size: 0.8em;
  transition: all 0.1s ease-in-out;
}

.profile-edit:hover {
  transition: all 0.1s ease-in-out;
  text-decoration: underline;
  color: white;
}
</style>
