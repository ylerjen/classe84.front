import { telFilter } from './commons/filters/HelperFilters.js';
import { UserListCtrl, UserDetailCtrl} from './users/controllers/UserCtrl.js';
import { UserService, FaceBookService } from './users/services/UserSrv.js';
import { EventListCtrl, EventDetailCtrl} from './events/controllers/EventCtrl.js';
import { EventService } from './events/services/EventSrv.js';
/*
import AddressSrv from './addresses/services/AddressSrv.js';
import NotificationSrv from './notifications/services/NotificationsSrv.js';
*/



(function () {
    
   FaceBookService.$inject = ['$http','API_URL'];
   UserListCtrl.$inject    = ['$scope', 'UsrSrv'];//, 'notificationSrv'
   UserDetailCtrl.$inject  = ['$scope', '$routeParams', '$location', 'UsrSrv', 'FbSrv'];
   EventListCtrl.$inject   = ['$scope', '$routeParams', 'EvtSrv'];
   EventService.$inject    = ['$http', 'API_URL'];
    
    
    angular.module('84.config', []).constant('API_URL', {
        api84: 'http://api84.loc',
        fbApiUrl: 'https://graph.facebook.com/'
    }).constant('PATH', {
        userViewFolder: 'src/js/users/views',
        eventViewFolder: 'src/js/events/views'
    });
    
    angular.module('84.filters', [])
        .filter('tel', telFilter);
  
   angular.module('84.users', ['84.filters'])
        .controller('UserListCtrl', UserListCtrl)
        .controller('UserDetailCtrl', UserDetailCtrl)
        .service('UsrSrv', UserService)
        .service('FbSrv', FaceBookService);
/*               
    angular.module('84.addresses', ['84.config'])
        .factory('adrSrv', FaceBookService.AddressServiceFactory);
*/
        
    angular.module('84.events', ['ngSanitize'])
        .controller('EventListCtrl', EventListCtrl)
        .controller('EventDetailCtrl', EventDetailCtrl)
        .service('EvtSrv', EventService);
/*
    angular.module('84.notifications', [])
        .service('notificationSrv', NotificationSrv);
*/
    angular.module('84', [
        'ngRoute',
        'ngAnimate',
        '84.config',
        '84.users',
        '84.events'
    ])
    .config(['$routeProvider', 'PATH', ($routeProvider, PATH) => {
        $routeProvider.
        
        //Users routing
        when('/user', {
            templateUrl: PATH.userViewFolder + '/user-list.html',
            controller: 'UserListCtrl'
        }).
        when('/user/add', {
            templateUrl: PATH.userViewFolder + '/user-form.html',
            controller: 'UserDetailCtrl'
        }).
        when('/user/:userId', {
            templateUrl: PATH.userViewFolder + '/user-detail.html',
            controller: 'UserDetailCtrl'
        }).
        when('/user/:userId/edit', {
            templateUrl: PATH.userViewFolder + '/user-form.html',
            controller: 'UserDetailCtrl'
        }).

        //Events routing
        when('/event', {
            templateUrl: PATH.eventViewFolder + '/event-list.html',
            controller: 'EventListCtrl'
        }).
        when('/event/:eventId', {
            templateUrl: PATH.eventViewFolder + '/event-detail.html',
            controller: 'EventDetailCtrl'
        }).
        when('/event/add', {
            templateUrl: PATH.eventViewFolder + '/event-detail.html',
            controller: 'EventAddCtrl'
        }).
/*
        when('/gallery', {
            templateUrl: PATH.userViewFolder + '/user-list.html',
            controller: 'UserListCtrl'
        }).
        
*/
        otherwise({
            redirectTo: '/'
        });
    }]);

})();