// Directives
'use strict';
classe84App.directive('addresses', [function () {
    return {
        priority: 0,
        replace: true,
        transclude: true,
        restrict: 'E',
        templateUrl: '/app/addresses/views/addresses.html',
        scope: {
            "addresses" : "@addresses"
        }
    };
}])
.directive('address', [function () {
    'use strict';
    return {
        transclude: true,
        restrict: 'E',
        templateUrl: '/app/addresses/views/address.html',
    };
}]);