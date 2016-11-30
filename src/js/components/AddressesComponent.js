export var AddressesCmpnt = {
    replace: true,
    templateUrl: '/src/js/addresses/views/addresses.html',
    bindings: {                
        addresses : "=addressesAttr",
        userId: "@userId"
    }
};
    
export var AddressCmpnt = {
    templateUrl : '/src/js/addresses/views/address.html',
    bindings : {                
        address : "=addressAttr",
        userId: "@userId"
    },
    controller: function (scope, element, attrs) {
        var _self = this;
        scope.setDefault = (userId, adrId) => {
            adrSrv.setDefault(userId, adrId);
        };
    }  
}