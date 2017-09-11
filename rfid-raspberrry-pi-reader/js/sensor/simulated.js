'use strict';

function Simulated(/* options */) {
  // nothing todo
}

Simulated.prototype.read = function () {
  return {
    temperature: random(20, 30),
    humidity: random(60, 80)
  };
};

function random(min, max) {
  return Math.random() * (max - min) + min;
}

module.exports = Simulated;
