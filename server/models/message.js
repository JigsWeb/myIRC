var mongoose = require('mongoose'),
  validators = require('mongoose-validators');

var Schema = mongoose.Schema;

// create a schema
var messageSchema = new Schema({
  action: { type: String, required: true },
  user_id: String,
  channel: String ,
  at: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Message', messageSchema);
