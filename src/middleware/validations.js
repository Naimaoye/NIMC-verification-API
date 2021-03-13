import Joi from '@hapi/joi';

const email = Joi.string().trim()
  .required()
  .label('email must not be empty');

const password = Joi.string()
  .label('password must not be empty');

    export default {
        signup: Joi.object().keys({
          email,
          password,
        }),
        signin: Joi.object().keys({
          email,
          password
        }),
        edit: Joi.object().keys({
            email,
            password
        }),
    }