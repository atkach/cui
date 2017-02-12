
App.controller("loginController",
  ['$scope', '$location', 'AuthService', function ($scope, $location, AuthService) {

  $scope.submitLogin = function() {
    $scope.loginInProgress = true;
    AuthService.login($scope.userName, $scope.password).then(function(response) {
      AuthService.setCredentials(response.username, response.password);
      $location.path('/books');
      $scope.loginInProgress = false;
    }, function(err) {
      $scope.loginInProgress = false;
      $scope.loginError = 'Failed to login:'+ err;
    });
  };
}]);