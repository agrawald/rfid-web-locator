'use strict';

const AzureIoT = require('./js/azureIoT');
const rc522 = require("rc522");
let config;

// read in configuration in config.json
try {
    console.log("Loading the configuration...");
    config = require('./config.json');
} catch (err) {
    console.error('Failed to load config.json: ' + err.message);
    return;
}
const azureIoT = new AzureIoT(config);
console.log("Starting the RFID listener...");
rc522(function (rfidSerialNumber) {
    console.log(rfidSerialNumber);
    azureIoT.sendMessage({
        id: rfidSerialNumber
    });
});