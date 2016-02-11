'use strict';
var Channel = require('../models/channel');


module.exports = {
  create: function(req, res){
    params = req.body;

    var channel = new Channel(req.body);
    channel.save(function(err){
      if(err) res.status(400).json({'error':err});
      res.status(201).json(channel);
    })
  },

  read: function(req, res){
    params = req.body;

    Channel.findOne({'_id':params._id},function(err,doc){
      if(err) return res.status(400).json({'error':'Channel not found.'});
      return res.status(200).json(doc);
    });
  },

  update: function(req, res){
    params = req.body;
    Channel.findOne({'_id':params._id},params,function(err,doc){
      if(err) return res.status(400).json({'error':'Error in channel update.','detail':err});
      return res.status(200).json(doc);
    })
  },

  destroy: function(req, res){

  },
}
