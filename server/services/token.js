'use strict';

var jwt = require('jsonwebtoken');

module.exports = {
  create: function(user, next){
    user.token = jwt.sign({ username: user.username }, 'secretDeOuf');
    return user.save(function(err){
      if(err) return handleError(err);
        return next(user);
      });
  },
  check: function(user, token, next){
    User.findOne({'username': user.username, 'token':token},function(err,doc){
      if(err) return next(false);
      return next(true);
    })
  }
}
