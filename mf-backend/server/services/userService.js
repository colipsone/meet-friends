var UserService = function(UserModel) {

  var _ = require("underscore");

  //#region Private Members

  var getNearestEvents = function(userId, from, to) {
    return new Promise((resolve, reject) => {
      UserModel.findById(userId, {
  				"include": [
  					{
  						"relation": "myFriends",
  						"scope": {
  							"include": {
  								"relation": "events",
  								"scope": {
  									"where": {"and":
  										[
  											{"from": {"gte": from}},
  											{"to": {"lte": to}}
  										]
  									}
  								}
  							}
  						}
  					},
  					{
  						"relation": "friendTo",
  						"scope": {
  							"include": {
  								"relation": "events",
  								"scope": {
  									"where": {"and":
  										[
  											{"from": {"gte": from}},
  											{"to": {"lte": to}}
  										]
  									}
  								}
  							}
  						}
  					},
  					{
  						"relation": "events",
  						"scope": {
  							"where": {"and":
  								[
  									{"from": {"gte": from}},
  									{"to": {"lte": to}}
  								]
  							}
  						}
  					}
  			]
  		}, function(error, user) {
  			if (error) {
  				reject(error);
  			}
        //resolve(user);
  			var primaryUserEvents = [],
  					myFriendsEvents = [],
  					friendToEvents = [];
  			user.events().forEach(event => {
  				event.photoUrl = user.photoUrl;
  				event.userName = user.username;
  				primaryUserEvents.push(event);
  			});
  			user.myFriends().forEach(friend => {
  				friend.events().forEach(event => {
  					event.photoUrl = friend.photoUrl;
  					event.userName = friend.username;
  					myFriendsEvents.push(event);
  				});
  			});
  			user.friendTo().forEach(friend => {
  				friend.events().forEach(event => {
  					event.photoUrl = friend.photoUrl;
  					event.userName = friend.username;
  					friendToEvents.push(event);
  				});
  			});
        var result = _.union(primaryUserEvents, myFriendsEvents, friendToEvents);
  			resolve(_.sortBy(result, "from"));
  		});
    });
  };

  var getFriends = function (userId) {
    return new Promise((resolve, reject) => {
      UserModel.findById(userId,
	    {
	        include: ['myFriends', 'friendTo']
	    },
	    (error, user) => {
	        if (error) {
	            reject(error);
	        }
	        var friends = [];
	        user.friendTo().forEach(function(friend) {
	            friends.push(friend);
	        });
	        user.myFriends().forEach(function (friend) {
	            friends.push(friend);
	        });
	        resolve(friends);
	    });
    });
	};

  var addToFriends = function(firstUserId, secondUserId) {
    return new Promise((resolve, reject) => {
      UserModel.find({
          where: {
            id: {
              inq: [firstUserId, secondUserId]
            }
          },
          include: ['myFriends', 'friendTo']
        }, (err, users) => {
          if (err) {
            reject(`An error has been occured during operation! Details: ${err}`);
          }
          if (users.length < 2) {
            reject('One of mentioned users hasn\'t been found!');
          }
          var firstUser = users[0],
              secondUser = users[1],
              firstUserFriends = _.union(firstUser.myFriends(), firstUser.friendTo());
          if (_.find(firstUserFriends, user => {
              return user.id.toString() == secondUser.id.toString();
          })) {
              resolve(`Users ${firstUser.username} and ${secondUser.username} are friends already!`);
          }
          firstUser.myFriends.add(secondUser, (err) => {
            if (err) {
              reject(`An error has been occured during operation! Details: ${err}`);
            }
            resolve(`Users ${firstUser.username} and ${secondUser.username} are friends now!`);
          });
        });
    });
  };

  var removeFromFriends = function (firstUserId, secondUserId) {
      return new Promise((resolve, reject) => {
        UserModel.find({
  	        where: {
  	            id: { inq: [firstUserId, secondUserId] }
  	        },
  	        include: ['myFriends', 'friendTo']
  	    },
  	    (err, users) => {
  	        if (err) {
  	            reject(`An error has been occured during operation! Details: ${err}`);
  	        }
  	        if (users.length < 2) {
  	            resolve('One of mentioned users hasn\'t been found!');
  	        }
            var firstUser = _.find(users, user => {return user.id.toString() == firstUserId}),
                secondUser = _.find(users, user => {return user.id.toString() == secondUserId}),
                firstUserFriends = firstUser.myFriends(),
                firstUserFriendTo = firstUser.friendTo();
                firstUserAllFriends = _.union(firstUserFriends, firstUserFriendTo),
                friend = _.find(firstUserAllFriends, user => {
                  return user.id.toString() == secondUserId;
                });
            if (friend) {
              if (_.indexOf(firstUserFriends, friend) != -1) {
                firstUser.myFriends.remove(friend, (err, user) => {
                  if (err) {
                    reject(err);
                  }
                  resolve(`Users ${firstUser.username} and ${secondUser.username} are not friends anymore!`);
                });
              } else {
                firstUser.friendTo.remove(friend, (err, user) => {
                  if (err) {
                    reject(err);
                  }
                  resolve(`Users ${firstUser.username} and ${secondUser.username} are not friends anymore!`);
                });
              }
            } else {
              resolve(`Users ${firstUser.username} and ${secondUser.username} are not friends!`);
            }
        });
    });
  }

  var searchForUsers = function (searchPhrase) {
    return new Promise((resolve, reject) => {
      UserModel.find({
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

  return {
    getNearestEvents: getNearestEvents,
    addToFriends: addToFriends,
    getFriends: getFriends,
    removeFromFriends: removeFromFriends,
    searchForUsers: searchForUsers
  };

}

module.exports = UserService;
