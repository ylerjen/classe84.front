angular.module('84.users').factory('usrSrv', ['$http', 'API_URL', function ($http, API_URL) {
	return {
		getUsers : function(){
			return $http.get(API_URL.api84 + '/users');
		},
		findById: function(id){
			return $http.get(API_URL.api84 + '/users/' + id);
		},
		saveUser: function(user){
			return $http.get(API_URL.api84 + '/users/');
		}
	};
}]).factory('fbSrv', ['$http', 'API_URL', function ($http, API_URL) {
    return {
        getFbSilouetteUrl : function (fbId) {           
            var fbUrl = API_URL.fbApiUrl + fbId + '/picture?type=normal&redirect=false';
            return $http.get(fbUrl);
        }
    }
}]);