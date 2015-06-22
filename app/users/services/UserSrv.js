classe84App.factory('usrSrv', function($http){
	return{
		getUsers : function(){
			//TODO remove mockup
			return mockUserList;

			return $http.get(appSettings.apiUrl + '/events/simpleList.json');
		},
		getUserById: function(id){
			//TODO remove mockup
			return mockUserList[id];
			return $http.get(appSettings.apiUrl + '/api/users/'+id);
		},
		saveUser: function(user){
			//TODO
			throw 'Not Implemented Exception';
			return $http.get(appSettings.apiUrl + '/api/')
		}
	};
});