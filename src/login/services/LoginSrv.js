angular.module('84.services').factory('loginSrv', function($http){
	return{
		login : function(username, password){
			//TODO remove mockup

			return $http.get(appSettings.apiUrl + '/events/simpleList.json');
		},
		logout: function(id){
			//TODO remove mockup
			return mockEventList[id];
			return $http.get(appSettings.apiUrl + '/api/events/'+id);
		},
		retrievePassword: function(event){
			//TODO
			throw 'Not Implemented Exception';
			return $http.get(appSettings.apiUrl + '/api/')
		},
		validateAccount:
	};
});