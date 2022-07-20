const router = require('express').Router();
const { putchUserProfileValidation } = require('../utils/validations');
const { putchUserProfile, getUserProfile } = require('../controllers/users');

// информация о текущем пользователе
router.get('/users/me', getUserProfile);

router.patch('/users/me', putchUserProfileValidation, putchUserProfile);

module.exports.userRouter = router;
