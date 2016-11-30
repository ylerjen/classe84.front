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
    controller: function () {
        var _self = this;
        this.setDefault = (userId, adrId) => {
            adrSrv.setDefault(userId, adrId);
        };
    }  
}