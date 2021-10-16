"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Report = _interopRequireDefault(require("../models/Report"));

var _User = _interopRequireDefault(require("../models/User"));

var _config = require("../config/config");

var UserController = /*#__PURE__*/function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "signup",
    value:
    /**
         * @method
         * @description Implements signup endpoint
         * @static
         * @param {object} req - Request object
         * @param {object} res - Response object
         * @returns {object} JSON response
         * @memberof UserController
         */
    function () {
      var _signup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, email, password, firstName, lastName, phoneNumber, user, newUser, resp, token, history, newReport;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _req$body = req.body, email = _req$body.email, password = _req$body.password, firstName = _req$body.firstName, lastName = _req$body.lastName, phoneNumber = _req$body.phoneNumber;
                email = email.trim();
                firstName = firstName.trim();
                lastName = lastName.trim();
                phoneNumber = phoneNumber.trim();
                password = password;
                user = {
                  email: email,
                  password: password,
                  firstName: firstName,
                  lastName: lastName,
                  phoneNumber: phoneNumber
                };
                newUser = new _User["default"](user);
                _context.next = 11;
                return newUser.save();

              case 11:
                resp = _context.sent;
                token = _jsonwebtoken["default"].sign({
                  id: resp._id
                }, _config.SECRET_KEY);
                history = {
                  userId: resp._id
                };
                newReport = new _Report["default"](history);
                _context.next = 17;
                return newReport.save();

              case 17:
                return _context.abrupt("return", res.status(201).json({
                  message: 'user created successfully',
                  status: 201,
                  token: token
                }));

              case 20:
                _context.prev = 20;
                _context.t0 = _context["catch"](0);
                return _context.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'database error'
                }));

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 20]]);
      }));

      function signup(_x, _x2) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }()
  }, {
    key: "signin",
    value:
    /**
         * @method
         * @description Implements signin endpoint
         * @static
         * @param {object} req - Request object
         * @param {object} res - Response object
         * @returns {object} JSON response
         * @memberof UserController
         */
    function () {
      var _signin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var email, user, token;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                email = req.body.email;
                email = email.trim().toLowerCase();
                _context2.next = 5;
                return _User["default"].findOne({
                  email: email
                });

              case 5:
                user = _context2.sent;
                token = _jsonwebtoken["default"].sign({
                  id: user.id
                }, _config.SECRET_KEY, {
                  expiresIn: '12h'
                });
                return _context2.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Login successful.',
                  jwToken: token,
                  requestToken: user.token
                }));

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);
                return _context2.abrupt("return", res.status(500).json({
                  status: 500,
                  error: 'database error'
                }));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 10]]);
      }));

      function signin(_x3, _x4) {
        return _signin.apply(this, arguments);
      }

      return signin;
    }()
  }, {
    key: "editUser",
    value:
    /**
         * @method
         * @description Implements editUser endpoint
         * @static
         * @param {object} req - Request object
         * @param {object} res - Response object
         * @returns {object} JSON response
         * @memberof UserController
         */
    function () {
      var _editUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var _req$body2, email, password, firstName, lastName, phoneNumber, user;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password, firstName = _req$body2.firstName, lastName = _req$body2.lastName, phoneNumber = _req$body2.phoneNumber;
                email = email.trim();
                firstName = firstName.trim();
                lastName = lastName.trim();
                phoneNumber = phoneNumber.trim();
                password = password;
                _context3.next = 9;
                return _User["default"].findOne({
                  email: email
                });

              case 9:
                user = _context3.sent;

                if (user) {
                  _context3.next = 12;
                  break;
                }

                return _context3.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'user not found'
                }));

              case 12:
                user.password = password;
                user.firstName = firstName;
                user.lastName = lastName;
                user.phoneNumber = phoneNumber;
                _context3.next = 18;
                return user.save();

              case 18:
                return _context3.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'successfully updated your profile'
                }));

              case 21:
                _context3.prev = 21;
                _context3.t0 = _context3["catch"](0);
                res.status(500).json({
                  status: 500,
                  message: err
                });

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 21]]);
      }));

      function editUser(_x5, _x6) {
        return _editUser.apply(this, arguments);
      }

      return editUser;
    }()
    /**
         * @method
         * @description Implements returnSingleuser endpoint
         * @static
         * @param {object} req - query parametr
         * @param {object} res - Response object
         * @returns {object} JSON response
         * @memberof UserController
         */

  }, {
    key: "returnSingleUser",
    value: function () {
      var _returnSingleUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var id, user;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.query.id;
                _context4.next = 4;
                return _User["default"].findOne({
                  _id: id
                });

              case 4:
                user = _context4.sent;

                if (user) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'user not found'
                }));

              case 7:
                return _context4.abrupt("return", res.status(200).json({
                  status: 200,
                  data: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    requestToken: user.token
                  }
                }));

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](0);
                res.status(500).json({
                  status: 500,
                  message: err
                });

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 10]]);
      }));

      function returnSingleUser(_x7, _x8) {
        return _returnSingleUser.apply(this, arguments);
      }

      return returnSingleUser;
    }()
    /**
       * @method
       * @description Implements signin endpoint
       * @static
       * @param {object} req - Request object
       * @param {object} res - Response object
       * @returns {object} JSON response
       * @memberof UserController
       */

  }, {
    key: "addToken",
    value: function () {
      var _addToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var _req$body3, email, token, user, oldToken, tokenBody, newToken, resp;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                //use the user's email
                _req$body3 = req.body, email = _req$body3.email, token = _req$body3.token;
                _context5.next = 4;
                return _User["default"].findOne({
                  email: email
                });

              case 4:
                user = _context5.sent;

                if (!user) {
                  _context5.next = 16;
                  break;
                }

                oldToken = user.token;
                tokenBody = parseFloat(token);
                newToken = oldToken + tokenBody;
                user.token = newToken;
                _context5.next = 12;
                return user.save();

              case 12:
                resp = _context5.sent;
                return _context5.abrupt("return", res.status(200).json({
                  status: 200,
                  message: 'Token successfully added',
                  data: resp.token
                }));

              case 16:
                return _context5.abrupt("return", res.status(404).json({
                  status: 404,
                  message: 'user not found'
                }));

              case 17:
                _context5.next = 23;
                break;

              case 19:
                _context5.prev = 19;
                _context5.t0 = _context5["catch"](0);
                console.log("err", _context5.t0);
                return _context5.abrupt("return", res.status(500).json({
                  status: 500,
                  message: 'internal server error'
                }));

              case 23:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 19]]);
      }));

      function addToken(_x9, _x10) {
        return _addToken.apply(this, arguments);
      }

      return addToken;
    }()
  }]);
  return UserController;
}();

exports["default"] = UserController;
//# sourceMappingURL=users.js.map