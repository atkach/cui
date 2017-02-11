

App.controller("loginController", function ($scope, $location, $http, $q) {

  $scope.submitLogin = function() {
    serverLogin($scope.userName, $scope.password).then(function(userName) {
      $location.path('/books');
    }, function(err) {
      $scope.loginError = 'Failed to login:'+ err;
    });
  };

  function serverLogin(userName, password) {
    var deferred = $q.defer();
    deferred.resolve(userName);

    return deferred.promise;
  }

});