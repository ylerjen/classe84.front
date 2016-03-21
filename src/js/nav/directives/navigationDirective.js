function NavigationDrctv () {
    return {
        templateUrl: 'src/js/nav/views/nav.html',
        restrict: 'A',
        scope: {},
        link: function (scope, elem, attrs) {
            elem.bind('click', function (evt) {
                let currentEl = evt.srcElement;
                if(currentEl.className.indexOf('nav-link')>=0) {
                    elem.find('li').removeClass('active');
                    evt.srcElement.parentElement.className += ' active';
                }
            });
        },
        controller: function () {
        },
        controllerAs: 'navCtrl'
    };    
}

export { NavigationDrctv };