import conversationApi from '../api/conversations';
import userConversationApi from '../api/userConversations';
import userApi from '../api/users';

export default {
    addConversation(conversation, user) {
        // create conversation
        return conversationApi.addConversation(conversation)
            .then(response => {
                return this.addUserToConversation({...conversation, id: response.id}, user);
            })
    },
    addUserToConversation(conversation, user) {
        return userConversationApi.addUserConversation({
            userId: user.id,
            userName: user.name,
            conversationId: conversation.id,
            conversationName: conversation.name,
            deleted: false
        })
    },
    listenToNewConversations(userId, callback) {
        return userConversationApi.listenToUserConversations(userId, (conversations) => {
            callback(conversations)
        });
    },
    listenToNewUses(conversationId, callback) {
        return userConversationApi.listenToNewUsers(conversationId,
            (snapshot) => {
                let serverDone = false;
                let users = [];
                snapshot.forEach(doc => {
                    users.push({name: doc.data().userName, id: doc.data().userId});
                    serverDone = !doc.metadata.hasPendingWrites;
                })

                if (serverDone) {
                    callback(users)
                }
            });
    }
}