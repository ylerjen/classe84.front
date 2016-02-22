angular.module('84.events').factory('evtSrv', ['$http', 'API_URL', function ($http, API_URL) {
    "use strict";
	return{
		getEvents : function(){
			return $http.get(API_URL.api84 + '/events');
		},
		getEventById: function(id){
			return $http.get(API_URL.api84 + '/events/' + id);
		},
		saveEvent: function(event){
			throw 'Not Implemented Exception';
			return $http.post(API_URL.api84 + '/')
		}
	};
}]);