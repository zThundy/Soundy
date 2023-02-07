import { log } from "../compositions/Logger.js";

class ProfileAPI {
  constructor() {
    if (process.env.NODE_ENV === "development" && true) {
      this.profileInfo = {
        name: "zThundy__",
        email: "test@example.com",
        profilePicture:
          "https://cdn.discordapp.com/attachments/1052161749534654465/1072248158014406688/zThundy_gift.png",
      };
    } else {
      this.profileInfo = null;
    }
    localStorage.setItem('profileInfo', JSON.stringify(this.profileInfo));
  }

  getCachedProfile() {
    return JSON.parse(localStorage.getItem('profileInfo'));
  }

  async getProfile() {
    var localProfile = this.getCachedProfile();
    if (localProfile) {
      return localProfile;
    }

    try {
      const response = await fetch("/api/profile");
      const data = await response.json();
      this.profileInfo = data;
      localStorage.setItem('profileInfo', JSON.stringify(this.profileInfo));
      return this.getCachedProfile();
    } catch (err) {
      log(err);
      return null;
    }
  }

  async getProfilePicture() {
    const profileInfo = await this.getProfile();
    return profileInfo?.profilePicture;
  }

  async getProfileName() {
    const profileInfo = await this.getProfile();
    return profileInfo?.name;
  }

  saveProfile(profile) {
    this.profileInfo = profile;
    localStorage.setItem('profileInfo', JSON.stringify(this.profileInfo));
    // TODO: Save profile to database

  }

  async tryLogin(data) {
    return new Promise((resolve, reject) => {
      const { email, password } = data;
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Basic " + btoa(email + ":" + password)
        },
      })
      .then((response) => {
        resolve(response.status);
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        this.saveProfile(data);
      })
      .catch((error) => {
        console.error("There has been a problem with your fetch operation:", error);
      });
    });
  }
}

export default new ProfileAPI();
