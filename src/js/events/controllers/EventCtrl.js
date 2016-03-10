/**
 * Manage the event detail and event form for the show/edit/add functionnalities
 * @class EventListCtrl
 * @param  {object} $scope       angular scope dependancy injection
 * @param  {object} $routeParams angular routing dependancy injection
 * @param  {object} evtSrv       event services dependancy injection
 */
class EventListCtrl {
    constructor($scope, $routeParams, evtSrv) {
        this.$scope = $scope;
        this.$routeParams = $routeParams;
        this.evtSrv = evtSrv;
        
                
        evtSrv.getEvents().success(function(events){
            $scope.events = events;
        }).error(function(e){
            console.error('Error lors de la récupération des events : ' + e);
        }); 
    }
}



/**
 * Manage the event detail and event form for the show/edit/add functionnalities
 * @param  {object} $scope       angular scope dependancy injection
 * @param  {object} $routeParams angular routing dependancy injection
 * @param  {object} evtSrv       event services dependancy injection
 */
class EventDetailCtrl {
    constructor($scope, $routeParams, evtSrv) {
        this._$scope = $scope;
        this._routeParams = $routeParams;
        this._evtSrv = evtSrv;
        
        var eventId = this._routeParams.eventId;
        
        this._evtSrv.getEventById(eventId).success((event)=>{
            $scope.event = event;
        });
    }

	saveEvent () {
		console.log('save ' + this.currentEvent.getFullName());
		throw 'Not implemented Exception';
	}
	deleteEvent () {
		throw 'Not implemented Exception';
	}
}


export { EventListCtrl, EventDetailCtrl }