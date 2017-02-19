
App.controller("loginController",
  ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {

  $scope.submitLogin = function() {
    $scope.loginInProgress = true;
    AuthService.login($scope.username, $scope.password).then(function() {
      AuthService.setCredentials($scope.username, $scope.password);
      $location.path('/books');
      $scope.loginInProgress = false;
    }, function(err) {
      $scope.loginInProgress = false;
      $scope.loginError = 'Failed to login:'+ err.data;
    });
  };
}]);