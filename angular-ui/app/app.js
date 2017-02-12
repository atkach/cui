var App = angular.module('bookShelf', [
  'ngRoute',
  'ngCookies'
]).constant('ENVIRONMENT', 'development')
  .value('val1', {})
  .run(run);

/**
 * Run blocks are the closest thing in Angular to the main method. A run block is the code which
 * needs to run to kickstart the application. It is executed after all of the service have been
 * configured and the injector has been created.
 */
run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
function run($rootScope, $location, $cookies, $http) {
  // keep user logged in after page refresh
  $rootScope.globals = $cookies.getObject('globals') || {};
  if ($rootScope.globals.currentUser) {
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
  }

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    // redirect to login page if not logged in and trying to access a restricted page
    var restrictedPage = $.inArray($location.path(), ['/login']) === -1;
    var loggedIn = $rootScope.globals.currentUser;
    if (restrictedPage && !loggedIn) {
      $location.path('/login');
    }
  });
}

App.controller('AppController', function ($scope, $http, $location) {

});