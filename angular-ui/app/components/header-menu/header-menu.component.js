App.component('headerMenu', {
    templateUrl: '/components/header-menu/header-menu.template.html',
    controller: 'HeaderMenuController'
  });
App.controller('HeaderMenuController',
  ['$scope', '$http', '$location', 'AuthService', '$rootScope',
  function ($scope, $http, $location, AuthService, $rootScope) {
    $scope.username = '';

    $rootScope.$watch('globals.currentUser.username', function(newValue) {
      $scope.username = newValue;
    });

    $scope.logout = function() {
      AuthService.clearCredentials();
      $location.path('/login');
    };
  }
]);