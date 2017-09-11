# rfid-android-nfc-reader

This application is an android mobile application which is used to read RFID tags using the NFC enabled Android mobile phone. 

## basic idea
The basic idea is to read the RFID tags using the Android NFC capability and upload the RFID tag and associated data to the Azure Database. This data will be used by the rfid-raspberry-pi-reader to authorize the same RFID tag when scanned by the RFID reader hardware attached to the raspberry -pi. 

## technolgoies

- Gradle
- android 
- java
- nfc

## todo

- Add the functionality to upload the RFID data to Azure database.