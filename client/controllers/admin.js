myIRC.controller('AdminCtrl',function($scope,$location,Notification,Security,Channel,User){
  if(!Security.isAdmin()){
      $location.path('/');
      Notification.error("You do not have access to this page asshole.");
  }

  Channel.all().then(function(channels){
    $scope.channel = {
      edit: {
        name: "",
        id: null,
        index: null,
        action: function(index){
          $scope.channel.edit.name = $scope.channel.list[index].name;
          $scope.channel.edit.id = $scope.channel.list[index]._id;
          $scope.channel.edit.index = index;
        }
      },
      list: channels.data,
      update: function(){
          Channel.update($scope.channel.edit.id,{
            name: $scope.channel.edit.name
          }).success(function(data){
            $scope.channel.list[$scope.channel.edit.index].name =  $scope.channel.edit.name;
            $scope.channel.edit.name = "";
            $scope.channel.edit.id = null;
            $scope.channel.edit.index = null;
            Notification.success("Channel updated.");
          }).error(function(data){
            Notification.error(err);
          });
        },
      destroy: function(index){
        Channel.destroy($scope.channel.list[index]._id)
          .success(function(data){
            $scope.channel.list.splice(index,1);
            Notification.success("Channel deleted successfully");
          })
          .error(function(data){
            Notification.error(data.error);
          });
      },
      messages: {
        channel: "",
        list: [],
        action: function(index){
          if($scope.channel.list[index].messages.length){
            $scope.channel.messages.list = $scope.channel.list[index].messages;
            $scope.channel.messages.channel = $scope.channel.list[index].name;
          }
          else{
            Notification.error("No message found in this channel.");
          }
        }
      }
    }
  });

  User.all().then(function(users){
    $scope.user = {
      edit: {
        username: "",
        email: null,
        admin: false,
        id: null,
        index: null,
        action: function(index){
          $scope.user.edit.username = $scope.user.list[index].username;
          $scope.user.edit.email = $scope.user.list[index].email;
          $scope.user.edit.admin = $scope.user.list[index].admin;
          $scope.user.edit.id = $scope.user.list[index]._id;
          $scope.user.edit.index = index;
        }
      },
      list: users.data,
      update: function(){
          User.updateAdmin($scope.user.edit.id,{
            username: $scope.user.edit.username,
            email: $scope.user.edit.email,
            admin: $scope.user.edit.admin
          }).success(function(data){
            $scope.user.list[$scope.user.edit.index].username =  $scope.user.edit.username;
            $scope.user.list[$scope.user.edit.index].email =  $scope.user.edit.email;
            $scope.user.list[$scope.user.edit.index].admin =  $scope.user.edit.admin;
            $scope.user.edit.username = "";
            $scope.user.edit.email = null;
            $scope.user.edit.admin = false;
            $scope.user.edit.id = null;
            $scope.user.edit.index = null;
            Notification.success("User updated.");
          }).error(function(data){
            Notification.error(err);
          });
        },
      destroy: function(index){
        User.destroy($scope.user.list[index]._id)
          .success(function(data){
            $scope.user.list.splice(index,1);
            Notification.success("User deleted successfully");
          })
          .error(function(data){
            Notification.error(data.error);
          });
      }
    }
  });
});
