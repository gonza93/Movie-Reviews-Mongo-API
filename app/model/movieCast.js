var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieCastSchema = new Schema({
  id: Number,
  cast: [
      {
        cast_id: Number,
        character: String,
        credit_id: String,
        gender: Number,
        id: Number,
        name: String,
        order: Number,
        profile_path: String
      }
    ],
});

module.exports = mongoose.model('MovieCast', MovieCastSchema, 'movieCast');
