module.exports = function (User) {

	var UserService = new require("../../server/services/userService");
	var userServiceInst = new UserService(User);

	User.getNearestEvents = function(userId, from, to, callback){
		var fromDate = new Date(from);
		var toDate = new Date(to);
		userServiceInst.getNearestEvents(userId, fromDate, toDate).then(events => {
				callback(null, events);
		});
	};

	User.getFriends = function (userId, callback) {
		userServiceInst.getFriends(userId)
		.then(friends => {
			callback(null, friends);
		});
	};

	User.addToFriends = function (firstUserId, secondUserId, callback) {
		userServiceInst.addToFriends(firstUserId, secondUserId)
		.then(result => {
			callback(null, result);
		});
	};

	User.removeFromFriends = function (firstUserId, secondUserId, callback) {
		userServiceInst.removeFromFriends(firstUserId, secondUserId)
		.then(result => {
			callback(null, result);
		});
	};

	User.remoteMethod('getNearestEvents', {
		http: {path: '/nearestEvents', verb: 'get'},
		accepts: [
			{arg: 'userId', type: 'string'},
			{arg: 'from', type: 'string'},
			{arg: 'to', type: 'string'},
		],
		returns: {arg: 'events', type: 'Array'}
	});

	User.remoteMethod('getFriends', {
	    http: { path: '/getFriends', verb: 'get' },
	    accepts: { arg: 'userId', type: 'string' },
	    returns: { arg: 'friends', type: 'Array' }
	});

	User.remoteMethod('addToFriends', {
	    http: { path: '/addToFriends', verb: 'get' },
	    accepts: [{ arg: 'firstUserId', type: 'string' }, { arg: 'secondUserId', type: 'string' }],
	    returns: { arg: 'message', type: 'string' }
	});

	User.remoteMethod('removeFromFriends', {
	    http: { path: '/removeFromFriends', verb: 'get' },
	    accepts: [{ arg: 'firstUserId', type: 'string' }, { arg: 'secondUserId', type: 'string' }],
	    returns: { arg: 'message', type: 'string' }
	});
};
