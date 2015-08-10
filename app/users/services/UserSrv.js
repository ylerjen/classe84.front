angular.module('classe84').factory('usrSrv', function ($http) {
	return {
		getUsers : function(){
			return $http.get(appSettings.apiUrl + '/users');
		},
		findById: function(id){
			return $http.get(appSettings.apiUrl + '/users/' + id);
		},
		saveUser: function(user){
			return $http.get(appSettings.apiUrl + '/users/');
		}
	};
}).factory('fbSrv', function($http){
    var fbApiUrl = 'https://graph.facebook.com/';
    return {
        getFbSilouetteUrl : function (fbId) {           
            var fbUrl = fbApiUrl + fbId + '/picture?type=normal&redirect=false';
            return $http.get(fbUrl);
        }
    }
});