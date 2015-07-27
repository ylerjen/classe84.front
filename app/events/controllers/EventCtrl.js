"use strict";

classe84App.controller('EventListCtrl', ['$scope', '$http', 'evtSrv', function ($scope, $http, evtSrv) {
	
    evtSrv.getEvents().success(function(events){
        $scope.events = events;
    }).error(function(e){
		console.log('Error lors de la récupération des events : ' + e);
    }); 

  
}]);

/**
 * Manage the event detail and event form for the show/edit/add functionnalities
 * @param  {[type]} $scope       angular scope dependancy injection
 * @param  {[type]} $routeParams angular routing dependancy injection
 * @param  {[type]} evtSrv)      event services dependancy injection
 */
classe84App.controller('EventDetailCtrl', ['$scope', '$routeParams', 'evtSrv', function($scope, $routeParams, evtSrv) {
    var eventId = $routeParams.eventId;
	
    evtSrv.getEventById(eventId).success(function(event){
        $scope.event = event;
    });

	this.saveEvent = function(){
		console.log('save ' + this.currentEvent.getFullName());
		throw 'Not implemented Exception';
	};
	this.deleteEvent = function(){
		throw 'Not implemented Exception';
	};
}]);