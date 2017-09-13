'use strict';

const AzureIoTClient = require('azure-iot-device').Client;
const AzureIoTMessage = require('azure-iot-device').Message;
const AzureIoTMqtt = require('azure-iot-device-mqtt').Mqtt;
const Simulated = require('./sensor/simulated');

let sendingMessage = false;
const simulatedSensor = new Simulated();
function AzureIoT(config) {
  this.config = config;
  console.log("Initializing the Azure IoT client...");
  this.initClient();
}

AzureIoT.prototype.sendMessage = function (content) {
  content.deviceId = this.getDeviceId();
  content.data = simulatedSensor.read();
  let message = new AzureIoTMessage(JSON.stringify(content));
  console.log('Sending message: ' + JSON.stringify(content));
  this.client.sendEvent(message, (err) => {
    if (err) {
      console.error('Failed to send message to Azure IoT Hub');
    } else {
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
  });
};

AzureIoT.prototype.getConnectionString = function () {
  return this.config.azureIoTHubDeviceConnectionString;
};

AzureIoT.prototype.getDeviceId = function () {
  return this.config.deviceId;
};


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
  let message = msg.getData().toString('utf-8');
  AzureIoTClient.complete(msg, () => {
    console.log('Receive message: ' + message);
  });
}

module.exports = AzureIoT;
