'use strict';
var bodyParser = require('body-parser'),
  User = require('../models/user'),
  geoip = require('geoip-lite'),
  bcrypt = require('bcrypt-nodejs'),
  tokenService = require('../services/token');

module.exports = {
  attempt: function(req, res){
    var params = req.body;

    if(!params.login) return res.status(400).json({'error': 'Enter a login.','status':'error'});
    if(!params.password) return res.status(400).json({'error': 'Enter a password.','status':'error'});

    User.findOne({ $or:[ {'username': params.login }, {'email': params.login} ]},function(err,doc){
      if(err || !doc) return res.status(401).json({'error': 'User not found.'});

      if(bcrypt.compareSync(params.password, doc.password)){
        tokenService.create(doc,function(user){
          return res.status(200).json(user);
        });
      }
      else{
        return res.status(401).json({'error': 'The password is incorrect.'});
      }
    });
  }
}
