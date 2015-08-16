"use strict";

(function() {
  
  angular.module('84.config', []).constant('API_URL', {
    api84: 'http://api84.loc',
    fbApiUrl: 'https://graph.facebook.com/'
  }).constant('PATH', {
      userViewFolder: 'app/users/views',
      eventViewFolder: 'app/events/views'
    });
    
  angular.module('84.users', ['84.config', '84.filters']);
  angular.module('84.addresses', ['84.config']);
  angular.module('84.events', ['84.config']);
  angular.module('84.notifications', []);
  angular.module('84.filters', []);
  
  angular.module('84', [
      '84.config',
      '84.users',
      '84.addresses',
      'ngRoute',
      'ngAnimate'
    ]).value('appVersion', '1.0.0');
    
    

  angular.module('84').config(['$routeProvider', 'PATH', function($routeProvider, PATH) {
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