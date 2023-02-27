if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

const fs = require('fs');
const https = require("https");
const express = require('express');
const app = express();
var cors = require('cors');

const bodyParser = require('body-parser')

// custom modules
const Database = require("./modules/database.js");
const database = new Database();
database.init();

// express middlewares
app.use(express.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(cors());

const port = 52150;

app.use((req, res, next) => {
    console.log("middleware")
    req.database = database;
    next();
})

// express routes
const profileAuth = require('./routes/profileAuth.js');
app.use("/profile", profileAuth);

https
    .createServer({
        key: fs.readFileSync('./certs/server.key'),
        cert: fs.readFileSync('./certs/server.crt')
    }, app)
    .listen(port, () => {
        console.log(`Listening at http://localhost:${port}`);
    });