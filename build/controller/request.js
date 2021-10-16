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

var _uuidv = require("uuidv4");

var _axios = _interopRequireDefault(require("axios"));

var _User = _interopRequireDefault(require("../models/User"));

var _Report = _interopRequireDefault(require("../models/Report"));

var _checkNetwork = require("../util/checkNetwork");

// create a search endpoint, save candidate details in the db, return search result,
// if multiple user found, return the message multiple users found and save in the db
// deduct from token for every successful requests, and count the number of requests, add request date and status for report sake
// create add token endpoint to add more token
var baseURL = ''; //return user history endpoint

var RequestController = /*#__PURE__*/function () {
  function RequestController() {
    (0, _classCallCheck2["default"])(this, RequestController);
  }

  (0, _createClass2["default"])(RequestController, null, [{
    key: "searchCandidate",
    value:
    /**
         * @method
         * @description Implements searchCandidate endpoint
         * @static
         * @param {object} req - String
         * @param {object} res - Response object
         * @returns {object} JSON response
         * @memberof RequestController
         */
    function () {
      var _searchCandidate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var phoneNumber, userId, user, networkProvider, addPhoneNumberPrefix, url, headers, response, respToJson, userReport, oldnumberOfRequests, newNumberOfRequests, d, n;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                phoneNumber = req.query.phoneNumber;
                userId = req.user.id;
                _context.next = 5;
                return _User["default"].findOne({
                  _id: userId
                });

              case 5:
                user = _context.sent;

                if (!(user.token >= 1)) {
                  _context.next = 49;
                  break;
                }

                if (!phoneNumber) {
                  _context.next = 46;
                  break;
                }

                networkProvider = (0, _checkNetwork.checkNetwork)(phoneNumber);
                addPhoneNumberPrefix = phoneNumber.replace('0', '234');
                url = "\"http://10.0.0.65:9960/lookup?op=basic-info&msisdn=".concat(addPhoneNumberPrefix, "&network=").concat(networkProvider);
                headers = {
                  'api-key': 'TaoPv/d8bFH/tuCVzE322Q=='
                };
                _context.next = 14;
                return _axios["default"].get(url, {
                  headers: headers
                });

              case 14:
                response = _context.sent;
                _context.next = 17;
                return response.json();

              case 17:
                respToJson = _context.sent;
                _context.next = 20;
                return _Report["default"].findOne({
                  userId: userId
                });

              case 20:
                userReport = _context.sent;
                oldnumberOfRequests = userReport.numberOfRequests;
                newNumberOfRequests = oldnumberOfRequests + 1;
                d = new Date();
                n = d.toISOString();

                if (!(respToJson.status == 200)) {
                  _context.next = 36;
                  break;
                }

                oldToken = user.token;
                newToken = oldToken - 1;
                user.token = newToken;
                _context.next = 31;
                return user.save();

              case 31:
                _context.next = 33;
                return _Report["default"].findOneAndUpdate({
                  userId: userId
                }, {
                  numberOfRequests: newNumberOfRequests,
                  $push: {
                    requests: {
                      requestStatus: 'successful',
                      requestId: (0, _uuidv.uuid)(),
                      Date: n
                    }
                  }
                });

              case 33:
                return _context.abrupt("return", res.status(200).send({
                  message: "success",
                  data: respToJson.data
                }));

              case 36:
                oldToken = user.token;
                newToken = oldToken - 1;
                user.token = newToken;
                _context.next = 41;
                return user.save();

              case 41:
                _context.next = 43;
                return _Report["default"].findOneAndUpdate({
                  userId: userId
                }, {
                  numberOfRequests: newNumberOfRequests,
                  $push: {
                    requests: {
                      requestStatus: 'failed',
                      requestId: (0, _uuidv.uuid)(),
                      Date: n
                    }
                  }
                });

              case 43:
                return _context.abrupt("return", res.status(200).send({
                  message: "request not successful",
                  data: respToJson
                }));

              case 44:
                _context.next = 47;
                break;

              case 46:
                return _context.abrupt("return", res.status(400).send({
                  message: "phone number should not be empty",
                  data: null
                }));

              case 47:
                _context.next = 50;
                break;

              case 49:
                return _context.abrupt("return", res.status(403).send({
                  message: "Token is too low",
                  data: null
                }));

              case 50:
                _context.next = 56;
                break;

              case 52:
                _context.prev = 52;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);
                return _context.abrupt("return", res.status(500).send({
                  message: "internal server error",
                  data: null
                }));

              case 56:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 52]]);
      }));

      function searchCandidate(_x, _x2) {
        return _searchCandidate.apply(this, arguments);
      }

      return searchCandidate;
    }()
  }, {
    key: "returnUserRequestHistory",
    value:
    /**
         * @method
         * @description Implements returnUserRequestHistory endpoint
         * @static
         * @param {object} req - String
         * @param {object} res - Response Object
         * @returns {object} JSON response
         * @memberof RequestController
         */
    function () {
      var _returnUserRequestHistory = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var userId, report;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                userId = req.user.id;
                _context2.next = 4;
                return _Report["default"].findOne({
                  userId: userId
                });

              case 4:
                report = _context2.sent;

                if (!report) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", res.status(200).send({
                  message: "success",
                  data: {
                    numberOfRequests: report.numberOfRequests,
                    requests: report.requests
                  }
                }));

              case 9:
                return _context2.abrupt("return", res.status(404).send({
                  message: "history not found",
                  data: null
                }));

              case 10:
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(500).send({
                  message: "internal server error",
                  data: null
                }));

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 12]]);
      }));

      function returnUserRequestHistory(_x3, _x4) {
        return _returnUserRequestHistory.apply(this, arguments);
      }

      return returnUserRequestHistory;
    }()
  }]);
  return RequestController;
}();

exports["default"] = RequestController;
//# sourceMappingURL=request.js.map