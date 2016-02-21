myIRC.config(function($routeProvider){
  $routeProvider.
  when('/', {
    templateUrl: 'views/main.html',
    // controller: 'PhoneListCtrl'
  }).
  when('/admin', {
    templateUrl: 'views/admin.html',
  }).
  otherwise({
    redirectTo: '/'
  });
});
