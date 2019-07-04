var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var mongoose      = require('mongoose');
var config        = require('./config/database'); // get db config file
var port          = 3800;
var Movies        = require('./app/model/movie');
var MovieDetails  = require('./app/model/movieDetail');
var MovieCast     = require('./app/model/movieCast');

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// demo Route (GET http://localhost:4200)
app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// Start the server
app.listen(port);
console.log('Movie Review API started at: http://localhost:' + port);

// connect to database
mongoose.connect(config.database);

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

/* ------------------------------ GET ------------------------------ */
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get('/movie', function(req, res) {
  Movies.find({}).limit(20).exec(function(err, movies){
    if(err) console.log(err);
    console.log("Get Movies.");
    res.send(movies);
  });
});

app.get('/movie/:id', function(req, res) {
  var movieId = req.params.id;
  MovieDetails.findOne({id: movieId}).exec(function(err, movie){
    if(err) console.log(err);
    console.log("Get Movie Details for id: " + movieId);
    res.send(movie);
  });
});

app.get('/movie/cast/:id', function(req, res) {
  var movieId = req.params.id;
  MovieCast.findOne({id: movieId}).exec(function(err, cast){
    if(err) console.log(err);
    console.log("Get Movie Cast for id: " + movieId);

    res.send(cast);
  });
});

app.get('/search/movie/:query', function(req, res) {
  var query = req.params.query;

  console.log("Searching movies...");

  Movies.find({title: new RegExp(query, 'i')}).limit(20).exec(function(err, movies){
    if(err) console.log(err);

    console.log("Found " + Object.size(movies) + " movies.");
    res.send(movies);
  });
});

/* ------------------------------ POST ------------------------------ */
app.post('/movie/review', function(req, res) {
  var id = req.body.id;
  var review = req.body.review;

  MovieDetails.update({id: id}, { $push: { reviews: review } }).exec(function(err, result){
    if(err) {
      console.log(err);
      res.send({success: false});
    }

    console.log(result);
    res.send({success: true});
  });
});
