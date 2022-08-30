const mongoose = require('mongoose');
const Card = require('../models/card');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};

module.exports.removeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка c запрошенным id не найдена');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Запрещается удалять чужую карточку');
      }
      return Card.findByIdAndRemove(req.params.cardId)
        .populate('owner')
        .populate('likes')
        .then((cardRemove) => res.send({ data: cardRemove }))
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Запрошенный id пользователя является некорректным'));
      }
      return next(err);
    });
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка c запрошенным id не найдена');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка'));
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Запрошенный id пользователя является некорректным'));
      }
      return next(err);
    });
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка c запрошенным id не найдена');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные для постановки/снятии лайка'));
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Запрошенный id пользователя является некорректным'));
      }
      return next(err);
    });
};
