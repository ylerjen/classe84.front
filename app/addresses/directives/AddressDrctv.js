// Directives
'use strict';

angular.module('classe84').directive('addresses', [function () {
    return {
        priority : 0,
        replace : true,
        transclude : true,
        restrict : 'E',
        templateUrl : '/app/addresses/views/addresses.html',
        scope : {
            "addresses" : "@addresses",
            'editingMode' : true
        }
    };
}])
.directive('address', [function () {
    'use strict';
    return {
        transclude : true,
        restrict : 'E',
        templateUrl : '/app/addresses/views/address.html',
    };
}]);