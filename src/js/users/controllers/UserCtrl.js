class UserListCtrl {
    constructor ($scope, UsrSrv){//, notificationSrv
        UsrSrv.getUsers().success(function (users) {
            $scope.users = users;
        }).error(function (e) {
            console.error(e);
        });
    
        // User search function
        $scope.userListQuery = function (item) {
            var criteria = angular.lowercase($scope.queryCriteria),
                firstname = angular.lowercase(item.first_name),
                lastname = angular.lowercase(item.last_name);
            if (firstname.indexOf(criteria || '') != -1 || lastname.indexOf(criteria || '') != -1) {
                return true;
            }
            return false;
        };
        $scope.test = 'coucou userListCtrl';
    }
}

/**
 * Manage the user details and user form for the show/edit/add functionnalities
 * @param  {[type]} $scope       angular scope dependancy injection
 * @param  {[type]} $routeParams angular routing dependancy injection
 * @param  {[type]} usrSrv       user services dependancy injection
 */
class UserDetailCtrl {
    constructor ($scope, $routeParams, $location, usrSrv, fbSrv) {
        var userId = $routeParams.userId;
        this.initUser();
        if (userId) {
            usrSrv.findById(userId).success(function (user) {
                $scope.currentUser = user;
                if (user.fb_user_id !== 0) {
                    fbSrv.getFbSilouetteUrl(user.fb_user_id).success(function (response) {
                        $scope.imgSrc = response.data && response.data.url ? response.data.url : '';
                    });
                } else {
                    $scope.imgSrc = 'http://m1m.com/wp-content/uploads/2015/06/default-user-avatar.png';
                }
            }).error(function (e) {
                console.error(e);
            });
        }
        $scope.saveUser = function () {
            if($scope.userForm.$valid){
                if ($scope.currentUser.gender === 'M') {
                    $scope.currentUser.maidenname = '';
                } else {
                    if ($scope.currentUser.maidenname === $scope.currentUser.last_name) {
                        $scope.currentUser.maidenname = '';
                    }
                }
                usrSrv.saveUser($scope.currentUser).success(function (user) {
                    $scope.currentUser = user;
                    $location.path('/users/show/' + user.id);
                }).error(function (e) {
                    console.error(e);
                });
            } else {
                alert('Form invalid');//TODO replace with ng-notify
            }
        };       

        $scope.deleteUser = function (id) {
            if( confirm('Etes-vous sûr de vouloir effacer ce membre ? ') ) {
                usrSrv.deleteUser(id).success(function () {
                    console.log('user ' + id + ' supprimé');
                    $location.path('/users');
                }).error(function (e) {
                    console.error(e);
                });
            }
        };
    }
    initUser () {            
        this.$scope.currentUser = { 
            first_name  : '', 
            maiden_name : '', 
            last_name   : '', 
            birthdate   : '', 
            email       : '', 
            telefon     : '', 
            mobile      : '', 
            website     : '', 
            fb_profile_name: '', 
            fb_user_id  : '', 
            is_active   : 0
        };
    };
}

UserListCtrl.$inject = ['$scope', '$routeParams', '$location'];//, 'usrSrv', 'fbSrv'];

export { UserListCtrl, UserDetailCtrl }