module.exports = function(Event) {

  const _ = require("underscore");
  const EventService = require("../../server/services/eventService");

	let eventService = null;

  const getEventService = function() {
    if (!eventService) {
      eventService = new EventService(Event, Event.app.models.user);
    }
  	return eventService;
  }

  Event.getNearestEvents = function(userId, from, to, callback){
    if (_.isEmpty(userId) ||
        _.isEmpty(from) ||
        _.isEmpty(to)) {
      callback("Some of required input parameters are missed!");
      return;
    }
    try {
      const fromDate = new Date(from);
  		const toDate = new Date(to);
  		getEventService().getNearestEvents(userId, fromDate, toDate)
  		.then(events => {
  				callback(null, events);
  		})
      .catch(err => {
        callback(err);
      });
    } catch(err) {
      callback(err);
    }
	};

  Event.remoteMethod('getNearestEvents', {
		http: {path: '/nearestEvents', verb: 'get'},
		accepts: [
			{arg: 'userId', type: 'string'},
			{arg: 'from', type: 'string'},
			{arg: 'to', type: 'string'},
		],
		returns: {arg: 'events', type: 'Array'}
	});

};
