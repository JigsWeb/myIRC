'use strict';
var bodyParser = require('body-parser'),
  User = require('../models/user'),
  geoip = require('geoip-lite'),
  bcrypt = require('bcrypt-nodejs'),
  tokenService = require('../services/token');

module.exports = {
  attempt: function(req, res){
    var params = req.body;

    User.findOne({ $or:[ {'username': params.login }, {'email': params.login} ]},function(err,doc){
      if(err) return res.status(401).json({'error': 'User not found.'});
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
