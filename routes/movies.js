const router = require('express').Router();
const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../utils/validations');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', createMovieValidation, createMovie);

router.delete('/movies/_id', deleteMovieValidation, deleteMovie);

module.exports.movieRouter = router;
