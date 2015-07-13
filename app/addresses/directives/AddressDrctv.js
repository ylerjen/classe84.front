/* Directives */
window.classe84App.directive('addresses', [function () {
    'use strict';
    return {
        priority: 0,
        replace: true,
        transclude: true,
        restrict: 'E',
        templateUrl: '/app/addresses/views/addresses.html',
        controller: function ($scope) {
            $scope.addresses = [{
                street1: 'rue de...',
                street2: 'les marrons',
                npa: '1943',
                locality: 'Albertville',
                region: 'Valais',
                country: 'Switzerland'
            }];
        }
        //scope: {
        //    wd: '=widget'
        //}
    };
}])
.directive('address', [function () {
    'use strict';
    return {
        transclude: true,
        restrict: 'E',
        templateUrl: '/app/addresses/views/address.html',
        controller: function (scope) {
            
        }
    };
}]);