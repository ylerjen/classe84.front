// Directives
'use strict';
angular.module('84.directives')
    
    .directive('addresses', [function () {
        return {
            priority : 0,
            replace : true,
            transclude : true,
            restrict : 'A',
            templateUrl : '/app/addresses/views/addresses.html'
    /*,
            scope : {
                "addresses" : "@addresses",
                'editingMode' : true
            }
    */
        };
    }])
    .directive('address', [function () {
        'use strict';
        return {
            transclude : true,
            restrict : 'A',
            templateUrl : '/app/addresses/views/address.html',
        };
    }]);