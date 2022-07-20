/* eslint-disable linebreak-style */
const router = require('express').Router();
const { userRouter } = require('./users');
const { movieRouter } = require('./movies');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/notFoundErr');
const { login, createUser } = require('../controllers/users');
const { loginValidation, createUserValidation } = require('../utils/validations');

router.post('/signin', loginValidation, login);

router.post('/signup', createUserValidation, createUser);

router.use('/', auth, userRouter);
router.use('/', auth, movieRouter);

router.all('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
