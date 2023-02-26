import { log } from "../compositions/Logger.js";

class ProfileAPI {
  constructor() {
    if (process.env.NODE_ENV === "development" && true) {
      this.profileBaseAPIUrl = "https://localhost:52150/profile/";

      this.profileInfo = {
        id: "dsdshdjs",
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
  
  getUserId() {
    return this.profileInfo?.id;
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

  tryLogin(data) {
    return new Promise(async (resolve, reject) => {
      const { username, password } = data;
      console.log(btoa(username + ":" + password))
      try {
        const response = await fetch(this.profileBaseAPIUrl + "login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Basic " + btoa(username + ":" + password),
          },
          // mode: "no-cors",
          // body: JSON.stringify(data)
        })
        
        console.log(response);
        if (response.ok) {
          const data = response.json();
          resolve(response.status);
          this.saveProfile(data);
        } else if (response.status === 404) {
          reject("User not found, please check the email or register a new user");
        }
      } catch(e) {
        console.error("There has been a problem with your fetch operation:", e);
        reject("There has been a problem with your fetch operation:", e);
      }
    });
  }

  tryRegister(data) {

  }
}

export default new ProfileAPI();
