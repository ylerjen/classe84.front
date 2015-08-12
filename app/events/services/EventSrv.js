angular.module('84.events').factory('evtSrv', function($http){
	return{
		getEvents : function(){
			return $http.get(appSettings.apiUrl + '/events');
		},
		getEventById: function(id){
			return $http.get(appSettings.apiUrl + '/events/' + id);
		},
		saveEvent: function(event){
			throw 'Not Implemented Exception';
			return $http.post(appSettings.apiUrl + '/')
		}
	};
});