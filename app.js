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

require("./server/socket")(io);

/* Run server */

httpServer.listen(config.server.port);
