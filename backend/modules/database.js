const sqlite = require('sqlite3');

class Database {
    constructor() {
        this.db = null;
    }

    init() {
        return new Promise(async (resolve, reject) => {
            try {
                this.db = new sqlite.Database(`./main.db`);
                await this._run("CREATE TABLE IF NOT EXISTS users (userId TEXT, username TEXT, email TEXT, password TEXT)");
                await this._run("CREATE TABLE IF NOT EXISTS sounds (soundId TEXT, userId TEXT, name TEXT, description TEXT, points INT, volume INT)");
                resolve();
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    }

    _run(stmt) {
        return new Promise((resolve, reject) => {
            this.db.run(stmt, {}, () => { resolve() });
        })
    }

    checkIfUserExist(email) {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM users WHERE email = ?", [email], (e, rows) => {
                console.log(rows)
                if (rows && rows[0]) resolve(rows[0])
                else reject("User not found")
            })
        })
    }

    createUserIfNotExist(data) {
        return new Promise((resolve, reject) => {
            this.checkIfUserExist(data.email)
                .then(user => {
                    if (user) reject("User already exist");
                })
                .catch(() => {
                    this.db.all("INSERT INTO users VALUES (?, ?, ?, ?)", [data.userId, data.email, data.email, data.password]);
                    resolve(data.userId);
                })

        })
    }
}

module.exports = Database;