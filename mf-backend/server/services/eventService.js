class EventService {

  constructor(eventModel, userModel) {
    this._eventModel = eventModel;
    this._userModel = userModel;
  }

  //#region Private Members

  getNearestEvents(userId, from, to) {
    const self = this,
          _ = require("underscore");
    return new Promise((resolve, reject) => {
      self._userModel.findById(userId, {
  				"include": [
  					{
  						relation: "myFriends",
  						scope: {
  							include: {
  								relation: "events",
  								scope: {
  									where: {
                      from: {
                          between: [from, to]
                      }
					          }
                  }
    						}
              }
  					},
            {
  						relation: "friendTo",
              scope: {
  							include: {
  								relation: "events",
  								scope: {
  									where: {
                      from: {
                          between: [from, to]
                      }
					          }
                  }
    						}
              }
  					},
  					{
  						relation: "events",
              scope: {
                where:{
                  from: {
                      between: [from, to]
                    }
                  }
               }
  					}
		     ]
  		}, function(error, user) {
  			if (error) {
  				reject(error);
  			}
  			let primaryUserEvents = [],
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
        let result = _.union(primaryUserEvents, myFriendsEvents, friendToEvents);
  			resolve(_.sortBy(result, "from"));
  		});
    });
  };

  //#endregion

}

module.exports = EventService;
