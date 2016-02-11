'use strict';
var User = require('../models/user'),
  geoip = require('geoip-lite'),
  bcrypt = require('bcrypt-nodejs');


module.exports = {
  create: function(req, res){
    if(req.body.password && req.body.password == req.body.password_confirm){
      var userParams = req.body;

      userParams.password = bcrypt.hashSync(userParams.password);
      userParams.info = {
        ip: req.connection.remoteAddress,
        location: geoip.lookup(req.connection.remoteAddress),
        browser: req.headers['user-agent']
      }

      var user = new User(userParams);

      user.save(function(err){
        if(err) return res.status(400).json(err)
        return res.status(201).json(user);
      });
    }
    else{
      return res.status(400).json({'errors': {'password': {'message':'Password does not match.'}}});
    }
  },

  read: function(req, res){
    params = req.body;

    User.findOne({'_id':params._id},function(err,doc){
      if(err) return res.status(400).json({'error':'User not found.'})
      return res.status(200).json(doc);
    });
  },

  update: function(req, res){
    params = req.body;
    User.findOne({'_id':params._id},params,function(err,doc){
      if(err) return res.status(400).json({'error':'Error in processing update.'})
      return res.status(200).json(doc);
    })
  },

  destroy: function(req, res){

  },
}