"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var email = _joi["default"].string().trim().required().label('email must not be empty');

var firstName = _joi["default"].string().trim().required().label('first name must not be empty');

var lastName = _joi["default"].string().trim().required().label('last name must not be empty');

var phoneNumber = _joi["default"].string().trim().required().label('phone number must not be empty');

var password = _joi["default"].string().label('password must not be empty');

var _default = {
  signup: _joi["default"].object().keys({
    email: email,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    password: password
  }),
  signin: _joi["default"].object().keys({
    email: email,
    password: password
  })
};
exports["default"] = _default;
//# sourceMappingURL=validations.js.map