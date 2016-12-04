angular.module('84')
    .config(['$routeProvider', 'PATH', ($routeProvider, PATH) => {
        $routeProvider.

        // Login
        when('/login', {
            templateUrl: '/src/js/auth/views/loginFrm.html',
            controller: 'AuthCtrl'
        }).
        
        // Users routing
        when('/user', {
            templateUrl: '/src/pages/user-list-page.html',
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

        // Events routing
        when('/event', {
            templateUrl: PATH.eventViewFolder + '/event-list.html',
            controller: 'EventListCtrl'
        }).
        when('/event/add', {
            templateUrl: PATH.eventViewFolder + '/event-form.html',
            controller: 'EventAddCtrl'
        }).
        when('/event/:eventId', {
            templateUrl: PATH.eventViewFolder + '/event-detail.html',
            controller: 'EventDetailCtrl'
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