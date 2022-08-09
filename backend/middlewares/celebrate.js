const { celebrate, Joi } = require('celebrate');
const { imgUrlRegExp } = require('../utils/regexp');

const validateUserCreate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(imgUrlRegExp),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateUserAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(imgUrlRegExp),
  }),
});

const validateCardPost = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(imgUrlRegExp),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  })
    .messages({
      'string.length': 'Длина id карточки должна быть 24 символа.',
    }),
});

module.exports = {
  validateUserCreate,
  validateUserLogin,
  validateUserId,
  validateUserUpdate,
  validateUserAvatar,
  validateCardPost,
  validateCardId,
};
