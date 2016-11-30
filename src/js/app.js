import { telFilter } from './commons/filters/HelperFilters.js';
import { AuthCtrl } from './auth/controllers/AuthCtrl.js';
import AuthSrv from './auth/services/AuthSrv.js';
import { UserListCtrl, UserDetailCtrl} from './users/controllers/UserCtrl.js';
import { UserService, FaceBookService } from './users/services/UserSrv.js';
import { UserListItemComponent, UserListComponent } from './components/UserListComponent.js';
import { EventListCtrl, EventDetailCtrl} from './events/controllers/EventCtrl.js';
import { EventService } from './events/services/EventSrv.js';
import { AddressSrv } from './addresses/services/AddressSrv.js';
import { AddressesCmpnt, AddressCmpnt } from './components/AddressesComponent.js';
import { NavigationDrctv } from './nav/directives/navigationDirective.js';
import { TabsComponent, TabPaneComponent } from './components/TabsComponent.js';

(function () {
    
    AuthSrv.$inject         = ['$http', 'API_URL', 'jwtHelper'];
    AuthCtrl.$inject        = ['$scope', 'AuthSrv', 'jwtHelper'];
    UserListCtrl.$inject    = ['$scope', 'usrSrv', 'notify'];
    UserDetailCtrl.$inject  = ['$scope', '$routeParams', '$location', 'usrSrv', 'fbSrv'];
    FaceBookService.$inject = ['$http','API_URL'];
    AddressSrv.$inject      = ['$http', 'API_URL'];
    AddressCmpnt.$inject    = ['adrSrv'];
    EventListCtrl.$inject   = ['$scope', '$routeParams', 'evtSrv', 'notify'];
    EventService.$inject    = ['$http', 'API_URL'];
    
    angular.module('84.config', [])
        .constant('API_URL', {
            api84: 'http://api84.loc',
            fbApiUrl: 'https://graph.facebook.com/'
        })
        .constant('PATH', {
            userViewFolder: 'src/js/users/views',
            eventViewFolder: 'src/js/events/views'
        });

    angular.module('84.components', [])
        .component('tabs', TabsComponent)
        .component('tabpane', TabPaneComponent);

    angular.module('84.auth', ['angular-jwt'])
        .controller('AuthCtrl', AuthCtrl)
        .service('AuthSrv', AuthSrv);
    
    angular.module('84.nav', [])
        .directive('navigation', () => new NavigationDrctv());
    
    angular.module('84.filters', [])
        .filter('tel', telFilter);
     
    angular.module('84.addresses', [])
        .service('adrSrv', AddressSrv)
        .component('addresses', AddressesCmpnt)
        .component('address', AddressCmpnt);
  
   angular.module('84.users', ['84.filters', 'cgNotify'])
        .controller('UserListCtrl', UserListCtrl)
        .controller('UserDetailCtrl', UserDetailCtrl)
        .service('usrSrv', UserService)
        .service('fbSrv', FaceBookService)
        .component('userList', UserListComponent)
        .component('userListItem', UserListItemComponent);

    angular.module('84.events', ['ngSanitize', 'cgNotify'])
        .controller('EventListCtrl', EventListCtrl)
        .controller('EventDetailCtrl', EventDetailCtrl)
        .service('evtSrv', EventService);

    angular.module('84', [
        'ngRoute',
        'ngAnimate',
        'cgNotify',
        '84.components',
        '84.auth',
        '84.config',
        '84.nav',
        '84.users',
        '84.addresses',
        '84.events'
    ]);
})();