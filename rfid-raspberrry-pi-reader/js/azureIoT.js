'use strict';

const AzureIoTClient = require('azure-iot-device').Client;
const AzureIoTMessage = require('azure-iot-device').Message;
const AzureIoTMqtt = require('azure-iot-device-mqtt').Mqtt;
const AzureIoTBi = require('az-iot-bi');
const Simulated = require('sensor/simulated');
const WPI = require('./wpi.js');

const wpi = new WPI();

let sendingMessage = false;
const simulatedSensor = new Simulated();
function AzureIoT(config) {
  this.config = config;
  AzureIoTBi.start();
  let deviceInfo = {device: "RaspberryPi", language: "NodeJS"};
  if (AzureIoTBi.isBIEnabled()) {
    AzureIoTBi.trackEventWithoutInternalProperties('yes', deviceInfo);
    AzureIoTBi.trackEvent('success', deviceInfo);
  } else {
    AzureIoTBi.trackEventWithoutInternalProperties('no', deviceInfo);
  }
  AzureIoTBi.flush();

  this.initClient();
}

AzureIoT.prototype.sendMessage = function (content) {
  if (!sendingMessage) {
    return;
  }
  decorateContent(content);
  let message = new AzureIoTMessage(JSON.stringify(content));
  console.log('Sending message: ' + content);
  this.client.sendEvent(message, (err) => {
    if (err) {
      console.error('Failed to send message to Azure IoT Hub');
    } else {
      wpi.blinkLED();
      console.log('Message sent to Azure IoT Hub');
    }
  });
};

AzureIoT.prototype.initClient = function () {
  // fromConnectionString must specify a transport constructor, coming from any transport package.
  this.client = AzureIoTClient.fromConnectionString(this.getConnectionString(), AzureIoTMqtt);

  this.client.open((err) => {
    if (err) {
      console.error('[IoT hub Client] Connect error: ' + err.message);
      return;
    }

    // set C2D and device method callback
    this.client.onDeviceMethod('start', onStart);
    this.client.onDeviceMethod('stop', onStop);
    this.client.on('message', receiveMessageCallback);
    setInterval(() => {
      this.client.getTwin((err, twin) => {
        if (err) {
          console.error("get twin message error");
          return;
        }
        this.config.interval = twin.properties.desired.interval || this.config.interval;
      });
    }, this.config.interval);
  });
};

AzureIoT.prototype.getConnectionString = function () {
  return this.config.azureIoTHubDeviceConnectionString;
};

AzureIoT.prototype.getDeviceId = function () {
  return this.config.deviceId;
};


function decorateContent(content) {
  content.deviceId = this.getDeviceId();
  content.data = simulatedSensor.read();
}


function onStart(request, response) {
  console.log('Try to invoke method start(' + request.payload || '' + ')');
  sendingMessage = true;

  response.send(200, 'Successully start sending message to cloud', function (err) {
    if (err) {
      console.error('[IoT hub Client] Failed sending a method response:\n' + err.message);
    }
  });
}

function onStop(request, response) {
  console.log('Try to invoke method stop(' + request.payload || '' + ')');
  sendingMessage = false;

  response.send(200, 'Successfully stop sending message to cloud', function (err) {
    if (err) {
      console.error('[IoT hub Client] Failed sending a method response:\n' + err.message);
    }
  });
}

function receiveMessageCallback(msg) {
  wpi.blinkLED();
  let message = msg.getData().toString('utf-8');
  AzureIoTClient.complete(msg, () => {
    console.log('Receive message: ' + message);
  });
}

module.exports = AzureIoT;
