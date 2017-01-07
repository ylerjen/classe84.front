/**
 * Manage the event detail and event form for the show/edit/add functionnalities
 * @class EventListCtrl
 * @param  {object} $scope       angular scope dependancy injection
 * @param  {object} $routeParams angular routing dependancy injection
 * @param  {object} evtSrv       event services dependancy injection
 */
class EventListController {
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
                msg = 'Error server not found. User-list not loaded.';
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

EventListController.$inject = ['$scope', '$routeParams', 'evtSrv', 'notify'];

export default {
    templateUrl: "/tpl/events/event-list.html",
    controller: EventListController
};