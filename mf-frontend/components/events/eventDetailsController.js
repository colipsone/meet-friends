class EventDetailsController {

    constructor() {
        const EventsService = require('../../services/eventsService');
        this._eventsService = new EventsService();
        this._newEvent = {};
        return this;
    }

    get newEvent() {
        return this._newEvent;
    }

    setStartDate(date) {
        this._newEvent.from = date;
    }

    setEndDate(date) {
        this._newEvent.to = date;
    }

    save() {
        this._eventsService.save(this._newEvent);
    }
}

module.exports = EventDetailsController;