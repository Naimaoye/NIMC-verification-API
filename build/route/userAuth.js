"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _users = _interopRequireDefault(require("../controller/users"));

var _request = _interopRequireDefault(require("../controller/request"));

var _userValidation = _interopRequireDefault(require("../middleware/user-validation"));

var _checkAuth = _interopRequireDefault(require("../util/checkAuth"));

var userRoute = _express["default"].Router();

userRoute.post('/signup', _userValidation["default"].validateUser('signup'), _userValidation["default"].userExists, _users["default"].signup);
userRoute.post('/signin', _userValidation["default"].validateUser('signin'), _userValidation["default"].validateLogin, _users["default"].signin);
userRoute.post('/edit', _users["default"].editUser);
userRoute.get('/user', _users["default"].returnSingleUser);
userRoute.get('/search', _checkAuth["default"].verifyToken, _request["default"].searchCandidate);
userRoute.get('/history', _checkAuth["default"].verifyToken, _request["default"].returnUserRequestHistory);
userRoute.post('/addToken', _users["default"].addToken);
var _default = userRoute;
exports["default"] = _default;
//# sourceMappingURL=userAuth.js.map