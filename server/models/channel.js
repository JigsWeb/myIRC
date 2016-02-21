var mongoose = require('mongoose'),
  validators = require('mongoose-validators');

var Schema = mongoose.Schema;

// create a schema
var channelSchema = new Schema({
  name: { type: String, required: true, unique: true, validate: [
    validators.isAlphanumeric({'message':'Channel name contain bad characters.'}),
    validators.isLength({'message': 'The channel name must contain between three to ten characters'}, 3, 10)
  ]},
  owners: {type: Array, required: true},
  messages: Array,
  last_login: {type: Date, default: Date.now},
  created_at: {type: Date, default: Date.now},
  updated_at: Date,
});

channelSchema.pre('save',function(next){
  this.updated_at = Date.now;
  next();
});

channelSchema.statics.addMessage = function(data,cb){
  this.findOneAndUpdate(
      {name: data.room},
      {$push:
        {"messages": {
          username: data.username,
          text: data.text,
          date: Date.now
        }}
      }
  ,function(err,model){
    cb();
  });
}

channelSchema.statics.getMessages = function(name,cb){
  this.findOne({name:name},'messages',function(err,data){
    data ? cb(data.messages.splice(data.messages.length-4,data.messages.length-1)) : cb([]);
  });
}

channelSchema.statics.contains = function(string,cb){
  this.find({ name: { "$in" : [string]} }, function(err,channels){
    channels ? cb(channels) : cb([]);
  });
}

var Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
