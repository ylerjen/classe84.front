classe84App.factory('evtSrv', function($http){
	return{
		getEvents : function(){
			//TODO remove mockup
			return mockEventList;

			return $http.get(appSettings.apiUrl + '/events/simpleList.json');
		},
		getEventById: function(id){
			//TODO remove mockup
			return mockEventList[id];
			return $http.get(appSettings.apiUrl + '/api/events/'+id);
		},
		saveEvent: function(event){
			//TODO
			throw 'Not Implemented Exception';
			return $http.get(appSettings.apiUrl + '/api/')
		}
	};
});