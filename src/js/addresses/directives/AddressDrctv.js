
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
    constructor () {
        this.templateUrl = '/src/js/addresses/views/address.html';
        this.restrict = 'A';
        this.scope = {                
            address : "=addressAttr"
        };
    }
    controller () {
    }
    link (scope, element, attrs) {        
        console.debug(attrs);
        scope.setDefault = (adrId) => {
            console.log('yann', adrId);
        };
        
    }
}


export { AddressesDrctv, AddressDrctv };