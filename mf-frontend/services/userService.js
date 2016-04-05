let instance = null;

let ServiceBase = require('./serviceBase');

class UserService extends ServiceBase {

    constructor() {
        super();
        if (!instance) {
            instance = this;
            this._currentUser = {
                id: '570154078f581b5437f24dd5',
                isAuthorized: false,
                name: ''
            };
        }
        return instance;
    }

    get currentUser() {
        return this._currentUser;
    }

    /*isUserAuthorized() {
        return new Promise((resolve, reject) => {
            if (!this._currentUser.isAuthorized) {
                authorize().then(() => {
                    resolve(true);
                }).catch((error) => {
                    reject(error);
                });
            } else {
                resolve(true);
            }
        });
    }*/

    authorize() {
        return Promise((resolve, reject) => {
            //TODO: Add logic to authorize user
            this._currentUser = {
                isAuthorized: true
            };
            resolve(true);
        });
    }

}

module.exports = UserService;