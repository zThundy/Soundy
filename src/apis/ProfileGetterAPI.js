import { log } from "../compositions/Logger.js";

class ProfileAPI {
  constructor() {
    if (process.env.NODE_ENV === "development" && true) {
    } else {
    }
  }

  tryLogin() {
    return new Promise(async (resolve, reject) => {
      fetch(this.profileBaseAPIUrl)
        .then(response => {
          resolve(response.json());
        })
        .catch(e => {
          console.log(e);
        })
    });
  }
}

export default new ProfileAPI();
