describe('User service tests\n', function () {
    //load the modules
    beforeEach(module('84.users'));

    //test the get all users service
    it('user list should returns all users', inject( function (usrSrv) {
        expect(usrSrv.getUsers().length).toBe(4);
    }));

    //test the find a specific user by id 
    it('user getById should returns a specific user by its id', inject( function (usrSrv) {
        var usr=usrSrv.findById(2);
        expect(usr).not.toBe(undefined);
    }));
});



describe('UserController Test\n', function () {
    //load the modules
    beforeEach(module('84.users'));

    it('Should initialize controller with 4 posts', inject( function ($rootScope, $controller, postService) {
        var $scope=$rootScope.$new();
        $controller('PostController',{ $scope:$scope, postService:postService});
        expect($scope.posts.length).toBe(4);
    }));
});

describe('PostDetailsController Test\n', function () {
    beforeEach(module('spBlogger.posts.controllers'));
    beforeEach(module('ui.router'));
    beforeEach(module('spBlogger.posts.services'));
    
    it('Should initialize controller with 1 post', inject(function($state, $stateParams, $rootScope, $controller, postService) {
        var $scope=$rootScope.$new();
        $stateParams.id=2;
        $controller('PostDetailsController',{$scope:$scope,
        $stateParams:$stateParams,$state:$state,postService:postService});
        expect($scope.singlePost).not.toBe(undefined);
    }));
});