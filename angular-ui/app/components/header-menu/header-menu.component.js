angular.
  module('bookShelf').
  component('headerMenu', {
    templateUrl: '/components/header-menu/header-menu.template.html',
    controller: ['$scope', '$http', '$location',
      function HeaderMenuController($scope, $http, $location) {
        $scope.userName = 'Admin';
        $scope.showHeaderMenu = $location.$$path !== '/login';


      }
    ]
  });