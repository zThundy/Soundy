import { log } from '../compositions/Logger.js';

class ProfileAPI {
  constructor() {
    if (process.env.NODE_ENV === 'development' && true) {
      this.profileInfo = {
        name: 'zThundy__',
        email: "test@example.com",
        profilePicture: 'https://cdn.discordapp.com/attachments/1052161749534654465/1072248158014406688/zThundy_gift.png',
      };
    } else {
      this.profileInfo = null;
    }
  }

  getCachedProfile() {
    return this.profileInfo;
  }

  async getProfile() {
    if (this.profileInfo) {
      return this.profileInfo;
    }

    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      this.profileInfo = data;
      return data;
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
    // TODO: Save profile to database
  }
}

export default new ProfileAPI();