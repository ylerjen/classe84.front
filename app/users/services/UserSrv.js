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
});