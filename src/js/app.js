import { telFilter } from './commons/filters/HelperFilters.js';
import { UserListCtrl, UserDetailCtrl} from './users/controllers/UserCtrl.js';
import { UserService, FaceBookService } from './users/services/UserSrv.js';
import { UserListDrctv } from './users/directives/UserListDrctv.js';
import { UserListItemDrctv } from './users/directives/UserListItemDrctv.js';
import { EventListCtrl, EventDetailCtrl} from './events/controllers/EventCtrl.js';
import { EventService } from './events/services/EventSrv.js';
import { AddressSrv } from './addresses/services/AddressSrv.js';
import { AddressesDrctv, AddressDrctv } from './addresses/directives/AddressDrctv.js';
import { NavigationDrctv } from './nav/directives/navigationDirective.js';

(function () {
    
   UserListCtrl.$inject    = ['$scope', 'usrSrv', 'notify'];
   UserDetailCtrl.$inject  = ['$scope', '$routeParams', '$location', 'usrSrv', 'fbSrv'];
   FaceBookService.$inject = ['$http','API_URL'];
   AddressSrv.$inject      = ['$http', 'API_URL'];
   AddressDrctv.$inject    = ['adrSrv'];
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
    
    angular.module('84.nav', [])
        .directive('navigation', () => new NavigationDrctv());
    
    angular.module('84.filters', [])
        .filter('tel', telFilter);
     
    angular.module('84.addresses', [])
        .service('adrSrv', AddressSrv)
        .directive('addresses', () => new AddressesDrctv())
        .directive('address', AddressDrctv);
  
   angular.module('84.users', ['84.filters', 'cgNotify'])
        .controller('UserListCtrl', UserListCtrl)
        .controller('UserDetailCtrl', UserDetailCtrl)
        .service('usrSrv', UserService)
        .service('fbSrv', FaceBookService)
        .directive('userList', UserListDrctv)
        .directive('userListItem', UserListItemDrctv);

    angular.module('84.events', ['ngSanitize', 'cgNotify'])
        .controller('EventListCtrl', EventListCtrl)
        .controller('EventDetailCtrl', EventDetailCtrl)
        .service('evtSrv', EventService);

    angular.module('84', [
        'ngRoute',
        'ngAnimate',
        'cgNotify',
        '84.config',
        '84.nav',
        '84.users',
        '84.addresses',
        '84.events'
    ]);
})();