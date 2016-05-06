class UserService {

  constructor(userModel) {
    this._userModel = userModel;
  }

  //#region Private Members

  searchForUsers (searchPhrase) {
    const self = this;
    return new Promise((resolve, reject) => {
      self._userModel.find({
        "where": {"or": [
          {"username": {"like": searchPhrase}},
          {"email": {"like": searchPhrase}},
          {"firstName": {"like": searchPhrase}},
          {"lastName": {"like": searchPhrase}}
        ]
      }
      }, (err, users) => {
        if (err) {
          reject(err);
        }
        resolve(users);
      });
    });
  }

  //#endregion

}

module.exports = UserService;
