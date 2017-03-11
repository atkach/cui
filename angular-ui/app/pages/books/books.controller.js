
App.controller("booksController",
  ['$scope', '$routeParams', 'BookService',
    function ($scope, $routeParams, BookService) {
      $scope.username = $routeParams.username;
      $scope.books = [];
      $scope.requestError = '';

      BookService.getAll(function (data, error) {
        $scope.requestError = error;
        $scope.books = data;
      });
    }]);