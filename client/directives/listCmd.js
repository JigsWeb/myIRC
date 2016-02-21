myIRC.directive('listCmd', function() {
  return {
    restrict: 'E',
    scope: {
      channels: '=channels',
    },
    templateUrl: '/directives/templates/listCmd.html'
  };
});
