const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/notFoundErr');
const ValidationError = require('../utils/errors/validationErr');
const AuthError = require('../utils/errors/authorizedErr');
const UserAlreadyExists = require('../utils/errors/userAlreadyExists');

const { JWT_SECRET, NODE_ENV } = require('../utils/config');

const saltRounds = 10;

// информация о текущем пользователе
module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет');
      }
      return res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

// Создание пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  if (!password || !email) {
    throw new ValidationError('почта или пароль должны быть заполнены');
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new UserAlreadyExists('Такой пользователь уже существует');
      } else {
        bcrypt.hash(password, saltRounds)
          .then((hash) => User.create({
            name,
            email,
            password: hash,
          }))
          .then((userData) => res.send({
            name: userData.name,
            id: userData._id,
            email: userData.email,
          }))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new ValidationError('Некорректные данные при создании пользователя'));
            }
            if (err.code === 11000) {
              next(new UserAlreadyExists('Такой пользователь уже существует'));
            }
            next(err);
          });
      }
    })
    .catch((err) => {
      next(err);
    });
};

// редактирование профиля
module.exports.putchUserProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundError('Пользователь с указанным _id не найден');
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Введены некорректные данные');
      }
      if (err.code === 11000) {
        throw new UserAlreadyExists('email занят');
      }
      next(err);
    })
    .catch(next);
};

// Аутентификация пользователя

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  console.log('email: ', email, ', password: ', password);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'ASDFGHJKL',
        { expiresIn: '7d' },
      );
      const { name } = user;
      res.send({ token, name });
    })
    .catch(() => {
      next(new AuthError('Ошибка доступа'));
    });
};
