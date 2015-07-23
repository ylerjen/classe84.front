classe84App.factory('evtSrv', function($http){
	return{
		getEvents : function(){
			return $http.get(appSettings.apiUrl + '/api/events');
		},
		getEventById: function(id){
			return $http.get(appSettings.apiUrl + '/api/events/'+id);
		},
		saveEvent: function(event){
			throw 'Not Implemented Exception';
			return $http.post(appSettings.apiUrl + '/api/')
		}
	};
});