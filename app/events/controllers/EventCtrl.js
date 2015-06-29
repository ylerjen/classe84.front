var eventsControllers = angular.module('EventsCtrl', []);

eventsControllers.controller('EventListCtrl', ['$scope', '$http', 'usrSrv', function ($scope, $http, usrSrv) {

	this.events = mockEventList;

  //   usrSrv.getEvents().success(function(data){
		// that.events = data.events;
  //   });
  //   
  

  // Event search function
	$scope.eventListQuery = function (item){
		var criteria = angular.lowercase($scope.queryCriteria),
		firstname = angular.lowercase(item.firstname),
		lastname = angular.lowercase(item.lastname);
		if (firstname.indexOf(criteria || '')!=-1 || lastname.indexOf(criteria || '')!=-1) {
			return true;
		}
		return false;
	};
}]);

/**
 * Manage the event detail and event form for the show/edit/add functionnalities
 * @param  {[type]} $scope       angular scope dependancy injection
 * @param  {[type]} $routeParams angular routing dependancy injection
 * @param  {[type]} evtSrv)      event services dependancy injection
 */
classe84App.controller('EventDetailCtrl', ['$scope', '$routeParams', 'evtSrv', function($scope, $routeParams, usrSrv) {

	var eventId = $routeParams.eventId;
	this.currentEvent = mockEventList[eventId-1];


	this.saveEvent = function(){
		console.log('save ' + this.currentEvent.getFullName());
		throw 'Not implemented Exception';
	};
	this.deleteEvent = function(){
		throw 'Not implemented Exception';
	};
}]);