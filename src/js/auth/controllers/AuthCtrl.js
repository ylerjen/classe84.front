/**
 * Manage the authentication functionalities
 * @class AuthCtrl 
 */
 class AuthCtrl {
	constructor($scope, jwtHelper) {
		this._angJwt = jwtHelper;
		console.info('AuthCtrl instanciated !', this._angJwt);
	}

	login() {
		throw 'not implemented';
	}
	logout() {
		throw 'not implemented';
	}
}

export { AuthCtrl };