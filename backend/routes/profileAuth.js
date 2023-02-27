const express = require("express");
const router = express.Router();
const https = require("https");

const config = require("../modules/twitch.json");
const Sessions = require("../modules/sessions.js");

// this function authenticate the current session using https request
function authenticate(sessionToken) {
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

function validate(accessToken) {
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

router.get("/", async (req, res) => {
    /*
        here format the data.link field with
        {0} = config.redirectUri
        {1} = string
        {2} = config.scopes formatted with a + between each scope
    */
    var authLink = ("https://id.twitch.tv/oauth2/authorize?client_id={0}&redirect_uri={1}&response_type=code&scope={2}").format(
        config.clientId,
        req.headers.origin,
        config.scopes.join("+")
    );

    if (!req.query.code) return res.send({ url: authLink }).end();

    if (req.query.code) req.session.code = req.query.code;
    authenticate(req.session.code)
        .then(({ accessToken, refreshToken, sessionToken }) => {
            validate(accessToken)
                .then(({ client_id, login, user_id }) => {
                    req.session = new Sessions()
                    req.sessions.newSession(client_id, new User({
                        id: user_id,
                        identifier: client_id,
                        channelName: login,
                        tokens: { accessToken, refreshToken, sessionToken }
                    }, req.db, req.ws));
                    // maybe we don't need to add the tokens to the sessions
                    // req.session.access_token = accessToken;
                    // req.session.refresh_token = refreshToken;
                    // req.session.session_token = sessionToken;
                    req.session.user_id = user_id;
                    req.session.client_id = client_id;
                });
        })
        .catch(err => {
            console.log(err);
            res.send({ link: authLink }).end();
        });
});

module.exports = router;