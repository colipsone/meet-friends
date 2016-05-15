let ServiceBase = require('./serviceBase');
let UserService = require('./userService');

class EventsService extends ServiceBase {

    constructor() {
        super();
        this._userService = new UserService();
        this._currentUser = this._userService.currentUser;
    }

    getEvent(id) {
        const serverApiBaseUrl = this.serverApiBaseUrl;
        return new Promise(function(resolve, reject) {
            fetch(`${serverApiBaseUrl}/events/${id}`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json'
                    }
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

    getEvents(responseCallback) {
        fetch(`${this.serverApiBaseUrl}/events/nearestEvents?userId=${this._currentUser.id}&from=${new Date('10.05.2014')}&to=${new Date('10.05.2016')}`)
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
