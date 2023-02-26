const express = require('express');
const router = express.Router();

const sessions = [];

let randomId = () => {
    return Math.floor((1 + Math.random()) * 0x10000000000000).toString(16).substring(1);
}

router.get('/', (req, res) => {
    console.log("Got profile");
    res.send('You are on the profile page');
});

router.post('/login', (req, res) => {
    const authData = atob(req.headers["authorization"].split("Basic ")[1]).split(":");
    const email = authData[0];
    const password = authData[1];
    req.database.checkIfUserExist(email)
        .then(user => {
            // check user credentials
            console.log(user);
        })
        .catch(e => {
            res.status(404).send(e).end();
        })
});

router.post('/register', (req, res) => {
    console.log("Got register");
    // res.send('You are on the login page');
    // res.json(req.body);
    console.log(req.headers);
    console.log(req.body);

    const data = JSON.parse(req.body);
    if (data.username && data.password && data.email) {
        if (data.password === data.passwordRepeat) {
            const userId = randomId();
        }
    }
});

module.exports = router;