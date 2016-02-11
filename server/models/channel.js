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
  created_at: {type: Date, default: Date.now },
  updated_at: Date,
});

channelSchema.pre('save',function(next){
  this.updated_at = Date.now;
  next();
});

module.exports = mongoose.model('Channel', channelSchema);
