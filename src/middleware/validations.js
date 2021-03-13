import Joi from '@hapi/joi';

const email = Joi.string().trim()
  .required()
  .label('email must not be empty');

const firstName = Joi.string().trim()
  .required()
  .label('first name must not be empty');

const lastName = Joi.string().trim()
  .required()
  .label('last name must not be empty');

const phoneNumber = Joi.string().trim()
  .required()
  .label('phone number must not be empty');
 
const password = Joi.string()
  .label('password must not be empty');

    export default {
        signup: Joi.object().keys({
          email,
          firstName,
          lastName,
          phoneNumber,
          password,
        }),
        signin: Joi.object().keys({
          email,
          password
        }),
        edit: Joi.object().keys({
          firstName,
          lastName,
          phoneNumber,
            email,
            password
        }),
    }