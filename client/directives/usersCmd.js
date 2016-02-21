myIRC.directive('usersCmd', function() {
  return {
    restrict: 'E',
    scope: {
      users: '=users',
    },
    templateUrl: '/directives/templates/usersCmd.html'
  };
});
