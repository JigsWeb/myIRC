myIRC.controller('ChatCtrl',function($scope, $location, Channel, Security, Socket, Notification, Command){
  if(!Security.isOnline()) $location.path('/');

  $scope.messages = {};
  $scope.users = {};
  $scope.channels = [];
  $scope.inChannels = [{'name':'General'}];
  $scope.currentChannel = 'General';

  Channel.all().then(function(channels){
    $scope.channels = channels.data;
  });

  Socket.emit('join:room', {room: 'General', user: Security.getUser()});

  Socket.on('join:room',function(data){
    $scope.users[data.room] = data.users;
  });

  Socket.on('messages',function(data){
    $scope.messages[data.room] = data.messages;
  });

  Socket.on('send:message', function(data){
    var room = data.room;
    delete data.room;
    if($scope.messages[room] == undefined) $scope.messages[room] = [];
    $scope.messages[room].push(data);
  });

  Socket.on('leave:room',function(data){
    $scope.users[data.room] = data.users;
  });

  Socket.on('client:list',function(users){
    $scope.messages[$scope.currentChannel].push({
      'cmd': 'users',
      'var': users
    });
  });

  Socket.on('channel:list',function(channels){
    console.log($scope.channels);
    $scope.messages[$scope.currentChannel].push({
      'cmd': 'list',
      'var': channels
    });
  });

  Socket.on('private:message',function(data){
    console.log(data);
    $scope.messages[$scope.currentChannel].push({
      'cmd': 'msg',
      'var': data
    });
  })

  $scope.send = function(e){
    if(e.code == "Enter"){
      if($scope.messageBox.length > 1){
        if($scope.messageBox.charAt(0) !== "/"){
          Socket.emit('send:message', {'room': $scope.currentChannel, 'msg': $scope.messageBox});
          $scope.messageBox = "";
        }
        else{
          args = $scope.messageBox.split(" ");
          command = $scope.messageBox.split(" ")[0].substring(1);
          args.shift();

          if(typeof commands[command] !== 'undefined'){
            commands[command](args);
            $scope.messageBox = "";
          }
          else{
            Notification.error("This command does not exist");
          }
        }
      }
      else{
        Notification.error("Message too short !");
      }
    }
  }

  $scope.createChannel = function(channel){
    channel.owners = [Security.getId()];
    Channel.create(channel)
      .success(function(data){
        Notification.success('Channel '+data.name+' created !');
      })
      .error(function(data){
        Notification.error(data.error);
      });
  }

  $scope.join = function(channel){
    if($scope.inChannels.indexOf(channel) > -1){
      Notification.error("You are already in this channel");
    }
    else{
      Socket.emit('join:room', {'room': channel,'user': Security.getUser()});
      $scope.inChannels.push({'name':channel});
      $scope.currentChannel = channel;
    }
  }

  $scope.leave = function(index){
    Socket.emit('leave:room', $scope.inChannels[index].name);
    $scope.inChannels.splice(index,1);
    if($scope.inChannels.length){
      $scope.change($scope.inChannels[0].name);
    }
  }

  $scope.change = function(channel){
    $scope.currentChannel = channel;
  }

  var commands = {
    nick: function(args){
      if(args[0].length > 20){
        Notification.error("Nickname too long.");
      }
      else{
        Socket.emit('client:nick',{'room':$scope.currentChannel,'nickname':args[0]});
      }
    },
    list: function(args){
      var string = typeof args[0] !== 'undefined' ? args[0] : null;
      Socket.emit('channel:list',{'room':$scope.currentChannel,'string':args[0]});
    },
    join: function(args){
      if($scope.inChannels.indexOf(args[0]) > -1){
        Notification.error("You are already in this channel.");
      }
      else{
        $scope.join(args[0]);
      }
    },
    part: function(args){
      indexOfChannel = $scope.inChannels.map(function(object) { return object.name; }).indexOf(args[0]);
      if(indexOfChannel > -1){
        $scope.leave(indexOfChannel);
      }
      else{
        Notification.error("You are not in this channel..");
      }
    },
    users: function(){
      Socket.emit('client:list',$scope.currentChannel);
    },
    msg: function(args){
      //Event pour confirmer l'envoi "private:message:success" et "private:message:error"
      var username = args[0];
      if(username == Security.getUsername()){
        Notification.error("You cant sent a private message to yourself...");
      }
      else{
        args.splice(0,1);
        var message = args.join(" ");

        Socket.emit('private:message',{'username':username,'text':message});
      }
    },
    help: function(){
      if(typeof $scope.messages[$scope.currentChannel] == 'undefined') $scope.messages[$scope.currentChannel] = [];
      $scope.messages[$scope.currentChannel].push({ cmd: 'help' });
    },
  }
})
