const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

exports.iLoveMyWife = functions.https.onRequest((request, response) => {
    response.send("<p>I love my wife!</p><img src='http://cdn2.momjunction.com/wp-content/uploads/2017/11/Love-Quotes-For-Wife5.jpg'>");
});

exports.getMessages = functions.https.onRequest((request, response) => {
    if (request.method === 'GET') {
        response.status(200).send('Hello World!');
    }
});

exports.getConversations = functions.https.onRequest((request, response) => {
    if (request.method === 'GET') {

        response.status(200).send('Hello World!');
    }
});


