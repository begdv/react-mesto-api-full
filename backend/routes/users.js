const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { expressionLink } = require('../utils/const');

const {
  getUsers, getMe, getUser, updateMe, updateMeAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24)
      .required(),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateMe);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(expressionLink).required(),
  }),
}), updateMeAvatar);

module.exports = router;
