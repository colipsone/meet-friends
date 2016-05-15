'use strict';
module.exports = function (Friend) {

  const _ = require("underscore");
  const FriendService = require("../../server/services/friendService");

  let friendService = null;

  var getFriendService = function() {
    if (!friendService) {
      friendService = new FriendService(Friend.app.models.friendInvitation,
        Friend.app.models.user, Friend);
    }
  	return friendService;
  }

  Friend.getFriends = function (userId, callback) {
    if (_.isEmpty(userId)) {
      callback("Required userId parameter is missed!");
      return;
    }
		getFriendService().getFriends(userId)
		.then(friends => {
			callback(null, friends);
		})
    .catch(err => {
      callback(err);
    });
	};

	Friend.removeFromFriends = function (firstUserId, secondUserId, callback) {
    if (_.isEmpty(firstUserId) ||  _.isEmpty(secondUserId)) {
      callback("Some of required input parameters are missed!");
      return;
    }
		getFriendService().removeFromFriends(firstUserId, secondUserId)
		.then(result => {
			callback(null, result);
		})
    .catch(err => {
      callback(err);
    });
	};

	Friend.remoteMethod('removeFromFriends', {
	    http: { path: '/removeFromFriends', verb: 'get' },
	    accepts: [{ arg: 'firstUserId', type: 'string' }, { arg: 'secondUserId', type: 'string' }],
	    returns: { arg: 'message', type: 'string' }
	});

  Friend.remoteMethod('getFriends', {
	    http: { path: '/getFriends', verb: 'get' },
	    accepts: { arg: 'userId', type: 'string' },
	    returns: { arg: 'friends', type: 'Array' }
	});

};
