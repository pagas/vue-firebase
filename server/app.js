'use strict';
var admin = require("firebase-admin");
var Promise = require("bluebird");
const functions = require('firebase-functions');
var serviceAccount = require("../src/config/paulius-7557c-firebase-adminsdk-ngnqy-20ab98f2c3.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://paulius-7557c.firebaseio.com"
});

var http = require("http"),
    pathUtils = require("path"),
    express = require("express"),
    app = express(),
    PORT = process.env.PORT || 5000,
    appDir = pathUtils.resolve(__dirname, "../dist");

app.use(express.static(appDir));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

function getConversationUsers(conversationId) {
    return admin.firestore().collection('userConversations')
        .where('conversationId', '==', conversationId)
        .where('deleted', '==', false)
        .get()
        .then(function (querySnapshot) {
            var userIds = [];
            querySnapshot.forEach(function (doc) {
                userIds.push(doc.data().userId);
            });
            return userIds;
        })
        .then(userIds => {
            return getUsers(userIds);
        });
}

function getUsers(userIds) {
    var usersPromises = [];
    userIds.forEach(function (userId) {
        usersPromises.push(admin.firestore().collection('users').doc(userId).get()
            .then(doc => {
                return {name: doc.data().name, id: doc.id};
            })
        );
    });
    return Promise.all(usersPromises).then(users => {
        return users.map(user => {
            return {id: user.id, name: user.name}
        });
    });
}

// app.get("/addUser", function (req, res) {
//     var userId = req.query.userId;
//     var conversationId = req.query.conversationId;
//
//     admin.firestore().collection('conversations').doc(conversationId).get()
//
//     res.json(users);
// });

app.get("/getConversationUsers", function (req, res) {
    getConversationUsers(req.query.conversationId).then(users => {
        res.json(users);
    })
});

// app.get("/getConversation", function (req, res) {
//     var conversationId = req.query.conversationId;
//     admin.firestore().collection('conversations').doc(conversationId).get()
//         .then(doc => {
//             return doc.data();
//         })
// });

app.post("/getConversations", function (req, res) {
    var collectionPromises = [];
    req.body.conversationIds.forEach(id => {
        collectionPromises.push(admin.firestore().collection('conversations').doc(id).get()
            .then(doc => {
                var obj = doc.data();
                obj.id = doc.id;
                return obj;
            })
        );
    });

    Promise.all(collectionPromises).then(response => {
        res.json(response);
    })
});

/**
 * Flag conversation as deleted as well appropriate userConversation records.
 */
app.get("/removeConversation", function (req, res) {
    var conversationId = req.query.conversationId;
    var userId = req.query.userId;
    var collectionPromises = [];
    collectionPromises.push(admin.firestore().collection('conversations')
        .doc(conversationId).update({deleted: true})
    );
    collectionPromises.push(admin.firestore().collection('userConversations')
        .where('userId', '==', userId)
        .where('conversationId', '==', conversationId)
        .get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                doc.ref.update({deleted: true});
            });
        })
    );

    Promise.all(collectionPromises).then(response => {
        res.json(response);
    })
});

app.get("*", function (req, res) {
    res.sendfile(pathUtils.resolve(appDir, "index.html"));
});


http.createServer(app).listen(PORT, function () {
    console.log("Express server listening on port " + PORT);
    console.log("http://localhost:" + PORT);
});