myIRC.directive('msgCmd', function() {
  return {
    restrict: 'E',
    scope: {
      username: '=username',
      text: '=text'
    },
    templateUrl: '/directives/templates/msgCmd.html'
  };
});
