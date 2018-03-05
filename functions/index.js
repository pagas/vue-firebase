const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
    debugger;
    response.send('Hello World!');
});

// const functions = require('firebase-functions');
// var admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);
//
// function respondJson(response, output) {
//     response.status(200).send(JSON.stringify(output, null, 3));
// }
//
// exports.getMessages = functions.https.onRequest((request, response) => {
//     if (request.method === 'GET') {
//         response.status(200).send('Hello World!');
//     }
// });
//
//
// exports.getConversation = functions.https.onRequest((request, response) => {
//     console.log('query:', request.query);
//     if (request.method === 'GET' && request.query.conversationId) {
//         var conversationId = request.query.conversationId;
//
//
//
//         admin.firestore().collection('conversation').doc(conversationId).get()
//             .then(doc => {
//
//                 respondJson(response, {test:'est'});
//                 return false;
//                // return doc.data();
//             })
//             .then(conversation => {
//                 let usersPromises = [];
//
//                 //respondJson(response, conversation);
//                 return true;
//
//                 // for (let userId in conversation.userIds) {
//                 //     usersPromises.push(admin.database().ref('users/' + userId).once('value')
//                 //         .then(snapshot => {
//                 //             return snapshot.val();
//                 //         })
//                 //     );
//                 // }
//                 // return Promise.all(usersPromises).then(users => {
//                 //     let formatedUsers = users.map(user => {
//                 //         return {id: user.id, name: user.name}
//                 //     });
//                 //     conversation.users = formatedUsers;
//                 //     return conversation;
//                 // });
//             })
//             // .then(conversation => {
//             //     response.status(200).send(conversation);
//             //     res.setHeader('Content-Type', 'application/json');
//             //     res.send(JSON.stringify({ a: 1 }, null, 3));
//             //     return true;
//             // })
//             .catch(error => {
//                 console.log(error);
//             });
//
//     } else {
//         response.status(500).send({error: 'Incorrect GET request'});
//     }
// });
//
// //
// // exports.getConversations = functions.https.onRequest((request, response) => {
// //     if (request.method === 'GET') {
// //         response.status(200).send('Hello World!');
// //     }
// // });
//
//
