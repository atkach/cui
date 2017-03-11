App.config(['$locationProvider', '$routeProvider',
  function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('');

    $routeProvider.when('/login', {
      templateUrl: 'pages/login/login.template.html',
      controller: 'loginController'
    }).when('/books', {
      templateUrl: 'pages/books/books.template.html',
      controller: 'booksController'
    }).when('/books/:bookId', {
      templateUrl: 'pages/book/book.template.html',
      controller: 'bookController'
    }).when('/add-book', {
      templateUrl: 'pages/add-book/add-book.template.html',
      controller: 'addBookController'
    }).when('/about', {
      templateUrl: 'pages/about/about.template.html',
      controller: 'aboutController'
    }).otherwise({
      redirectTo: "/books"
    });
  }
]);