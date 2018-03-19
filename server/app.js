'use strict';
var Promise = require("bluebird");
var admin = require("./helpers/firebaseAdmin");
var conversationService = require("./services/conversation.service");

var http = require("http"),
    pathUtils = require("path"),
    express = require("express"),
    app = express(),
    PORT = process.env.PORT || 5000,
    appDir = pathUtils.resolve(__dirname, "../dist");

app.use(express.static(appDir));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies


app.post("/createConversation", function (req, res) {
    var conversation = req.body.conversation;
    var user = req.body.user;
    conversationService.createConversation(conversation, user)
        .then(response => {
            res.json(response);
        });
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