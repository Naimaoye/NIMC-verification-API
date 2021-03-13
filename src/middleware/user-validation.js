import Joi from '@hapi/joi';
import _ from 'lodash';
import bcrypt from 'bcryptjs';

import Schemas from './validations';
import User from '../models/User';

/**
   * @function
   * @description Check if user email exist, password correct and verified
   * @param {object} req - Resquest object
   * @param {object} res - Response object
   * @param {object} next
   * @returns {object} JSON response
   */
  const validateLogin = (req, res, next) => {
    const password = req.body.password.toLowerCase();
    User.findOne({ email: req.body.email.trim().toLowerCase() }).then(response => {
      if (!response) {
        return res.status(404).json({
            status: 404, 
            message: 'Wrong credentials'
    });
    }
      bcrypt.compare(password, response.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ 
            status: 401, 
            message: 'Wrong credentials'
        });
      }
     if(err){
       console.log(err);
       return res.status(500).json({
        status: 500, 
        message: 'Database error'
     });
     }
      next();
    })
})

}
const validateUser = path => (req, res, next) => {
    const user = req.body;
    if (_.has(Schemas, path)) {
      const schema = _.get(Schemas, path, 0);
      const response = Joi.validate(user, schema, { abortEarly: false });
      if (!response.error) {
        req.body = user;
      } else {
        const errors = [];
        response.error.details.forEach(error => {
          errors.push(error.context.label);
          console.log(error);
        });
        return res.status(400).json({status: 400, error: errors});
      }
    }
    next();
  };

  /**
 * @function
 * @description Check if email is already exists
 * @param {object} req - Resquest object
 * @param {object} res - Response object
 * @param {object} next
 * @returns {object} JSON response
 */
const userExists = (req, res, next) => {
  User.findOne({ email: req.body.email.trim() }).then(data => {
    if (data) {
      return res.status(409).json({
          status: 409, 
          message: 'email already taken'
      });
    }
    next();
  }).catch(() => {
    return res.status(500).json({
        status: 500, 
        message: 'database error'
      });
  });
};

export default {
    validateLogin,
    validateUser,
    userExists
}