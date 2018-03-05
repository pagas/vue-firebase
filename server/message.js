var admin = require("firebase-admin");

var serviceAccount = require("../config/paulius-7557c-firebase-adminsdk-ngnqy-20ab98f2c3.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://paulius-7557c.firebaseio.com"
});

// This registration token comes from the client FCM SDKs.
var registrationToken = 'd0BG18NQEG0:APA91bGm9sJ5VnhLP_7yVKuOi5EyJtaQKFjwy-qjmPlecQmRmOEyQyY72YA7bUPLZOXaGe7kcViEPJ6uHAXMEtj_AFgRbACd8Jo0UtnzdeIvvRFcy17CSDZ74ibcMt-v7x2PzGJRArbE';

// See documentation on defining a message payload.
var message = {
    notification : {
        body : "This is an FCM notification message!",
        title : "FCM Message",
    },
    token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });