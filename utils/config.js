const {
  dataMovies = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
  JWT_SECRET,
  NODE_ENV,
  // MONGOOSE_URL,
} = process.env;

// const dataMovies = 'mongodb://localhost:27017/moviesdb';

module.exports = {
  dataMovies,
  PORT,
  JWT_SECRET,
  NODE_ENV,
  // MONGOOSE_URL,
};
