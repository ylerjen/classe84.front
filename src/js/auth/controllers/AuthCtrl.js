/**
 * Manage the authentication functionalities
 * @class AuthCtrl 
 */
 class AuthCtrl {
	constructor($scope, AuthSrv, jwtHlpr) {
		this._$scope = $scope;
		this._$scope._authSrv = AuthSrv;
		this._$scope._jwtHlpr = jwtHlpr;
		console.info('AuthCtrl instanciated !', this._authSrv);
		$scope.username = 'yann@example.org';
		$scope.password = 'password';
		$scope.login = this.login;
		$scope.logout = this.logout;
	}

	login() {
		var self = this;
		var promise = this._authSrv.login(this.username, this.password);
		promise.success(function(token) {
			var isExpired = self._jwtHlpr.isTokenExpired(token);
			console.log('token', token);
			console.log('is token expired', isExpired);
		})
		.error();
	}
	logout() {
		this._authSrv.logout(this.username, this.password);
	}
}

export { AuthCtrl };