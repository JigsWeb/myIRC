myIRC.controller('AuthCtrl', function($scope, $location, User, Auth, Security, Notification) {
  $scope.register = function(){
    User.create($scope.register.user)
      .success(function(data){
        $scope.register.user = {};
        Notification.success("You can now sign in!");
      })
      .error(function(data){
        if(data.errors){
          for(var error in data.errors){
            Notification.error(data.errors[error].message);
          }
        }
        else if(data.code == 11000){
          Notification.error("Username or e-mail address already used");
        }
      });
  }

  $scope.login = function(){
    Auth.attempt($scope.credentials.user)
      .success(function(data){
        Security.setUser(data);
        Notification.success("Hi "+data.username+" !");
        $location.path('/chat');
      })
      .error(function(data){
        if(data.error){
          Notification.error(data.error);
        }
      });
  }
});
