/**
 * Manage the event detail and event form for the show/edit/add functionnalities
 * @class EventListCtrl
 * @param  {object} $scope       angular scope dependancy injection
 * @param  {object} $routeParams angular routing dependancy injection
 * @param  {object} EvtSrv       event services dependancy injection
 */
class EventListCtrl {
    constructor($scope, $routeParams, EvtSrv) {
        var _self = this;
        this.$scope = $scope;
        this.$routeParams = $routeParams;
        this._EvtSrv = EvtSrv;
        
        let successCb = function (events) {
            _self.$scope.events = events;
        };
        let errorCb = function (err) {
            console.error('Error lors de la récupération des events : ' + err);
        };
        this.getAll(successCb, errorCb);        
    }
    
    getAll (successCb, errorCb) {
        this._EvtSrv.getAll()
            .success(successCb)
            .error(errorCb); 
    }
}



/**
 * Manage the event detail and event form for the show/edit/add functionnalities
 * @param  {object} $scope       angular scope dependancy injection
 * @param  {object} $routeParams angular routing dependancy injection
 * @param  {object} EvtSrv       event services dependancy injection
 */
class EventDetailCtrl {
    constructor($scope, $routeParams, EvtSrv) {
        this._$scope = $scope;
        this._routeParams = $routeParams;
        this._EvtSrv = EvtSrv;
        
        let evtId = this._routeParams.eventId;
        this.get(evtId);        
    }
    
    get (id) {
        var _this = this;
        let successCb = (event) => {
            _this._$scope.event = event;
        };
        this._EvtSrv.getById(id)
            .success(successCb);
    }

	save () {
		console.log('save ' + this.currentEvent.getFullName());
		throw 'Not implemented Exception';
	}
	delete () {
		throw 'Not implemented Exception';
	}
}


export { EventListCtrl, EventDetailCtrl };