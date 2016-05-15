let instance = null;

let ServiceBase = require('./serviceBase');

class UserService extends ServiceBase {

    constructor() {
        super();
        if (!instance) {
            instance = this;
            instance._currentUser = {
                id: '570154078f581b5437f24dd5',
                isAuthorized: false,
                accesToken: ''
            };
        }
        return instance;
    }

    get currentUser() {
        return instance._currentUser;
    }

    search(searchPhrase) {
      return new Promise((resolve, reject) => {
              fetch(`${instance.serverApiBaseUrl}/users/searchForUsers?searchPhrase=${searchPhrase}`)
              .then(response => {
                  response.json().then((jsonData) => {
                      if (!jsonData.error) {
                          resolve(jsonData.users);
                      } else {
                          reject(jsonData.error.message);
                      }
                  });
              })
              .catch(error => {
                  reject(error.message);
              });
      });
    }

    login(email, password) {
        return new Promise((resolve, reject) => {
            fetch(`${instance.serverApiBaseUrl}/users/login`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })
                .then(response => {
                    response.json().then((jsonData) => {
                        if (!jsonData.error) {
                            instance._currentUser.id = jsonData.userId;
                            instance._currentUser.accesToken = jsonData.id;
                            instance._currentUser.isAuthorized = true;
                            resolve(true);
                        } else {
                            instance._currentUser.isAuthorized = false;
                            reject(jsonData.error.message);
                        }
                    });
                })
                .catch(error => {
                    reject(error.message);
                });
        });
    }

    logout() {
        return new Promise((resolve, reject) => {
            fetch(`${instance.serverApiBaseUrl}/users/logout`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    access_token: instance._currentUser.accesToken
                })
            })
                .then(response => {
                    response.json().then((jsonData) => {
                        if (!jsonData.error) {
                            instance._currentUser.id = '';
                            instance._currentUser.accesToken = '';
                            instance._currentUser.isAuthorized = false;
                            resolve(true);
                        } else {
                            reject(jsonData.error.message);
                        }
                    });
                });
        });
    }

}

module.exports = UserService;
