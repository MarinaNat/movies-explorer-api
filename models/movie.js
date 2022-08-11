const mongoose = require('mongoose');
// const { validateURL } = require('../utils/const');
const validator = require('validator');

const validUrl = (value) => {
  if (!validator.isURL(value)) {
    throw new Error('Некорректная ссылка');
  }
};
const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: { validator: validUrl },
    },
    trailerLink: {
      type: String,
      required: true,
      validate: { validator: validUrl },
    },
    thumbnail: {
      type: String,
      required: true,
      validate: { validator: validUrl },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('movie', movieSchema);
