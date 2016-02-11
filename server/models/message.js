var mongoose = require('mongoose'),
  validators = require('mongoose-validators');

var Schema = mongoose.Schema;

// create a schema
var messageSchema = new Schema({
  text: { type: String, required: true, validate: [
    validators.isLength({'message': 'The message must contain between two to ** characters'}, 2, 240)
  ]},
  user_id: {type: Object, required: true},
  channel_id: {type: Object, required: true},
  receiver_id: {type: Object, default: false},
  created_at: {type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
