
App.controller("booksController",
  ['$scope', '$routeParams', 'BookService',
    function ($scope, $routeParams, BookService) {
      $scope.books = [];
      $scope.requestError = '';

      BookService.getAll(function (data, error) {
        $scope.requestError = error;
        $scope.books = data;
      });

      $scope.remove = function (book) {
        BookService.remove(book._id, function (data, error) {
          $scope.requestError = error;
          if (data.successful) {
            $scope.books.splice($scope.books.indexOf(book), 1);
          }
        });
      }
    }]);