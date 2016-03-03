/**
 * This service is used to save and retrieve addresses
 * @class AddressSrv
 */
 class AddressSrv {    
    constructor ($http, API_URL) {
        this.$http = $http;
        this.API_URL = API_URL;
    }
    
    getAddressesForUser (userId) {
        return this.$http.get(this.API_URL.apiUrl + '/addresses/user/' + userId );
    }
    
    getAddress (id) {
        return this.$http.get(this.API_URL.apiUrl + '/addresses/' + id);
    }

    static AddressServiceFactory($http) {
        return new AddressSrv($http);
    }
}
AddressSrv.AddressServiceFactory.$inject = ['$http'];

export {AddressSrv}