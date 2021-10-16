"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var userSchema = new _mongoose["default"].Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: Number,
    "default": 0
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
userSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) return next();
  console.log(user.isModified);

  _bcryptjs["default"].genSalt(10, function (err, salt) {
    if (err) console.error(err);

    _bcryptjs["default"].hash(user.password, salt, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});

var User = _mongoose["default"].model('User', userSchema);

var _default = User;
exports["default"] = _default;
//# sourceMappingURL=User.js.map