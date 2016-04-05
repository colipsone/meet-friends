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
			callBack(null, user.events());
		});
	};
	User.remoteMethod('getNearestEvents', {
		http: {path: '/nearestEvents', verb: 'get'},
		accepts: {arg: 'userId', type: 'string'},
		returns: {arg: 'events', type: 'Array'}
	});
};
