"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _mongodb = _interopRequireDefault(require("mongodb"));

var _cors = _interopRequireDefault(require("cors"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _config = require("./config/config");

var _userAuth = _interopRequireDefault(require("./route/userAuth"));

var app = (0, _express["default"])();
var MongoClient = _mongodb["default"].MongoClient;
var isProduction = process.env.NODE_ENV === 'production'; // Normal express config defaults

app.use((0, _cors["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use((0, _methodOverride["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, 'public')));
app.use('/digitalpulse', _userAuth["default"]);
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false,
  // Don't build indexes
  poolSize: 10 // Maintain up to 10 socket connections

}; // mongoose.connect(devUri, options, (err) => {
//   if (err) throw err;
//   console.log('connected to the DB!');
// });

MongoClient.connect(_config.liveUri, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

_mongoose["default"].set('useFindAndModify', false);

app.use(_express["default"]["static"]("".concat(__dirname, "/public"))); // handle non-existing route

app.use(function (req, res, next) {
  res.status(404).json({
    status: 404,
    error: 'Wrong request. Route does not exist'
  });
}); //Error handlers & middlewares

if (!isProduction) {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

app.use(function (err, req, res) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("App running on port ".concat(PORT));
});
//# sourceMappingURL=app.js.map