# rfid-android-notifier

This android application is used to receive the push notification from Azure messaging services via Google Messaging Service. 

## basic idea
The basic idea is to receive the push notification which may be anyone of the following types

- display notifications
- authorization request notifications

The display notification, is used to inform the android mobile user about a possible scan of the RFID on the raspberry pi RFID reader. Thereby, notifying the user that the access for a specific RFID tag has been granted successfully.

The authorization request notification is a bit complex, when a RFID tag has been scanned on raspberry pi RFID reader, the authorization request must be verified by Azure IoT hub by checking the database. If the database, does not have an entry for this RFID tag, a authorization request is sent to the android mobile for requesting an access. The user of the android mobile may choose to either grant the access or not. In both the cases the response will be generated and sent back to Azure thereby allowing the access on raspberry pi RFID reader or not.

## technologies
- Android
- Azure
- Gradle
- Java

## todo
- Create an Intent to trigger popup/toast for the display notifications 
- Create an Intent to trigger popup for the authorization request notification, ask the user to grant the access
- Send the user response back to Azure for further processing