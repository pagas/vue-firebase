var admin = require("../helpers/firebaseAdmin");
var userConversationCollection = 'userConversations';
var Promise = require("bluebird");

/**
 * Registers user into collection.
 * @param conversation - conversation user is in
 * @param user - user to be registered in conversation
 * @returns {Promise<firebase.firestore.DocumentReference>}
 */
exports.addUserToConversation = function(conversation, user) {
    return admin.firestore().collection(userConversationCollection).add({
        userId: user.id,
        userName: user.name,
        conversationId: conversation.id,
        conversationName: conversation.name,
        deleted: false,
        createdAt: new Date()
    })
}

exports.updateConversationDeleteFlag = function(conversationId, deleteFlag) {
    return admin.firestore().collection(userConversationCollection)
        .where('conversationId', '==', conversationId)
        .get().then(function (querySnapshot) {
            let promises = [];
            querySnapshot.forEach(function (doc) {
                promises.push(doc.ref.update({deleted: deleteFlag}));
            });
            return Promise.all(promises);
        })
}

