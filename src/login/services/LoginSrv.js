class LoginSrv {
    constructor ($http) {
        this._$http = $http;
    }
    login (username, password) {
        //TODO remove mockup
        return this._$http.get(appSettings.apiUrl + '/events/simpleList.json');
    }
    logout (id) {
        //TODO remove mockup
        return mockEventList[id];
        return this._$http.get(appSettings.apiUrl + '/api/events/'+id);
    }
    retrievePassword (event) {
        //TODO
        throw 'Not Implemented Exception';
        return this._$http.get(appSettings.apiUrl + '/api/')
    }
    validateAccount () {
    }
    static LoginServiceFactory($http) {
        return new LoginSrv($http);
    }
}
LoginSrv.LoginServiceFactory.$inject = ['$http'];

export {LoginSrv};