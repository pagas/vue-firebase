import conversationApi from '../api/conversations';
import userConversationApi from '../api/userConversations';
import userApi from '../api/users';

export default {
    addConversation(conversation, user) {
        return conversationApi.createConversation(conversation, user);
    },
    addUserToConversation(conversation, user) {
        return userConversationApi.addUserConversation({
            userId: user.id,
            userName: user.name,
            conversationId: conversation.id,
            conversationName: conversation.name,
            deleted: false,
            createdAt: new Date()
        })
    },
    listenToNewConversations(userId, lastVisible, callback) {
        return userConversationApi.listenToUserConversations(userId, lastVisible, (conversations) => {
            callback(conversations)
        });
    },
    listenToNewUses(conversationId, callback) {
        return userConversationApi.listenToNewUsers(conversationId,
            (snapshot) => {
                let users = [];
                snapshot.forEach(doc => {
                    users.push({name: doc.data().userName, id: doc.data().userId});
                })
                callback(users);
            });
    }
}