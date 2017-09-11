# rfid-raspberry-pi-reader

This raspberrry pi, node.js application will be used to read the RFID and other sensor data from the sensors attched to raspberry pi and sent the JSON packet to Azure for safe keeping or further processing

## basic idea
When an RFID tag is scanner on the RFID reader, this application will parse the RFID data and other sensore data and sent them in JSON format to Azure for storage and further processing. Such as sending notifications to rfid-android-notifier application.

## technologies
- Node.js
- Azure
- Gradle
- Java

## todo
- Implement logic to read RFID RC522 reader data
- Logic to send the data to Azure 
- Logic to read the response received by Azure.