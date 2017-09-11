'use strict'

const wpi = require('wiring-pi');

function WPI(config) {
  this.config = config;
  wpi.setup('wpi');
  wpi.pinMode(config.LEDPin, wpi.OUTPUT);
}

WPI.prototype.blinkLED = function () {
  // Light up LED for 500 ms
  wpi.digitalWrite(this.config.LEDPin, 1);
  setTimeout(function () {
    wpi.digitalWrite(this.config.LEDPin, 0);
  }, 500);
};

module.exports = WPI;
