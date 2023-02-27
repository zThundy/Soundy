const https = require("https");

// this class manages the twitch websocket connection
class TwitchAPI {
    constructor(tokens) {
        this.config = require("../config.json");
        // this.accessLink = "https://id.twitch.tv/oauth2/token?client_id={0}&client_secret={1}&code={2}&grant_type=authorization_code&redirect_uri={3}"
        this.accessToken = tokens.accessToken;
        this.refreshToken = tokens.refreshToken;
        this.sessionToken = tokens.sessionToken;
    }

    // this function returns the access token
    getAccessToken() {
        return this.accessToken;
    }

    // this function returns the refresh token
    getRefreshToken() {
        return this.refreshToken;
    }

    // this function set the this.accessToken variable, the this.refreshToken variable and the this.sessionToken variable
    setTokens({ accessToken, refreshToken, sessionToken }) {
        console.log("Setting tokens");
        if (accessToken) this.accessToken = accessToken;
        if (refreshToken) this.refreshToken = refreshToken;
        if (sessionToken) this.sessionToken = sessionToken;
    }

    getUserRewards(userId, identifier) {
        console.log("userId getUserRewards: " + userId);
        return new Promise((resolve, reject) => {
            const req = https.request(
                {
                    hostname: "api.twitch.tv",
                    method: 'GET',
                    path: "/helix/channel_points/custom_rewards?broadcaster_id=" + userId,
                    headers: {
                        'Content-Type': 'application/json',
                        "Client-Id": identifier,
                        "Authorization": "Bearer " + this.accessToken
                    }
                },
            (res) => {
                // listen for the response
                var body = "";
                // join multiple data in a single variable
                res.on("data", (chunk) => { body += chunk; });
                res.on("end", () => {
                    const response = JSON.parse(body);
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
}

module.exports = TwitchAPI;