App.factory('AuthService', AuthService);

AuthService.$inject = ['$http', '$cookies', '$rootScope', '$q', '$timeout'];
function AuthService($http, $cookies, $rootScope, $q, $timeout) {
  var service = {};

  service.login = login;
  service.setCredentials = setCredentials;
  service.clearCredentials = clearCredentials;

  return service;

  function login(username, password) {
    var deferred = $q.defer();
    $timeout(function() {
      deferred.resolve({
        username: username,
        password: password,
        permissions: ['ALL']
      });
    }, 2000);

    return deferred.promise;

    //return $http.post('/api/authenticate',
    // { username: username, password: password });
  }

  function setCredentials(username, password) {
    var authdata = btoa(username + ':' + password);

    $rootScope.globals = {
      currentUser: {
        username: username,
        authdata: authdata
      }
    };

    // set default auth header for http requests
    $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

    // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
    var cookieExp = new Date();
    cookieExp.setDate(cookieExp.getDate() + 7);
    $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
  }

  function clearCredentials() {
    $rootScope.globals.currentUser = null;
    $cookies.remove('globals');
    $http.defaults.headers.common.Authorization = 'Basic';
  }
}