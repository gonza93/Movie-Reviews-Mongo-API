var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
    vote_count: Number,
    id: Number,
    video: Boolean,
    vote_average: Number,
    title: String,
    popularity: Number,
    poster_path: String,
    original_language: String,
    original_title: String,
    genre_ids: { type : Array , "default" : [] },
    backdrop_path: String,
    adult: Boolean,
    overview: String,
    release_date: String
});

module.exports = mongoose.model('Movie', MovieSchema, 'movieSnippets');
