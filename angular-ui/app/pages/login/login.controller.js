

App.controller("loginController", function ($scope, $location) {

  $scope.authenticate = function () {
    debugger;
    $location.path('/books');
  };

});