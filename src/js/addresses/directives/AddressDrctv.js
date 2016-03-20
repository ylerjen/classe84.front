
class AddressesDrctv {
    constructor () {
        this.replace = true;
        this.restrict = 'A';
        this.templateUrl = '/src/js/addresses/views/addresses.html';
        this.scope = {                
            addresses : "=addressesAttr",
            userId: "@userId"
        };
    }
}
    
    
function AddressDrctv (adrSrv) {
    return {
        templateUrl : '/src/js/addresses/views/address.html',
        restrict : 'A',
        scope : {                
            address : "=addressAttr",
            userId: "@userId"
        },
        link: function (scope, element, attrs) {
            var _self = this;
            scope.setDefault = (userId, adrId) => {
                adrSrv.setDefault(userId, adrId);
            };
        }  
    };
}

export { AddressesDrctv, AddressDrctv };