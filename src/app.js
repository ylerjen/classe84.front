import { UserListCtrl, UserDetailCtrl } from './users/controllers/UserCtrl.js';
import { UserService, FaceBookService } from './users/services/userSrv.js';
import NotificationSrv from './notifications/services/NotificationsSrv.js';
import AddressSrv from './addresses/services/AddressSrv.js';
import { EventListCtrl, EventDetailCtrl} from './events/controllers/EventCtrl.js';

(function () {
  
    angular.module('84.config', []).constant('API_URL', {
        api84: 'http://api84.loc',
        fbApiUrl: 'https://graph.facebook.com/'
    }).constant('PATH', {
        userViewFolder: 'src/users/views',
        eventViewFolder: 'src/events/views'
    });

    angular.module('84.filters', []);

    angular.module('84.notifications', [])
        .service('notificationSrv', NotificationSrv);
        
    angular.module('84.users', ['84.config', '84.notifications', '84.filters'])
        .controller('UserListCtrl', UserListCtrl)
        .controller('UserDetailCtrl', UserDetailCtrl)
        .factory('usrSrv', UserService.UserServiceFactory)
        .factory('fbSrv', UserService.FaceBookServiceFactory);
        
    angular.module('84.addresses', ['84.config'])
        .factory('adrSrv', FaceBookService.AddressServiceFactory);
  
    angular.module('84.events', ['ngSanitize','84.config'])
        .controller('EventListCtrl', EventListCtrl)
        .controller('EventDetailCtrl', EventDetailCtrl);
        
    
  
    angular.module('84', [
        '84.config',
        '84.users',
        '84.addresses',
        '84.events',
        'ngRoute',
        'ngAnimate'
    ]).config(['$routeProvider', 'PATH', ($routeProvider, PATH) => {
        $routeProvider.

        //Users routing
        when('/users', {
            templateUrl: PATH.userViewFolder + '/user-list.html',
            controller: 'UserListCtrl'
        }).
        when('/users/add', {
            templateUrl: PATH.userViewFolder + '/user-form.html',
            controller: 'UserDetailCtrl'
        }).
        when('/users/show/:userId', {
            templateUrl: PATH.userViewFolder + '/user-detail.html',
            controller: 'UserDetailCtrl'
        }).
        when('/users/edit/:userId', {
            templateUrl: PATH.userViewFolder + '/user-form.html',
            controller: 'UserDetailCtrl'
        }).


    /*
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