"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkNetwork = void 0;

var checkNetwork = function checkNetwork(phoneNumber) {
  var phoneToArr = phoneNumber.split('');
  var prefixArr = phoneToArr.splice(0, 4);
  var prefix = prefixArr.join('');
  var prefixAndNetwork = {
    "mtn": ["0703", "0706", "0803", "0806", "0810", "0813", "0814", "0816", "0903", "0906"],
    "glo": ["0705", "0805", "0807", "0811", "0815", "0905"],
    "airtel": ["0701", "0708", "0802", "0808", "0812", "0902", "0907", "0901"],
    "9mobile": ["0809", "0817", "0818", "0908", "0909"]
  };

  for (var network in prefixAndNetwork) {
    if (prefixAndNetwork[network].includes(prefix)) {
      console.log("network", network);
      return network;
    } else {
      return 'mtn';
    }
  }
};

exports.checkNetwork = checkNetwork;
//# sourceMappingURL=checkNetwork.js.map