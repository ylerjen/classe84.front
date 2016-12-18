export default class EventService {
    constructor ($http, API_URL) {
        this.$http = $http;
        this._API_URL = API_URL;
    }
    getAll () {
        return this.$http.get(this._API_URL.api84 + '/events');
    }
    getById (id) {
        return this.$http.get(this._API_URL.api84 + '/events/' + id);
    }
    save (event) {
        throw 'Not Implemented Exception';
        return this.$http.post(this._API_URL.api84 + '/events/' + id);
    }
}