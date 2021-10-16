"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var userSchema = new _mongoose["default"].Schema({
  numberOfRequests: {
    type: Number,
    "default": 0
  },
  requests: {
    type: Array,
    "default": []
  },
  userId: {
    type: String
  }
});

var Report = _mongoose["default"].model('Report', userSchema);

var _default = Report;
exports["default"] = _default;
//# sourceMappingURL=Report.js.map