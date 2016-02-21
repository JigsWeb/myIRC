'use strict';

/* DEPENDENCIES */

var express = require('express');

/* CONTROLLERS */

var Auth = require('./controllers/auth');
var User = require('./controllers/user');
var Channel = require('./controllers/channel');

/* SERVICES */

var Token = require('./services/token.js');

module.exports = function(app){
  app.use(express.static('client'));
  app.use(express.static('bower_components'));



  app.param('channel_id', function(req, res, next, channel_id) {
    req.channel_id = channel_id;
    next();
  });


  app.get('/', function (req, res) {
    res.sendFile(process.cwd()+"/index.html");
  });

  app.post('/!/user/create', function(req, res){
    User.create(req, res);
  });

  app.post('/!/channel/create', function(req, res){
    Channel.create(req, res);
  });

  app.get('/!/channel', function (req, res) {
    Channel.all(req, res);
  });

  app.post('/!/auth/attempt',function(req, res){
    Auth.attempt(req, res);
  });

  app.put('/!/user/update', function(req, res){
    Token.check(req,function(user){
      if(user) User.update(req, res, user);
      else return res.status(403);
    });
  });

  app.put('/!/channel/:channel_id/update', function(req, res){
    Token.check(req,function(user){
      if(user.admin) Channel.update(req, res);
      else return res.status(403);
    });
  });

  app.delete('/!/channel/:channel_id/delete', function(req, res){
    Token.check(req,function(user){
      if(user.admin) Channel.destroy(req, res);
      else return res.status(403);
    });
  });
}
