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
            this.db.all("SELECT * FROM users WHERE email = ?", [email], (rows) => {
                if (rows[0]) resolve(rows[0])
                else reject("User not found")
            })
        })
    }
}

module.exports = Database;