angular.module('84')
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