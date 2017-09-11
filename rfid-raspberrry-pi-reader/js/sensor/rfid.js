'use strict';

const rc522 = require("rc522-rfid");

function Rfid(callback) {
  rc522((rfidSerialNumber) => {
    console.log(rfidSerialNumber);
    callback({
      id: rfidSerialNumber
    });
  });
}

module.exports = Rfid;
