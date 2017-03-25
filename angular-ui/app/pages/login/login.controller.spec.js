describe('loginController', function() {
  beforeEach(module('bookShelf'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.submitLogin', function() {
    var $scope, controller;
    var AuthService = {
      login: function() {
        return {then: function() {}}
      }
    };

    beforeEach(function() {
      $scope = {};
      controller = $controller('loginController', { $scope: $scope, $location: {}, AuthService: AuthService });
    });

    it('should set loginInProgress to true', function() {
      $scope.submitLogin();
      expect($scope.loginInProgress).toBe(true);
    });
  });
});