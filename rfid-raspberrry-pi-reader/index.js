'use strict';

const AzureIoT = require('./js/azureIoT');
const Rfid = require('./js/sensor/rfid');
let config;

(function () {
    // read in configuration in config.json
  try {
    config = require('./config.json');
  } catch (err) {
    console.error('Failed to load config.json: ' + err.message);
    return;
  }
  const azureIoT = new AzureIoT(config);
  new Rfid(azureIoT.sendMessage);
})(process.argv[2]);
