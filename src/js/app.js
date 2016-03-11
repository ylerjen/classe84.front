import { telFilter } from './commons/filters/HelperFilters.js';
import { UserListCtrl, UserDetailCtrl} from './users/controllers/UserCtrl.js';
import { UserService, FaceBookService } from './users/services/UserSrv.js';
/*
import AddressSrv from './addresses/services/AddressSrv.js';
import NotificationSrv from './notifications/services/NotificationsSrv.js';
import { EventListCtrl, EventDetailCtrl} from './events/controllers/EventCtrl.js';
*/



(function () {  
    
   FaceBookService.$inject = ['$http','API_URL'];
   UserListCtrl.$inject = ['$scope', 'UsrSrv'];//, 'notificationSrv'
   UserDetailCtrl.$inject = ['$scope', '$routeParams', '$location', 'UsrSrv', 'FbSrv'];
    
    
    angular.module('84.config', []).constant('API_URL', {
        api84: 'http://api84.loc',
        fbApiUrl: 'https://graph.facebook.com/'
    }).constant('PATH', {
        userViewFolder: 'src/js/users/views',
        eventViewFolder: 'src/js/events/views'
    });
    
    angular.module('84.filters', [])
        .filter('tel', TelFilter);
  
   angular.module('84.users', ['84.filters'])
        .controller('UserListCtrl', UserListCtrl)
        .controller('UserDetailCtrl', UserDetailCtrl)
        .service('UsrSrv', UserService)
        .service('FbSrv', FaceBookService);
        
/*       
        
    angular.module('84.addresses', ['84.config'])
        .factory('adrSrv', FaceBookService.AddressServiceFactory);
        
    angular.module('84.events', ['ngSanitize','84.config'])
        .controller('EventListCtrl', EventListCtrl)
        .controller('EventDetailCtrl', EventDetailCtrl);
        
    angular.module('84.notifications', []);  

    angular.module('84.notifications', [])
        .service('notificationSrv', NotificationSrv);
  
    angular.module('84', [
        '84.config',
        '84.users',
        '84.addresses',
        'ngRoute',
        'ngAnimate'
    ])
*/
    angular.module('84', ['ngRoute', 'ngAnimate','84.config', '84.users'])
    .config(['$routeProvider', 'PATH', ($routeProvider, PATH) => {
        $routeProvider.
        //Users routing
        when('/users', {
            templateUrl: PATH.userViewFolder + '/user-list.html',
            controller: 'UserListCtrl'
        }).
/*
        when('/users/add', {
            templateUrl: PATH.userViewFolder + '/user-form.html',
            controller: 'UserDetailCtrl'
        }).
        */
        when('/users/show/:userId', {
            templateUrl: PATH.userViewFolder + '/user-detail.html',
            controller: 'UserDetailCtrl'
        }).
        /*
        when('/users/edit/:userId', {
            templateUrl: PATH.userViewFolder + '/user-form.html',
            controller: 'UserDetailCtrl'
        }).

        //Events routing
        when('/events', {
            templateUrl: PATH.eventViewFolder + '/event-list.html',
            controller: 'EventListCtrl'
        }).
        when('/events/:eventId', {
            templateUrl: PATH.eventViewFolder + '/event-detail.html',
            controller: 'EventDetailCtrl'
        }).
        when('/events/add', {
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