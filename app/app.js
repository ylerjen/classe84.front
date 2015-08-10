"use strict";
 
var appSettings;

(function() {
  angular.module('84.controllers', []);
  angular.module('84.directives', []);
  angular.module('84.services', []);
  angular.module('84.filters', []);
  angular.module('84', [
      '84.controllers',
      '84.directives',
      '84.services',
      'ngRoute',
      'ngAnimate'
    ]);

  appSettings = {
    apiUrl: 'http://api84.loc',
    userViewFolder: 'app/users/views',
    eventViewFolder: 'app/events/views'
  };

  angular.module('84').config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.

    //Users routing
      when('/users', {
        templateUrl: appSettings.userViewFolder + '/user-list.html',
        controller: 'UserListCtrl'
      }).
      when('/users/add', {
        templateUrl: appSettings.userViewFolder + '/user-form.html',
        controller: 'UserDetailCtrl'
      }).
      when('/users/show/:userId', {
        templateUrl: appSettings.userViewFolder + '/user-detail.html',
        controller: 'UserDetailCtrl'
      }).
      when('/users/edit/:userId', {
        templateUrl: appSettings.userViewFolder + '/user-form.html',
        controller: 'UserDetailCtrl'
      }).

    //Events routing
      when('/events', {
        templateUrl: appSettings.eventViewFolder + '/event-list.html',
        controller: 'EventListCtrl'
      }).
      when('/events/:eventId', {
        templateUrl: appSettings.eventViewFolder + '/event-detail.html',
        controller: 'EventDetailCtrl'
      }).
      when('/events/add', {
        templateUrl: appSettings.eventViewFolder + '/event-detail.html',
        controller: 'EventAddCtrl'
      }).
/*
      when('/gallery', {
        templateUrl: appSettings.userViewFolder + '/user-list.html',
        controller: 'UserListCtrl'
      }).
*/
      otherwise({
        redirectTo: '/'
      });
  }]);

})();