var admin = require("../helpers/firebaseAdmin");

/**
 * Creates conversation and user record in userConversation collection.
 * @param conversation - conversation to be created
 * @param user - conversation author
 * @returns {Promise<firebase.firestore.DocumentReference>}
 */
exports.createConversation = function(conversation, user){
    conversation.deleted = true;
    conversation.createdAt = new Date();
    return admin.firestore().collection('conversations').add(conversation).then(response => {
        conversation.id = response.id;
        return this.addUserToConversation(conversation, user);
    });
};

/**
 * Registers user into collection.
 * @param conversation - conversation user is in
 * @param user - user to be registered in conversation
 * @returns {Promise<firebase.firestore.DocumentReference>}
 */
exports.addUserToConversation = function(conversation, user) {
    console.log(conversation, user);
    return admin.firestore().collection('userConversations').add({
        userId: user.id,
        userName: user.name,
        conversationId: conversation.id,
        conversationName: conversation.name,
        deleted: false,
        createdAt: new Date()
    })
}