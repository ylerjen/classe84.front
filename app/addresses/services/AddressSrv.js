angular.module('84.services').factory('addressSrv', function ($http) {
    return {
        getAddressesForUser : function (userId) {
            return $http.get(appSettings.apiUrl + '/addresses/user/' + userId );
        },
        getAddress : function (id) {
            return $http.get(appSettings.apiUrl + '/addresses/' + id);
        }
    }
});