angular.module('84.events')

.controller('EventListCtrl', ['$scope', '$http', 'evtSrv', function ($scope, $http, evtSrv) {
	"use strict";
    evtSrv.getEvents().success(function(events){
        $scope.events = events;
    }).error(function(e){
		console.error('Error lors de la récupération des events : ' + e);
    }); 
}])

/**
 * Manage the event detail and event form for the show/edit/add functionnalities
 * @param  {object} $scope       angular scope dependancy injection
 * @param  {object} $routeParams angular routing dependancy injection
 * @param  {object} evtSrv       event services dependancy injection
 */
.controller('EventDetailCtrl', ['$scope', '$routeParams', 'evtSrv', function($scope, $routeParams, evtSrv) {
	"use strict";
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