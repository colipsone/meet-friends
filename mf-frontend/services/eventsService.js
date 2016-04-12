let ServiceBase = require('./serviceBase');
let UserService = require('./userService');

class EventsService extends ServiceBase {

    constructor() {
        super();
        this._userService = new UserService();
        this._currentUser = this._userService.currentUser;
    }

    getEvents(responseCallback) {
        fetch(`${this.serverApiBaseUrl}/users/nearestEvents?userId=${this._currentUser.id}`)
            .then(response => {
                response.json().then((jsonData) => {
                    responseCallback(jsonData.events);
                });
            }).catch(this.handleError);
    }

    save(newEvent) {
        newEvent.userId = this._userService.currentUser.id;
        return new Promise((resolve, reject) => {
            fetch(`${this.serverApiBaseUrl}/events/`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newEvent)
                })
                .then(response => {
                    response.json().then((jsonData) => {
                        resolve(jsonData);
                    });
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

module.exports = EventsService;