const joi = require('@hapi/joi');

const User = joi.object({
  username: joi.string().min(3).max(30).required(),
  password: joi.string().min(8).required(),
  email: joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}}),
  token: joi.string(),
});

module.exports = {
  User,
};