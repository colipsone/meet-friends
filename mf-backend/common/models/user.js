module.exports = function (User) {
	User.getNearestEvents = function(userId, callBack) {
		User.findById(userId, {
			include: {
				relation: 'events',
				scope: {
					fields: {
						title: true,
						description: true,
						type: true,
						from: true,
						id: true
					}
				}
			}
		}, (error, user) => {
			if (error) {
				throw error;
			}
			var events = user.events();
			events.forEach((event) => {
				event.photoUrl = user.photoUrl;
				event.userName = user.username;
			});
			callBack(null, events);
		});
	};

	User.getFriends = function (userId, callBack) {
	    User.findById(userId,
	    {
	        include: ['myFriends', 'friendTo']
	    },
	    (error, user) => {
	        if (error) {
	            throw error;
	        }
	        var friends = [];
	        user.friendTo().forEach(function(friend) {
	            friends.push(friend);
	        });
	        user.myFriends().forEach(function (friend) {
	            friends.push(friend);
	        });
	        callBack(null, friends);
	    });
	};

	User.addToFriends = function (firstUserId, secondUserId, callBack) {
	    User.find({
	        where: {
	            id: { inq: [firstUserId, secondUserId] }
	        },
	        include: ['myFriends', 'friendTo']
	    },
	    (err, users) => {
	        if (err) {
	            callBack(null, `An error have been occured during operation! Details: ${err}`);
	        }
            if (users.length < 2) {
                callBack(null, 'One of mentioned users haven\'t been found!');
            }
            /*var firstUserFriendsIds = users[0].myFriends().map(user => user['id']);
            var secondUserFriendsIds = users[0].myFriends().map(user => user['id']);
	        console.log(firstUserFriendsIds.find(function(id) { return id === secondUserId; }));
	        console.log(secondUserFriendsIds.find(function (id) { return id === firstUserId; }));
            if (firstUserFriendsIds.find(function(id) { return id === secondUserId; }) ||
	            secondUserFriendsIds.find(function(id) { return id === firstUserId; })){
	            callBack(null, `Users ${users[0].username} and ${users[1].username} are friends already!`);
	        }*/
	        users[0].myFriends.add(users[1], (err) => {
	            if (err) {
	                callBack(null, `An error have been occured during operation! Details: ${err}`);
	            }
	            callBack(null, `Users ${users[0].username} and ${users[1].username} are friends now!`);
	        });
	    });
	};

	User.removeFromFriends = function (firstUserId, secondUserId, callBack) {
	    User.find({
	        where: {
	            id: { inq: [firstUserId, secondUserId] }
	        },
	        include: ['myFriends', 'friendTo']
	    },
	    (err, users) => {
	        if (err) {
	            callBack(null, `An error have been occured during operation! Details: ${err}`);
	        }
	        if (users.length < 2) {
	            callBack(null, 'One of mentioned users haven\'t been found!');
	        }
	        users[0].myFriends.findById(secondUserId, (err, friend) => {
	            if (err) {
	                callBack(null, `An error have been occured during operation! Details: ${err}`);
	            }
	            if (friend) {
	                users[0].myFriends.remove(friend,
	                (err) => {
	                    if (err) {
	                        callBack(null, `An error have been occured during operation! Details: ${err}`);
	                    }
	                });
	            } else {
	                users[0].friendTo.findById(secondUserId,
	                (err, friend) => {
	                    if (err) {
	                        callBack(null, `An error have been occured during operation! Details: ${err}`);
	                    }
	                    if (friend) {
	                        users[0].friendTo.remove(friend,
	                        (err) => {
	                            if (err) {
	                                callBack(null, `An error have been occured during operation! Details: ${err}`);
	                            }
	                        });
	                    }
	                });
	            }
	            callBack(null, `Users ${users[0].username} and ${users[1].username} are not friends anymore!`);
	        });
	    });
	};

	User.remoteMethod('getNearestEvents', {
		http: {path: '/nearestEvents', verb: 'get'},
		accepts: {arg: 'userId', type: 'string'},
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
