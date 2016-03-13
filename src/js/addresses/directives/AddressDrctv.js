
class AddressesDrctv {
    constructor () {
        this.replace = true;
        this.restrict = 'A';
        this.templateUrl = '/src/js/addresses/views/addresses.html';
        this.scope = {                
            addresses : "=addressesAttr"
        };
    }
}
    
    
class AddressDrctv {
    constructor (UsrSrv) {
        this._usrSrv = UsrSrv;
        this.templateUrl = '/src/js/addresses/views/address.html';
        this.restrict = 'A';
        this.scope = {                
            address : "=addressAttr"
        };
    }
    
    link (scope, element, attrs) {        
        scope.setDefault = (adrId) => {
            this._usrSrv.setDefault(adrId);
        };
    }
}


export { AddressesDrctv, AddressDrctv };