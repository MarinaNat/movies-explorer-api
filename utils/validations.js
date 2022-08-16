const { celebrate, Joi } = require('celebrate');
// const { validateURL } = require('./const');

module.exports.putchUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
  }),
});

module.exports.createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(/https?:\/\/(w{3}\.)?[-\w@:%.+~#=]+\.[\w()]+([-\w()@:%+.~#?&=/]*)/),
    trailerLink: Joi.string().required().pattern(/https?:\/\/(w{3}\.)?[-\w@:%.+~#=]+\.[\w()]+([-\w()@:%+.~#?&=/]*)/),
    thumbnail: Joi.string().required().pattern(/https?:\/\/(w{3}\.)?[-\w@:%.+~#=]+\.[\w()]+([-\w()@:%+.~#?&=/]*)/),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
