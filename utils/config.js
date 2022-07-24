const {
  PORT = 3000,
  JWT_SECRET,
  NODE_ENV,
  MONGOOSE_URL,
} = process.env;

const dataMovies = 'mongodb://localhost:27017/movesdb';

module.exports = {
  dataMovies,
  PORT,
  JWT_SECRET,
  NODE_ENV,
  MONGOOSE_URL,
};