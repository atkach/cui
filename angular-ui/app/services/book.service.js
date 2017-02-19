App.factory('BookService', ['$http', 'CONFIGS',  function ($http, CONFIGS) {

  return  {
    getAll: getAll,
    get: getOne,
    create: create,
    update: update,
    remove: remove
  };

  function getAll(callback) {
    $http.get(CONFIGS.apiPrefix + 'books').then(function(response) {
      callback(response.data, null);
    }, function(response) {
      callback([], response.data)
    });
  }

  function getOne(id, callback) {
    $http.get(CONFIGS.apiPrefix + 'books/' + id).then(function(response) {
      callback(response.data, null);
    }, function(response) {
      callback(null, response.data)
    });
  }

  function create (data, callback) {
    $http.post(CONFIGS.apiPrefix + 'books', data).then(function(response) {
      callback({successful: true}, null);
    }, function(response) {
      callback({successful: false}, response.data)
    });
  }

  function update (data, id, callback) {
    $http.post(CONFIGS.apiPrefix + 'books/' + id, data).then(function(response) {
      callback({successful: true}, null);
    }, function(response) {
      callback({successful: false}, response.data)
    });
  }

  function remove (id, callback) {
    $http.delete(CONFIGS.apiPrefix + 'books/' + id).then(function(response) {
      callback({successful: true}, null);
    }, function(response) {
      callback({successful: false}, response.data)
    });
  }
}]);
