'use strict';

var jwt = require('jsonwebtoken');
var User = require('../models/user');

module.exports = {
  create: function(user, next){
    user.token = jwt.sign({ username: user.username }, 'secretDeOuf');
    return user.save(function(err){
      if(err) return handleError(err);
        return next(user);
      });
  },
  check: function(req, next){
    var token = req.header ? req.header('Authorization') : req.authorization;

    if(token){
      User.findOne({'token':token},function(err,user){
        if(err) return next(false);
        return next(user);
      })
    }
    else{
      return next(false);
    }
  }
}
