const mongoose = require('mongoose');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c запрошенным id не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Запрошенный id пользователя является некорректным'));
      }
      return next(err);
    });
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c запрошенным id не найден');
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports.updateMe = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c запрошенным id не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      }
      return next(err);
    });
};

module.exports.updateMeAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { runValidators: true, new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь c запрошенным id не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные при обновлении аватара'));
      }
      return next(err);
    });
};
