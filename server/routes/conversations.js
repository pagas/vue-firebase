var express = require('express');
var router = express.Router();
var Promise = require("bluebird");
var admin = require("../helpers/firebaseAdmin");
var conversationService = require("../services/conversation.service");

// router.post("/createConversation", function (req, res) {
//     var conversation = req.body.conversation;
//     var user = req.body.user;
//     conversationService.createConversation(conversation, user)
//         .then(response => {
//             res.json(response);
//         });
// });

/**
 * Flag conversation as deleted as well appropriate userConversation records.
 */
router.get("/removeConversation", function (req, res) {
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

module.exports = router;