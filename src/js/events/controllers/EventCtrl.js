/**
 * Manage the event detail and event form for the show/edit/add functionnalities
 * @class EventListCtrl
 * @param  {object} $scope       angular scope dependancy injection
 * @param  {object} $routeParams angular routing dependancy injection
 * @param  {object} evtSrv       event services dependancy injection
 */
export class EventListController {
    constructor($scope, $routeParams, evtSrv, notifSrv) {
        var _self = this;
        this.$scope = $scope;
        this.$routeParams = $routeParams;
        this._evtSrv = evtSrv;
        this.notify = notifSrv;
        
        let successCb = function (events) {
            _self.$scope.events = events;
        };
        let errorCb = function(err) {
            var msg = response.statusText;
            if( response.status === -1) {
                msg = 'Error server not found. User-list not loaded.'
            } else if (msg === "") {
                msg = 'Error, user-list not loaded';
            }
            _self.notify({message: msg, classes: 'alert-danger', duration: 10000});
        };
        this.getAll(successCb, errorCb);        
    }
    
    getAll(successCb, errorCb) {
        this._evtSrv.getAll()
            .success(successCb)
            .error(errorCb); 
    }
}



/**
 * Manage the event detail and event form for the show/edit/add functionnalities
 * @class EventDetailController
 * @param  {object} $scope       angular scope dependancy injection
 * @param  {object} $routeParams angular routing dependancy injection
 * @param  {object} evtSrv       event services dependancy injection
 */
export class EventDetailController {
    constructor($scope, $routeParams, evtSrv) {
        this._$scope = $scope;        
        $scope.isLoading = true;
        $scope.save = this.save;
        $scope.delete = this.delete;
        $scope.subscribe = this.subscribe;
        this._routeParams = $routeParams;
        this._evtSrv = evtSrv;
        
        let evtId = this._routeParams.eventId;
        this.get(evtId);        
    }
    
    get(id) {
        var _this = this;
        let successCb = (event) => {
            _this._$scope.event = event;
            _this._$scope.isLoading = false;
        };
        this._evtSrv.getById(id)
            .success(successCb);
    }

	save() {
		console.log('save ' + this.event.title);
		throw 'Not implemented Exception';
	}
	delete() {
		console.log('delete ' + this.event.title);
		throw 'Not implemented Exception';
	}
    subscribe(currentUserId) {
		console.log('subscribe to ' + this.event.title);
        throw 'Not implemented Exception';
    }
}

/**
 * @class EventAddController
 */
export class EventAddController {
    constructor($scope, ngMessages) {
        console.log('vindjou');
        this._$scope = $scope;
        $scope.submitForm = this.submitForm;
    }
    submitForm() {
        alert('submitted');
    }
}

    EventListController.$inject = ['$scope', '$routeParams', 'evtSrv', 'notify'];

    EventAddController.$inject  = ['$scope']//, 'ngMessages'];