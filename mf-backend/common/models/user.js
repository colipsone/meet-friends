'use strict';
module.exports = function (User) {

	const _ = require("underscore");
	const UserService = require("../../server/services/userService");

	let userService = null;

  const getUserService = function() {
    if (!userService) {
      userService = new UserService(User);
    }
  	return userService;
  }

	User.searchForUsers = function (searchPhrase, callback) {
		if (_.isEmpty(searchPhrase)) {
			callback(null, []);
			return;
		}
		getUserService().searchForUsers(searchPhrase)
		.then(result => {
			callback(null, result);
		});
	};

	User.remoteMethod('searchForUsers', {
	    http: { path: '/searchForUsers', verb: 'get' },
	    accepts: { arg: 'searchPhrase', type: 'string' },
	    returns: { arg: 'users', type: 'Array' }
	});
};
