export default class AuthSrv {
    constructor($http, API_URL, jwtHlpr) {
        this._$http = $http;
        this.API_URL = API_URL;
        this._jwtHlpr = jwtHlpr;
    }
    login(username, password) {
        var data = {
            email: username,
            password: password
        };
        return this._$http.post(this.API_URL.api84 + '/login', data);
        var isExpired = this._jwtHlpr.isTokenExpired(token);
        console.log('token', token);
        console.log('is token expired', isExpired);
    }
    logout(id) {
        return this._$http.get(this.API_URL.api84 + '/logout');
    }
}