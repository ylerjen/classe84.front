angular.module('84')
    .config(['$routeProvider', 'PATH', ($routeProvider, PATH) => {
        $routeProvider.

        // Home
        when('/', {
            templateUrl: '/pages/home-page.html'
        }).

        // Login
        when('/login', {
            templateUrl: '/tpl/auth/login-form.html',
            controller: 'AuthCtrl'
        }).

        // About
        when('/about', {
            templateUrl: '/pages/about-page.html'
        }).

        // Contact form
        when('/contact', {
            templateUrl: '/pages/contact-page.html'
        }).
        
        // Users routing
        when('/user', {
            templateUrl: '/pages/user-list-page.html',
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
            controller: 'EvtListCtrl'
        }).
        when('/event/add', {
            templateUrl: PATH.eventViewFolder + '/event-form.html',
            controller: 'EvtAddCtrl'
        }).
        when('/event/:eventId', {
            templateUrl: PATH.eventViewFolder + '/event-detail.html',
            controller: 'EvtDetailCtrl'
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