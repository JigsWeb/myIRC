var myIRC = angular.module('myIRC', ['ngRoute','ui-notification'])

/* ROUTER */

myIRC.config(function($routeProvider){
  $routeProvider.
  when('/', {
    templateUrl: 'views/main.html',
    // controller: 'PhoneListCtrl'
  }).
  when('/chat', {
    templateUrl: 'views/chat.html',
    controller: 'ChatCtrl'
  }).
  when('/admin/channel', {
    templateUrl: 'views/admin/channel.html',
    controller: 'AdminCtrl'
  }).
  when('/admin/user', {
    templateUrl: 'views/admin/user.html',
    controller: 'AdminCtrl'
  }).
  otherwise({
    redirectTo: '/'
  });
});

/* NOTIFICATION CONFIG */

myIRC.config(function(NotificationProvider) {
  NotificationProvider.setOptions({
    delay: 3000,
    startTop: 61,
    startRight: 10,
    verticalSpacing: 15,
    horizontalSpacing: 15,
  });
});

/* HTTP INTERCEPTOR */
