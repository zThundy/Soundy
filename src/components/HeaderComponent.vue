<template>
  <div class="container">
    <div class="info-container">
      <v-badge
        style="margin-left: 20px;"
        :content="2"
        color="green"
      >
        <v-btn
          color="#333333"
          icon="mdi-bullhorn"
        ></v-btn>
      </v-badge>
      
      <v-badge
        style="margin-left: 20px;"
        :content="20"
        color="red"
      >
        <v-btn
          color="#333333"
          icon="mdi-bell"
        ></v-btn>
      </v-badge>
    </div>

    <div class="profile-container">
      <div class="multitext-container">
        <span class="profile-name" style="font-weight: bold;" @click="click('url')">{{ profile.username }}</span>
        <div class="profile-edit"  @click="click('url')">
          <v-icon icon="mdi-account-edit" class="icon"></v-icon> Account
        </div>
      </div>
      
      <v-avatar style="border: 3px solid white;" image="/assets/zThundy.png" size="80"></v-avatar>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboardHeader",
  inject: ["$profileAPI"],
  data() {
    if (process.env.NODE_ENV === "development") {
      return {
        profile: {
          username: "zThundy"
        },
      };
    } else {
      return {
        profile: this.$profileAPI.getProfile(),
      };
    }
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
  margin: auto;
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
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 10px;
  flex-basis: content;
}

.multitext-container {
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
  text-decoration: underline;
  color: white;
}

.profile-edit {
  font-size: 0.8em;
  width: 100px;
}

.profile-edit:hover {
  text-decoration: underline;
  color: white;
}
</style>
