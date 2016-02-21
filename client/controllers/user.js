myIRC.controller('UserCtrl',function($scope,User,Security,Notification){
  $scope.updateUsername = function(username){
    User.update({'username':username})
      .success(function(data){
        Security.setUsername(data.username);
        Notification.success("Username updated successfuly.");
      })
      .error(function(data){
        if(data.error){
          Notification.error(data.error);
        }
      });
  }

  $scope.updatePassword = function(password){
    User.update({'password':password})
      .success(function(data){
        Notification.success("Password updated successfuly.");
      })
      .error(function(data){
        if(data.error){
          Notification.error(data.error);
        }
      });
  }
});
