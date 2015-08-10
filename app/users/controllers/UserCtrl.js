"use strict";

angular.module('84.controllers').controller('UserListCtrl', ['$scope', '$http', 'usrSrv', function ($scope, $http, usrSrv) {
	var that = this;

    usrSrv.getUsers().success(function(users){
		that.users = users;
    }).error(function(e){
		console.error(e);
    });

  // User search function
	$scope.userListQuery = function (item){
		var criteria = angular.lowercase($scope.queryCriteria),
		firstname = angular.lowercase(item.first_name),
		lastname = angular.lowercase(item.last_name);
		if (firstname.indexOf(criteria || '')!=-1 || lastname.indexOf(criteria || '')!=-1) {
			return true;
		}
		return false;
	};
}]);

/**
 * Manage the user details and user form for the show/edit/add functionnalities
 * @param  {[type]} $scope       angular scope dependancy injection
 * @param  {[type]} $routeParams angular routing dependancy injection
 * @param  {[type]} usrSrv       user services dependancy injection
 */
angular.module('84.controllers').controller('UserDetailCtrl', ['$scope', '$routeParams', 'usrSrv', 'fbSrv', function($scope, $routeParams, usrSrv, fbSrv) {
	var userId = $routeParams.userId;
	usrSrv.findById(userId).success(function (user) {
		$scope.currentUser = user;
        if(user.fb_user_id !== 0) {
        fbSrv.getFbSilouetteUrl(user.fb_user_id).success(function (response) {
            $scope.imgSrc  = response.data && response.data.url ? response.data.url : '';
        });
        } else {
            $scope.imgSrc = 'http://m1m.com/wp-content/uploads/2015/06/default-user-avatar.png';
        }
	}).error(function (e) {
		console.error(e);
	});


	$scope.saveUser = function(){
		if($scope.currentUser.gender==='M') {
			$scope.currentUser.maidenname = '';
		} else {
			if($scope.currentUser.maidenname === $scope.currentUser.last_name){
				$scope.currentUser.maidenname = '';
			}
		}
		usrSrv.saveUser().success(function(data){
			$scope.users = data.events;
		}).error(function(e){
			console.error(e);
		});
		console.log('save ' + $scope.currentUser.last_name + ' ' + $scope.currentUser.first_name);
		throw 'Not implemented Exception';
	};
    
	$scope.deleteUser = function(){
		throw 'Not implemented Exception';
	};
}]);