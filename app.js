/* DEPENDENCIES */

var http = require('http');
var express = require('express');
var config = require('./config/all');
var bodyParser = require('body-parser');


/* APP */

var app = express();
var httpServer = http.createServer(app);
var io = require('socket.io')(httpServer);
var mongoose = require('mongoose');

/* MONGOOSE INIT */

if(config.mongoose.user === null && config.mongoose.password === null){
  mongoose.connect('mongodb://'+config.mongoose.host+':'+config.mongoose.port+'/test');
}
else{
  mongoose.connect('mongodb://'+config.mongoose.user+':'+config.mongoose.password+'@'+config.mongoose.host+':'+config.mongoose.port+'/test');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/* Express routing */

require('./server/route')(app);

/* IO Event */

var clients = {};

io.on('connection', function(socket){
  clients[socket.id] = {'socket':socket};

  socket.on('send:message', function(msg){
    io.emit('send:message', {
      'username': clients[socket.id].info.username,
      'text': msg
    });
  });

  socket.on('user:connect', function(user){
    clients[socket.id] = {'info': user};
    io.emit('user:connect', clients);
  });

  socket.on('disconnect', function(){
    delete clients[socket.id];
    io.emit('user:disconnect', clients)
  })
});

/* Run server */

httpServer.listen(config.server.port);
