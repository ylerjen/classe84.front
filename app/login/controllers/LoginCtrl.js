var loginController = angular.module('LoginCtrl', []);

loginController.controller('UserListCtrl', ['$scope', '$http', 'usrSrv', function ($scope, $http, usrSrv) {

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