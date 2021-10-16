"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _lodash = _interopRequireDefault(require("lodash"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _validations = _interopRequireDefault(require("./validations"));

var _User = _interopRequireDefault(require("../models/User"));

/**
   * @function
   * @description Check if user email exist, password correct and verified
   * @param {object} req - Resquest object
   * @param {object} res - Response object
   * @param {object} next
   * @returns {object} JSON response
   */
var validateLogin = function validateLogin(req, res, next) {
  var password = req.body.password.toLowerCase();

  _User["default"].findOne({
    email: req.body.email.trim().toLowerCase()
  }).then(function (response) {
    if (!response) {
      return res.status(404).json({
        status: 404,
        message: 'Wrong credentials'
      });
    }

    _bcryptjs["default"].compare(password, response.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).json({
          status: 401,
          message: 'Wrong credentials'
        });
      }

      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 500,
          message: 'Database error'
        });
      }

      next();
    });
  });
};

var validateUser = function validateUser(path) {
  return function (req, res, next) {
    var user = req.body;

    if (_lodash["default"].has(_validations["default"], path)) {
      var schema = _lodash["default"].get(_validations["default"], path, 0);

      var response = _joi["default"].validate(user, schema, {
        abortEarly: false
      });

      if (!response.error) {
        req.body = user;
      } else {
        var errors = [];
        response.error.details.forEach(function (error) {
          errors.push(error.context.label);
          console.log(error);
        });
        return res.status(400).json({
          status: 400,
          error: errors
        });
      }
    }

    next();
  };
};
/**
* @function
* @description Check if email is already exists
* @param {object} req - Resquest object
* @param {object} res - Response object
* @param {object} next
* @returns {object} JSON response
*/


var userExists = function userExists(req, res, next) {
  _User["default"].findOne({
    email: req.body.email.trim()
  }).then(function (data) {
    if (data) {
      return res.status(409).json({
        status: 409,
        message: 'email already taken'
      });
    }

    next();
  })["catch"](function () {
    return res.status(500).json({
      status: 500,
      message: 'database error'
    });
  });
};

var _default = {
  validateLogin: validateLogin,
  validateUser: validateUser,
  userExists: userExists
};
exports["default"] = _default;
//# sourceMappingURL=user-validation.js.map