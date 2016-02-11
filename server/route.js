'use strict';

/* DEPENDENCIES */

var express = require('express');

/* CONTROLLERS */

var Auth = require('./controllers/auth');
var User = require('./controllers/user');

module.exports = function(app){
  app.use(express.static('client'));
  app.use(express.static('bower_components'));

  app.get('/', function (req, res) {
    res.sendFile(process.cwd()+"/index.html");
  });

  app.post('/!/user/create', function(req, res){
    User.create(req, res);
  });

  app.post('/!/auth/attempt',function(req, res){
    Auth.attempt(req, res);
  });
}
