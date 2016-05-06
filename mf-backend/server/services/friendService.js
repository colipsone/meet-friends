class FriendService {

  constructor(friendInvitationModel, userModel, friendModel) {
    this._friendInvitationModel = friendInvitationModel;
    this._userModel = userModel;
    this._friendModel = friendModel;
  }

  getFriends(userId) {
    let self = this;
    const _ = require("underscore");
    return new Promise((resolve, reject) => {
      self._userModel.findById(userId,
	    {
	        include: ['myFriends', 'friendTo']
	    },
	    (error, user) => {
	        if (error) {
            reject(error);
	        }
          if (user == undefined) {
            reject("User hasn't been found!")
          } else {
  	        resolve(_.union(user.friendTo(), user.myFriends()));
          }
	    });
    });
	};

  inviteFriend(invitedById, inviteeId) {
    let self = this;
    return new Promise((resolve, reject) => {
      self.checkUsersExistence(invitedById, inviteeId)
      .then(() => {
        self._friendInvitationModel.findOrCreate({
          "where": {
            "invitedById": invitedById,
            "inviteeId": inviteeId,
            "response": "none"
          }
        }, {
          "invitedById": invitedById,
          "inviteeId": inviteeId,
          "response": "none",
          "createdOn": new Date(),
          "updatedOn": new Date()
        }, (err, invitation) => {
          if (err) {
            reject(err);
          }
          resolve(invitation);
        });
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  getUserInvitations(userId) {
    let self = this;
    return new Promise((resolve, reject) => {
      self._friendInvitationModel.find({
        where: {
          and: [{inviteeId: userId},{response: "none"}]
        },
        include: 'invitedByUser'
      },
      (err, invitations) => {
        if (err) {
          reject(err);
        }
        let result = [];
        invitations.forEach(invitation => {
          let invitedByUser = invitation.invitedByUser();
          result.push({
            id: invitation.id,
            createdOn: invitation.createdOn,
            invitedByUser: {
              username: invitedByUser.username,
              photoUrl: invitedByUser.photoUrl,
              firstName: invitedByUser.firstName,
              lastName: invitedByUser.lastName
            }
          });
        });
        resolve(result);
      });
    });
  }

  checkUsersExistence(firstUserId, secondUserId) {
    const self = this;
    return new Promise((resolve, reject) => {
      self._userModel.count({
        "id": {"inq": [firstUserId, secondUserId]}
      }, (err, count) => {
        if (err) {
          reject(err);
        }
        if (count < 2) {
          reject("One of mentioned users doesn't exist in DB!");
        }
        resolve(true);
      });
    });
  }

  acceptFriendship(invitationId) {
    const self = this;
    return new Promise((resolve, reject) => {
      self._friendInvitationModel.findById(invitationId, (err, invitation) => {
        if (err) {
          reject(err);
        }
        self.addToFriends(invitation.invitedById, invitation.inviteeId)
        .then(response => {
          invitation.response = "accepted";
          invitation.updatedOn = new Date();
          self._friendInvitationModel.upsert(invitation, (err, invitation) => {
            if (err) {
              reject(err);
            }
            resolve(response);
          });
        })
        .catch(err => {
          reject(err);
        });
      });
    })
  }

  addToFriends(firstUserId, secondUserId) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.checkUsersExistence(firstUserId, secondUserId)
      .then(() => {
        self._friendModel.findOrCreate({
            where: {
              or: [
                {and: [
                  {friendOfId: firstUserId}, {friendToId: secondUserId}
                ]},
                {and: [
                  {friendOfId: secondUserId}, {friendToId: firstUserId}
                ]}
              ]
            }
          }, {
            friendOfId: firstUserId,
            friendToId: secondUserId
          }, (err, friend) => {
            if (err) {
              reject(err);
            }
            resolve("Success");
          });
        })
        .catch(err => {
          reject(err);
        });
      });
  };

  removeFromFriends(firstUserId, secondUserId) {
    const self = this;
      return new Promise((resolve, reject) => {
        self.checkUsersExistence(firstUserId, secondUserId)
        .then(() => {
          self._friendModel.findOne({
              where: {
                or: [
                  {and: [
                    {friendOfId: firstUserId}, {friendToId: secondUserId}
                  ]},
                  {and: [
                    {friendOfId: secondUserId}, {friendToId: firstUserId}
                  ]}
                ]
              }
            },(err, friend) => {
              if (err) {
                reject(err);
              }
              if (friend) {
                self._friendModel.destroyById(friend.id, (err) => {
                  if (err) {
                    reject(err);
                  }
                  resolve("Success");
                });
              } else {
                reject("Users are not friends!");
              }
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = FriendService;
