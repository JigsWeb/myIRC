myIRC.controller('AdminCtrl',function($scope,$location,Notification,Security,Channel){
  if(!Security.isAdmin){
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
});
