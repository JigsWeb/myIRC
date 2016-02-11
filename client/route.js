myIRC.config(function($routeProvider){
  $routeProvider.
  when('/', {
    templateUrl: 'views/main.html',
    // controller: 'PhoneListCtrl'
  }).
  when('/register', {
    templateUrl: 'views/register.html',
    // controller: 'PhoneListCtrl'
  }).
  when('/login', {
    templateUrl: 'views/login.html',
    // controller: 'PhoneListCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
});
