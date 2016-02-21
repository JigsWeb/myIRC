var clients = {},
  Token = require('./services/token'),
  Channel = require('./models/channel'),
  ChannelCtrl = require('./controllers/channel'),
  Message = require('./models/message');

module.exports = function(io){

  var socketIdByUsername = function(username){
    for(r in clients){
      for(s in clients[r]){
        if(clients[r][s].info.username == username){
          return s;
        }
      }
    }
  }

  io.on('connection', function(socket){

    Token.check(socket.request._query,function(user){
      if(!user) socket.disconnect();
    });

    socket.on('send:message', function(data){

      var message = {
        'room': data.room,
        'username': clients[data.room][socket.id].info.username,
        'text': data.msg
      };

      Channel.addMessage(message,function(){
        io.sockets.in(data.room).emit('send:message', message);
      })
    });

    socket.on('private:message',function(data){
       io.sockets.connected[socketIdByUsername(data.username)].emit('private:message', {
         'username': socket.info.username,
         'text': data.text
       });
    });

      socket.on('disconnect', function(){
        for (r in clients) {
          for (s in clients[r]) {
            if(clients[r][s].socketId == socket.id) {
              console.log(clients[r][s].info.username+" disconnect.");
              delete clients[r][s];
              io.sockets.in(r).emit('leave:room', {'room': r, 'users': clients[r]});
            }
          }
        }
      })

      //TODO delete client of all rooms

      socket.on('join:room', function(data) {
          if(typeof clients[data.room] === 'undefined') clients[data.room] = {};

          clients[data.room][socket.id] = {'info': data.user, 'socketId': socket.id};
          socket.info = data.user;

          ChannelCtrl.findOrCreate(data.room,clients[data.room][socket.id].info._id,function(){
            socket.join(data.room);

            io.sockets.in(data.room).emit('join:room', {'room': data.room, 'users': clients[data.room]});

            Channel.getMessages(data.room,function(messages){
              io.emit('messages', {'room': data.room,'messages': messages});
            });
          })
      })

      socket.on('leave:room', function(room) {
          delete clients[room][socket.id];
          socket.leave(room);
          io.sockets.in(room).emit('leave:room', {'room': room, 'users': clients[room]});
      })

      socket.on('client:list',function(room){
        Message.create({
          action: "user.list",
          user_id: clients[room][socket.id].info._id,
          channel: room,
        });

        io.emit('client:list', clients[room]);
      });

      socket.on('client:nick',function(data){
        Message.create({
          action: "user.nickname",
          user_id: clients[data.room][socket.id].info._id,
          channel: data.room,
        });

        clients[data.room][socket.id].info.username = data.nickname;
        io.sockets.in(data.room).emit('join:room', {'room': data.room, 'users': clients[data.room]});
      });

      socket.on('channel:list',function(data){
        Message.create({
          action: "channel.list",
          user_id: clients[data.room][socket.id].info._id,
          channel: data.room,
        });

        if(data.string){
          Channel.contains(data.string,function(channels){
            io.sockets.in(data.room).emit('channel:list', channels);
          });
        }
        else{
          Channel.find({},function(err,channels){
            var channels = channels ? channels : [];
            io.sockets.in(data.room).emit('channel:list', channels);
          });
        }
      });
  });
}
