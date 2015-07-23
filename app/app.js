"use strict";
 
var classe84App,
  appSettings;

(function() {

  classe84App = angular.module('classe84',
    [
      'ngRoute',
      'ngAnimate'
    ]);


  appSettings = {
    apiUrl: 'http://api84.loc',
    userViewFolder: 'app/users/views',
    eventViewFolder: 'app/events/views'
  };

  classe84App.config(['$routeProvider',
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
      when('/events/:userId', {
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