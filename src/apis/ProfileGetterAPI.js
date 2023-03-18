import TwitchAPI from "./Twitch";
// const twitch = import.meta.env.SSR ? new TwitchAPI() : null;
import { useAppStore } from '../stores/appStore';

class ProfileAPI {
  constructor() {
    if (process.env.NODE_ENV === "development") {
    } else {
    }

    // if (import.meta.env.SSR) {
    //   const appStore = useAppStore();
    //   appStore.test = "testing value";
    //   console.log(appStore);

    //   if (!String.prototype.format) {
    //     String.prototype.format = function() {
    //       var args = arguments;
    //       return this.replace(/{(\d+)}/g, function(match, number) {
    //         return typeof args[number] != 'undefined' ? args[number] : match;
    //       });
    //     };
    //   }
    // }
  }

  async _initServer() {
    this.config = await import("./twitch.json");
    this.url = ("https://id.twitch.tv/oauth2/authorize?client_id={0}&redirect_uri={1}&response_type=code&scope={2}").format(
      this.config.clientId,
      this.config.redirectUri,
      this.config.scopes.join("+")
    )
  }

  tryLogin() {
    return new Promise(async (resolve, reject) => {
      console.log("retriving url", this.url);
      resolve(this.url);
    });
  }

  // this function authenticate the current session using https request
  authenticate(sessionToken) {
    return new Promise((resolve, reject) => {
      var postData = JSON.stringify({
        client_id: config.clientId,
        client_secret: config.secret,
        code: sessionToken,
        grant_type: "authorization_code",
        redirect_uri: config.redirectUri,
      });
      // make the request
      const req = https.request(
        {
          hostname: "id.twitch.tv",
          method: 'POST',
          path: "/oauth2/token",
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length,
          }
        },
      (res) => {
        // listen for the response
        res.on('data', (d) => {
          const response = JSON.parse(d.toString('utf8'));
          resolve({ accessToken: response.access_token, refreshToken: response.refresh_token, sessionToken });
        });
      });
      // listen for possible errors
      req.on('error', (e) => {
        console.log("---------- ERROR ----------");
        console.error(e);
        reject(e);
      });
      // close the connection
      req.write(postData);
      req.end();
    });
  }

  validate(accessToken) {
    return new Promise((resolve, reject) => {
      const req = https.request(
        {
          hostname: "id.twitch.tv",
          method: 'GET',
          path: "/oauth2/validate",
          headers: {
            "Authorization": "OAuth " + accessToken,
          }
        },
      (res) => {
        // listen for the response
        res.on('data', (d) => {
          const response = JSON.parse(d.toString('utf8'));
          resolve(response);
        });
      });
      // listen for possible errors
      req.on('error', (e) => {
          console.log("---------- ERROR ----------");
          console.error(e);
          reject(e);
      });
      // close the connection
      req.end();
    });
  }

  getProfile() {
    return {}
  }
}

export default new ProfileAPI();
