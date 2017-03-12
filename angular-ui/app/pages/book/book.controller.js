
App.controller("bookController",
  ['$scope', '$routeParams', 'BookService',
    function ($scope, $routeParams, BookService) {
      $scope.book = {};
      $scope.requestError = '';

      BookService.getOne($routeParams.bookId, function (data, error) {
        $scope.requestError = error;
        $scope.book = data;
      });

      $scope.updateRead = function () {
        BookService.update({ read: $scope.book.read }, $scope.book._id, function (data, error) {
          $scope.requestError = error;
        });
      }
    }]);