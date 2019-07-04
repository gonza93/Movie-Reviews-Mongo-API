var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieDetailSchema = new Schema({
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
    release_date: String,
    belongs_to_collection: {
       id: Number,
       name: String,
       poster_path: String,
       backdrop_path: String
      },
    budget: Number,
    homepage: String,
    imdb_id: String,
    production_companies: [
      {
           id: Number,
           logo_path: String,
           name: String,
           origin_country: String
       }
    ],
    production_countries: [
       {
           iso_3166_1: String,
           name: String
       }
    ],
    revenue: Number,
    runtime: Number,
    spoken_languages: [
       {
           iso_639_1: String,
           name: String
       }
    ],
    status: String,
    tagline: String,
    reviews: [Number]
});

module.exports = mongoose.model('MovieDetail', MovieDetailSchema, 'movieDetails');
