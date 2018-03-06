const functions = require('firebase-functions');
var admin = require("firebase-admin");
var config = require("../src/config/exportFirebaseConfig");

admin.initializeApp(config);

exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello World!');
});

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

                let usersPromises = [];
                for (let userId in conversation.userIds) {
                    usersPromises.push(admin.database().ref('users/' + userId).once('value')
                        .then(snapshot => {
                            return snapshot.val();
                        })
                    );
                }
                return Promise.all(usersPromises).then(users => {
                    let formatedUsers = users.map(user => {
                        return {id: user.id, name: user.name}
                    });
                    conversation.users = formatedUsers;
                    respondJson(response, conversation);
                    return conversation;
                });
            })
    } else {
        response.status(500).send({error: 'Incorrect GET request'});
    }
});

//
// exports.getConversations = functions.https.onRequest((request, response) => {
//     if (request.method === 'GET') {
//         response.status(200).send('Hello World!');
//     }
// });


