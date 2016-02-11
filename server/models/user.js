var mongoose = require('mongoose'),
  validators = require('mongoose-validators');

  var Schema = mongoose.Schema;

  // create a schema
  var userSchema = new Schema({
    username: { type: String, required: true, unique: true, validate: [
      validators.isAlphanumeric(),
      validators.isLength({'message': 'The username must contain between three to ten characters'}, 3, 10)
    ]},
    password: { type: String, required: true, validate: validators.isLength({'message': 'The password must contain between six to twenty characters.'},5)},
    email: {type: String, required: true, unique: true, validate: validators.isEmail({'message': 'Please enter a valid email address.'})},
    admin: {type: Boolean, default: false},
    token: String,
    created_at: {type: Date, default: Date.now },
    updated_at: Date,
    info: {
      ip: String,
      last_ip: {type: String, default: null},
      location: {
        range: Array,
        country: String,
        region: String,
        city: String,
        ll: Array
      },
      browser: String
    }
  });

  userSchema.pre('save',function(next){
    this.updated_at = Date.now;
    next();
  });

  userSchema.methods.toJSON = function() {
    var obj = this.toObject()
    delete obj.password;
    return obj;
  }

module.exports = mongoose.model('User', userSchema);
