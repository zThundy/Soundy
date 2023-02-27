class Sessions {
    constructor() {
        this.sessions = new Map();
    }

    newSession(sessionid, data) {
        console.log("New session: " + sessionid);
        // check if session already exists
        if (this.sessions.has(sessionid)) return;
        this.sessions.set(sessionid, data);
    }

    deleteSession(sessionid) {
        console.log("Deleting session: " + sessionid);
        // check if session exists
        if (!this.sessions.has(sessionid)) return;
        this.sessions.delete(sessionid);
    }

    getSessionData(sessionid) {
        return this.sessions.get(sessionid);
    }
}

module.exports = Sessions;