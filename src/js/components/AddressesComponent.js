export var AddressesCmpnt = {
    replace: true,
    templateUrl: '/tpl/addresses/addresses.html',
    bindings: {                
        addresses : "=addressesAttr",
        userId: "@userId"
    }
};
    
export var AddressCmpnt = {
    templateUrl : '/tpl/addresses/address.html',
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