var mongoose = require('mongoose'),
  validators = require('mongoose-validators');

var Schema = mongoose.Schema;

// create a schema
var banSchema = new Schema({
  reason: { type: String, required: true, validate: [
    validators.isLength({'message': 'The reason must contain between two to ** characters'}, 2, 30)
  ]},
  user_id: {type: Object, required: true},
  channel_id: {type: Object},
  created_at: {type: Date, default: Date.now },
  expire_at: {type: Date, required: true}
});

module.exports = mongoose.model('Message', messageSchema);
