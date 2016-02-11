myIRC.controller('ChatCtrl',function($scope, Security, Socket){
  $scope.messages = [];
  $scope.users = [];

  Socket.emit('user:connect', Security.getUser());

  Socket.on('user:connect',function(users){
    $scope.users = users;
  });

  Socket.on('send:message', function(msg){
    $scope.messages.push(msg)
  });

  Socket.on('user:disconnect',function(users){
    $scope.users = users;
  });

  $scope.send = function(e){
    console.log(e);
    if(e.code == "Enter"){
      Socket.emit('send:message', $scope.messageBox);
      $scope.messageBox = "";
    }
  }
})
