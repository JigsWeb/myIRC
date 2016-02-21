'use strict';
var Channel = require('../models/channel'),
  Message = require('../models/message');


module.exports = {
  all: function(req, res){
    Channel.find({},function(err, channels){
      if(err) return res.status(400).json(err);
      return res.status(200).json(channels);
    })
  },

  create: function(req, res){
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
    Channel.findByIdAndUpdate(req.channel_id,req.body,function(err,doc){
      if(err) return res.status(400).json({'error':err});
      return res.status(200).json(doc);
    })
  },

  destroy: function(req, res){
    Channel.findByIdAndRemove(req.channel_id, function(err,doc){
      if(err) return res.status(400).json({'error':err});
      return res.status(200).json(doc);
    })
  },

  findOrCreate: function(name,user_id,cb){
    Channel.findOne({'name':name},function(err,data){
      if(data != null){
        data.last_login = Date.now;
        data.save();
        cb();
      }
      else{
        Channel.create({'name':name,'owners':[user_id]}, function (err, channel) {
          Message.create({
            action: "channel.create",
            user_id: user_id,
            channel: name,
          });

          cb();
        });
      }
    });
  }
}
