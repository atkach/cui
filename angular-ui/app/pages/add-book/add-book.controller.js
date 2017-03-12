
App.controller("addBookController",
  ['$scope', 'BookService', '$location',
    function ($scope, BookService, $location) {

      $scope.requestMessage = '';
      $scope.requestSuccess = true;
      reset();

      $scope.create = function() {
        var bookInfo = {
          name: $scope.name,
          author: $scope.author,
          year: Number($scope.year),
          read: $scope.read,
          rating: 0,
          review: $scope.review
        };
        BookService.create(bookInfo, function(data, error) {
          if (data.successful) {
            $scope.requestMessage = `Book ${$scope.name} successfully created!`;
            $location.path('/books/' + data.bookId);
          } else {
            $scope.requestMessage = error.message;
            $scope.requestSuccess = false;
          }
        });
      };

      function reset() {
        $scope.name = '';
        $scope.author = '';
        $scope.year = '';
        $scope.review = '';
        $scope.read = false;
      }
    }]);