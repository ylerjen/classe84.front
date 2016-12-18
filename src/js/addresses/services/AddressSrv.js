/**
 * This service is used to save and retrieve addresses
 * @class AddressSrv
 */
 export default class AddressSrv {    
    constructor ($http, API_URL) {
        this.$http = $http;
        this.API_URL = API_URL;
    }
    
    getAddressesForUser (userId) {
        return this.$http.get(this.API_URL.apiUrl + '/addresses/user/' + userId );
    }    
    get (id) {
        return this.$http.get(this.API_URL.apiUrl + '/addresses/' + id);
    }
    setDefault (id, userId) {        
        return this.$http.get(this.API_URL.apiUrl + '/user/' + userId + '/addresses/' + id);
    }
}