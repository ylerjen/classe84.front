import { telFilter } from './commons/filters/HelperFilters.js';
import AuthCtrl from './auth/controllers/AuthCtrl.js';
import AuthSrv from './auth/services/AuthSrv.js';
import NavigationComponent from './nav/NavigationComponent.js';
import FooterComponent from './components/FooterComponent.js';
import EventService from './events/services/EventSrv.js';
import AddressSrv from './addresses/services/AddressSrv.js';
import { UserListCtrl, UserDetailCtrl} from './users/controllers/UserCtrl.js';
import { UserService, FaceBookService } from './users/services/UserSrv.js';
import { UserListItemComponent, UserListComponent } from './components/UserListComponent.js';
import { EventDetailController, EventAddController} from './events/controllers/EventCtrl.js';
import EventListComponent from './events/EventListComponent.js';
import { AddressesCmpnt, AddressCmpnt } from './components/AddressesComponent.js';
import { TabsComponent, TabPaneComponent } from './components/TabsComponent.js';

(function() {
    
    AuthSrv.$inject         = ['$http', 'API_URL', 'jwtHelper'];
    AuthCtrl.$inject        = ['$scope', 'AuthSrv', 'jwtHelper'];
    UserListCtrl.$inject    = ['$scope', 'usrSrv', 'notify'];
    UserDetailCtrl.$inject  = ['$scope', '$routeParams', '$location', 'usrSrv', 'fbSrv'];
    FaceBookService.$inject = ['$http','API_URL'];
    AddressSrv.$inject      = ['$http', 'API_URL'];
    AddressCmpnt.$inject    = ['adrSrv'];
    EventService.$inject    = ['$http', 'API_URL'];
    
    angular.module('84.config', [])
        .constant('version', {
            front: '1.0.0'
        })
        .constant('API_URL', {
            api84: 'http://api84.loc',
            fbApiUrl: 'https://graph.facebook.com/'
        })
        .constant('PATH', {
            userViewFolder: 'tpl/users',
            eventViewFolder: 'tpl/events'
        });

    angular.module('84.components', [])
        .component('tabs', TabsComponent)
        .component('tabpane', TabPaneComponent);

    angular.module('84.auth', ['angular-jwt'])
        .controller('AuthCtrl', AuthCtrl)
        .service('AuthSrv', AuthSrv);
    
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
        //.controller('EvtListCtrl', EventListController)
        .controller('EvtDetailCtrl', EventDetailController)
        .controller('EvtAddCtrl', EventAddController)
        .component('eventList', EventListComponent)
        .service('evtSrv', EventService);

    angular.module('84', [
        'ngRoute',
        'ngAnimate',
        'ngMessages',
        'cgNotify',
        '84.components',
        '84.auth',
        '84.config',
        '84.users',
        '84.addresses',
        '84.events'
    ])
    .component('navigation', NavigationComponent)
    .component('appFooter', FooterComponent);
})();