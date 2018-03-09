const functions = require('firebase-functions');
var admin = require("firebase-admin");
var config = require("./config/exportFirebaseConfig");

admin.initializeApp(config);

function respondJson(response, output) {
    response.status(200).send(JSON.stringify(output, null, 3));
}

exports.getConversation = functions.https.onRequest((request, response) => {
    if (request.method === 'GET' && request.query.conversationId) {
        var conversationId = request.query.conversationId;

        admin.firestore().collection('conversations').doc(conversationId).get()
            .then(doc => {
                return doc.data();
            })
            .then(conversation => {
                // get all data of users that are in the conversation
                // form array of users that contains user name as well
                let usersPromises = [];
                for (let userId in conversation.userIds) {
                    usersPromises.push(admin.firestore().collection('users').doc(userId).get()
                        .then(doc => {
                            return {name: doc.data().name, id: doc.id};
                        })
                    );
                }
                return Promise.all(usersPromises).then(users => {
                    let formatedUsers = users.map(user => {
                        return {id: user.id, name: user.name}
                    });
                    conversation.users = formatedUsers;
                    delete conversation.userIds;
                    return conversation;
                }).then(conversation => {
                    respondJson(response, conversation);
                    return true;
                });
            })
            .catch(error => {
                console.log(error);
            })
    } else {
        response.status(500).send({error: 'Incorrect GET request'});
    }
});

exports.createCollection = functions.firestore
    .document('conversations/{$collectionId}').onCreate((event) => {
        // on creating collection we need to create a entry in userCollections for creator
        console.log('event', event)

    });


//
// exports.getConversations = functions.https.onRequest((request, response) => {
//     if (request.method === 'GET') {
//         response.status(200).send('Hello World!');
//     }
// });


