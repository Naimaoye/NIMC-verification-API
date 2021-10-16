"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var userSchema = new _mongoose["default"].Schema({
  fullName: {
    type: String,
    lowercase: true
  },
  nin: {
    type: String
  },
  phoneNumber: {
    type: String,
    unique: true
  },
  homeAddress: {
    type: String
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});

var Candidate = _mongoose["default"].model('Candidate', userSchema);

var _default = Candidate;
exports["default"] = _default;
//# sourceMappingURL=Candidate.js.map