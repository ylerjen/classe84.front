angular.module('84.users').factory('usrSrv', ['$http', 'API_URL', function ($http, API_URL) {
	return {
		getUsers : function(){
			return $http.get(API_URL.api84 + '/users');
		},
		findById: function(id){
			return $http.get(API_URL.api84 + '/users/' + id);
		},
		saveUser: function(user){
            if(user.id) {
                return $http.put(API_URL.api84 + '/users/' + user.id, user);
            } else {
                return $http.post(API_URL.api84 + '/users', user);
            }

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