class NavigationDrctv {
    constructor () {
        this.templateUrl  = 'src/js/nav/views/nav.html';
        this.restrict = 'A';
        this.scope = {};
        this.link = function (scope, elem, attrs) {
            elem.bind('click', function (evt) {
                let currentEl = evt.srcElement;
                if(currentEl.className.indexOf('nav-link')>=0) {
                    elem.find('li').removeClass('active');
                    evt.srcElement.parentElement.className += ' active';
                }
            });
        };
    }  
}

export { NavigationDrctv };