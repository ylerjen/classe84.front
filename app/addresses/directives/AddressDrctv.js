// Directives
angular.module('84.addresses')    
    .directive('addresses', [function () {
    'use strict';
        return {
            replace : true,
            restrict : 'A',
            templateUrl : '/app/addresses/views/addresses.html',
            scope : {                
                addresses : "=addressesAttr"
            },
            link : function (scope, element, attrs) {
                scope.$watch('addressesAttr', function(newValue, oldValue) {
                   console.log(newValue);
                });
            }
        };
    }])
    .directive('address', [ function () {
        'use strict';
        return {
            restrict : 'A',
            templateUrl : '/app/addresses/views/address.html',
            scope : {
                address : '=addressAttr'
            },
            link : function (scope, element, attrs) {
                scope.$watch('addressAttr', function(newValue, oldValue) {
                   console.log(newValue);
                });
            }
        };
    }]);