classe84App.factory('usrSrv', function($http){
	return{
		getUsers : function(){
			console.error('Mock getUsers()');
			//return mockUserList;
			return $http.get(appSettings.apiUrl + '/users');
		},
		getUserById: function(id){
			return $http.get(appSettings.apiUrl + '/user/'+id);
		},
		saveUser: function(user){
			return $http.get(appSettings.apiUrl + '/users/');
		}
	};
});