module.exports = function(FriendInvitation) {

  const _ = require("underscore");
  const FriendService = require("../../server/services/friendService");

  let friendService = null;

  const getFriendService = function() {
    if (!friendService) {
      friendService = new FriendService(FriendInvitation,
        FriendInvitation.app.models.user, FriendInvitation.app.models.friend);
    }
  	return friendService;
  }

  FriendInvitation.inviteFriend = function(invitedById, inviteeId, callback) {
    if (_.isEmpty(invitedById) ||  _.isEmpty(inviteeId)) {
      callback("Some of required input parameters are missed!");
      return;
    }
    getFriendService().inviteFriend(invitedById, inviteeId)
    .then(response => {
      callback(null, response);
    })
    .catch(err => {
      callback(err);
    });
  };

  FriendInvitation.acceptFriendship = function(invitationId, callback) {
    if (_.isEmpty(invitationId)) {
      callback("Required invitationId parameter is missed!");
      return;
    }
    getFriendService().acceptFriendship(invitationId)
    .then(response => {
      callback(null, response);
    })
    .catch(err => {
      callback(err);
    });
  };

  FriendInvitation.getUserInvitations = function(userId, callback) {
    if (_.isEmpty(userId)) {
      callback("Required userId parameter is missed!");
      return;
    }
    getFriendService().getUserInvitations(userId)
    .then(response => {
      callback(null, response);
    })
    .catch(err => {
      callback(err);
    });
  };

  FriendInvitation.remoteMethod('getUserInvitations', {
	    http: { path: '/getUserInvitations', verb: 'get' },
	    accepts: { arg: 'userId', type: 'string' },
	    returns: { arg: 'invitations', type: 'Array' }
	});

  FriendInvitation.remoteMethod('acceptFriendship', {
	    http: { path: '/acceptFriendship', verb: 'get' },
	    accepts: { arg: 'invitationId', type: 'string' },
	    returns: { arg: 'operationStatus', type: 'string' }
	});

  FriendInvitation.remoteMethod('inviteFriend', {
	    http: { path: '/inviteFriend', verb: 'get' },
	    accepts: [
        { arg: 'invitedBy', type: 'string' },
        { arg: 'invitee', type: 'string' }
      ],
	    returns: { arg: 'invitation', type: 'Object' }
	});

};
