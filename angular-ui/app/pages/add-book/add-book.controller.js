
App.controller("addBookController",
  ['$scope', '$routeParams', 'BookService',
    function ($scope, $routeParams, BookService) {
      $scope.name = '';
      $scope.author = '';
      $scope.year = '';
      $scope.read = false;
      $scope.requestMessage = '';
      $scope.requestSuccess = true;


      $scope.create = function() {
        var bookInfo = {
          name: $scope.name,
          author: $scope.author,
          year: Number($scope.year),
          read: $scope.read,
          rating: 0
        };
        BookService.create(bookInfo, function(data, error) {
          if (data.successful) {
            $scope.requestMessage = `Book ${$scope.name} successfully created!`;
          } else {
            $scope.requestMessage = error.message;
            $scope.requestSuccess = false;
          }
        });
      };
    }]);