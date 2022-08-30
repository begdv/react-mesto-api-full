const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, removeCard, addLike, removeLike,
} = require('../controllers/cards');

router.get('/', getCards);

const { expressionLink } = require('../utils/const');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(expressionLink).required(),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24)
      .required(),
  }),
}), removeCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24)
      .required(),
  }),
}), addLike);

router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24)
      .required(),
  }),
}), removeLike);

module.exports = router;
