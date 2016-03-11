/**
 * The User service is used to manage retrieving and saving of user informations
 * @class UserServices
 */
class UserService {
    constructor ($http, API_URL) {
        this.$http = $http;
        this.API_URL = API_URL;
    }
    getUsers () {
        return this.$http.get(this.API_URL.api84 + '/users');
    }
    findById (id) {
        return this.$http.get(this.API_URL.api84 + '/users/' + id);
    }
    saveUser (user) {
        if(user.id) {
            return this.$http.put(this.API_URL.api84 + '/users/' + user.id, user);
        } else {
            return this.$http.post(this.API_URL.api84 + '/users', user);
        }
    }
    deleteUser (id) {
        return this.$http.delete(this.API_URL.api84 + '/users/' + id);
    }
}

/**
 * The facebook service is used to retrieve FB profile informations for a user
 * @class FaceBookService
 */
class FaceBookService {    
    constructor ($http, API_URL) {
        this.$http = $http;
        this.API_URL = API_URL;
    }
    
    getFbSilouetteUrl (fbId) {           
        var fbUrl = this.API_URL.fbApiUrl + fbId + '/picture?type=normal&redirect=false';
        return this.$http.get(fbUrl);
    }
}

export { UserService, FaceBookService };