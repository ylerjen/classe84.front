"use strict";

classe84App.controller('EventListCtrl', ['$scope', '$http', 'evtSrv', function ($scope, $http, evtSrv) {
	var that = this;

    evtSrv.getEvents().success(function(data){
        that.events = data.events;
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
    var that = this;
	var eventId = $routeParams.eventId;
	
    evtSrv.getEvents(eventId).success(function(data){
        that.events = data.events;
    });

	this.saveEvent = function(){
		console.log('save ' + this.currentEvent.getFullName());
		throw 'Not implemented Exception';
	};
	this.deleteEvent = function(){
		throw 'Not implemented Exception';
	};
}]);