/**
 * Manage the list of users and the user search
 * @class UserListCtrl
 */
class UserListCtrl {
    constructor ($scope, UsrSrv){//, notificationSrv
        let _self = this;
        this._UsrSrv = UsrSrv;
        this.isLoading = true;
        
        let successCb = (usersList) => {
            $scope.users = usersList;
            _self.isLoading = false;
        }
        let errorCb = (err) => {
            throw(err);
        }
            
        this.getUsers(successCb, errorCb);    
    
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
    }
    getUsers (successCb, errorCb) {
        this._UsrSrv.getUsers()
            .success(successCb)
            .error(errorCb);
    }
}

/**
 * Manage the user details and user form for the show/edit/add functionnalities
 * @class UserDetailCtrl
 * @param  {object} $scope       angular scope dependancy injection
 * @param  {object} $routeParams angular routing dependancy injection
 * @param  {object} $location    angular location dependancy injection
 * @param  {object} usrSrv       user services dependancy injection
 */
class UserDetailCtrl {
    constructor ($scope, $routeParams, $location, UsrSrv, FbSrv) {
        var _self = this;
        this.$scope = $scope;
        this.$routeParams = $routeParams;
        this.$location = $location;
        this._usrSrv = UsrSrv;
        this._fbSrv = FbSrv;
        
        var userId = $routeParams.userId;
        this.$scope.currentUser = this.getEmptyUser();
        if (userId) {
            this.getUser(
                userId, 
                (user) => {
                    _self.$scope.currentUser = user;
                    if (user.fb_user_id !== 0) {
                        _self._fbSrv.getFbSilouetteUrl(user.fb_user_id).success(function (response) {
                            _self.$scope.imgSrc = response.data && response.data.url ? response.data.url : '';
                        });
                    } else {
                        _self.$scope.imgSrc = 'http://m1m.com/wp-content/uploads/2015/06/default-user-avatar.png';
                    }
                },
                (err) => {
                    throw(err);
                }
            );
        }
        this.$scope.saveUser = function () {
            if(this.$scope.userForm.$valid){
                this.save();
            } else {
                alert('Form invalid');//TODO replace with ng-notify
            }
        };       

        this.$scope.deleteUser = (id) => {
            if( confirm('Etes-vous sûr de vouloir effacer ce membre ? ') ) {                
                this.delete(id);                
            }
        };
    }
    
    getEmptyUser () {            
        return { 
            first_name      : '', 
            maiden_name     : '', 
            last_name       : '', 
            birthdate       : '', 
            email           : '', 
            telefon         : '', 
            mobile          : '', 
            website         : '', 
            fb_profile_name : '', 
            fb_user_id      : '', 
            is_active       : 0
        };
    };
    /**
     * Get the user identified by its id
     * @memberOf UserDetailCtrl
     * @param {number} id - is the identifier of the user to retrieve
     * @param {function} successCb - is the callback to execute after the user is retrieved
     * @param {function} errorCb - is the callback to execute if the get failed
     */
    getUser (id, successCb, errorCb) {
        this._usrSrv.findById(id)
            .success(successCb)
            .error(errorCb);
    }
    /**
     * Save the current user
     * @memberOf UserDetailCtrl
     */
    save () {   
        var user = this.user;     
        if (user.gender === 'M' || user.maidenname === user.last_name) {
            user.maidenname = '';
        }
        this._usrSrv.saveUser(user).success( (user) => {
            $location.path('/users/show/' + user.id);
        }).error(function (e) {
            console.error(e);
        });
    }
    /**
     * Delete the current user
     * @memberOf UserDetailCtrl
     */
    delete () {
        var id = this.currentUser.id;
        this._usrSrv.deleteUser(id).success(function () {
            console.log('user ' + id + ' supprimé');
            $location.path('/users');
        }).error(function (e) {
            console.error(e);
        });
    }
    
}

export { UserListCtrl, UserDetailCtrl }