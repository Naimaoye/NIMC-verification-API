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

var _config = require("../config/config");

var Authentication = /*#__PURE__*/function () {
  function Authentication() {
    (0, _classCallCheck2["default"])(this, Authentication);
  }

  (0, _createClass2["default"])(Authentication, null, [{
    key: "verifyToken",
    value: function () {
      var _verifyToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
        var authHeader, token, decoded;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                authHeader = req.headers.authorization;

                if (!authHeader) {
                  _context.next = 14;
                  break;
                }

                token = authHeader.split('Bearer ')[1];

                if (!token) {
                  _context.next = 13;
                  break;
                }

                _context.prev = 4;
                decoded = _jsonwebtoken["default"].verify(token, _config.SECRET_KEY);
                req.user = decoded;
                return _context.abrupt("return", next());

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](4);
                return _context.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'Invalid/Expired token, make sure you are loggedIn'
                }));

              case 13:
                return _context.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'Authentication token must be Bearer [token]'
                }));

              case 14:
                return _context.abrupt("return", res.status(403).json({
                  status: 403,
                  message: 'Authorization header must be provided'
                }));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 10]]);
      }));

      function verifyToken(_x, _x2, _x3) {
        return _verifyToken.apply(this, arguments);
      }

      return verifyToken;
    }()
  }]);
  return Authentication;
}();

var _default = Authentication;
exports["default"] = _default;
//# sourceMappingURL=checkAuth.js.map