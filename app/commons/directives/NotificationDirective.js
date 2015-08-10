
/* Directives */
angular.module('84.directives')

    .directive('notificationMessage', [function () {
        'use strict';
        var directiveDefinitionObject = {
            priority: 0,
            replace: true,
            transclude: true,
            restrict: 'E',
            templateUrl: '/app/commons/views/NotificationMessage.html',
            controller: function($scope) {
                $scope.message = '';
            }
            //scope: {
            //    wd: '=widget'
            //}
        };
        return directiveDefinitionObject;
    }])
    .directive('header', [function () {       
     var directiveDefinitionObject = {
            priority: 0,
            replace: true,
            transclude: true,
            restrict: 'A',
            templateUrl: 'app/portal/templates/components/header.html',
            scope: {
                actions: '=headerActions',
                type: '=headerType',
                label: '=headerLabel',
                classpageheader: '=headerClasspageheader',
                name: '=headerName'
            }
        };       
     return directiveDefinitionObject;
    }]);