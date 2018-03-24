const functions = require('firebase-functions');
var conversationService = require('./services/conversation.service');
var userService = require('./services/user.service');

exports.createConversation = functions.firestore
    .document('conversations/{conversationId}')
    .onCreate((event) => {
        var conversation = event.data.data();
        conversation.id = event.params.conversationId;

        return event.data.ref.set({
            deleted: false,
            createdAt: new Date()
        }, {merge: true}).then(function () {
            return userService.getUser(conversation.userId).then(user => {
                return conversationService.addUserToConversation(conversation, user);
            });
        })
    });

exports.updateConversation = functions.firestore
    .document('conversations/{conversationId}')
    .onUpdate((event) => {
        const data = event.data.data();
        const previousData = event.data.previous.data();
        const conversationId = event.params.conversationId;

        // check if updating is not called from creating conversation
        if (previousData.deleted !== undefined && data.deleted !== previousData.deleted) {
            return conversationService.updateConversationDeleteFlag(conversationId, data.deleted);
        }
        return true;
    });

