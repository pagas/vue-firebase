import conversationApi from '../api/conversations';
import userConversationApi from '../api/userConversations';

export default {
    addConversation(userId, conversation) {
        // create conversation
        return conversationApi.addConversation(conversation)
            .then(response => {
                return this.addUserToConversation(userId, response.id);
            })
    },
    addUserToConversation(userId, conversationId,) {
        return userConversationApi.addUserConversation({
            userId: userId,
            conversationId: conversationId,
            deleted: false
        })
    },
    listenToNewConversations(userId, callback) {
        return userConversationApi.listenToUserConversations(userId, (conversationIds) => {
            conversationApi.getConversations(conversationIds).then( response => {
                callback(response)
            })
        });
    },
    listenToNewUses(conversationId, callback) {
        return userConversationApi.listenToNewUsers(conversationId, (response) => {
            conversationApi.getConversationUsers(conversationId).then( response => {
                callback(response)
            })
        });
    }
}