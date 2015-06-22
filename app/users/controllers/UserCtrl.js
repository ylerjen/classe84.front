var usersControllers = angular.module('UsersCtrl', []);

usersControllers.controller('UserListCtrl', ['$scope', '$http', 'usrSrv', function ($scope, $http, usrSrv) {

	this.users = mockUserList;

  //   usrSrv.getUsers().success(function(data){
		// that.users = data.events;
  //   });
  //   
  

  // User search function
	$scope.userListQuery = function (item){
		var criteria = angular.lowercase($scope.queryCriteria),
		firstname = angular.lowercase(item.firstname),
		lastname = angular.lowercase(item.lastname);
		if (firstname.indexOf(criteria || '')!=-1 || lastname.indexOf(criteria || '')!=-1) {
			return true;
		}
		return false;
	};
}]);

/**
 * Manage the user detail and user form for the show/edit/add functionnalities
 * @param  {[type]} $scope       angular scope dependancy injection
 * @param  {[type]} $routeParams angular routing dependancy injection
 * @param  {[type]} usrSrv)      user services dependancy injection
 */
classe84App.controller('UserDetailCtrl', ['$scope', '$routeParams', 'usrSrv', function($scope, $routeParams, usrSrv) {

	var userId = $routeParams.userId;
	this.currentUser = mockUserList[userId-1];


	this.saveUser = function(){
		console.log('save ' + this.currentUser.getFullName());
		throw 'Not implemented Exception';
	};
	this.deleteUser = function(){
		throw 'Not implemented Exception';
	};
}]);