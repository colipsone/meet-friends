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
}

module.exports = EventsService;