import firestore from '../firestoreInit';

const collectionName = 'userConversations';

export default {
    addUserConversation(userConversation) {
        return firestore.collection(collectionName).add(userConversation);
    },
    removeUser(conversationId, userId) {
        return firestore.collection(collectionName)
            .where('userId', '==', userId)
            .where('conversationId', '==', conversationId).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    doc.ref.delete()
                })
            });
    },
    listenToUserConversations(userId, callback) {
        return firestore.collection(collectionName)
            .where('userId', '==', userId)
            .where('deleted', '==', false)
            .onSnapshot(snapshot => {
                let result = [];
                snapshot.forEach(doc => {
                    result.push(doc.data().conversationId);
                })
                callback(result);
            })
    },

    listenToNewUsers(conversationId, callback) {
        return firestore.collection(collectionName)
            .where('conversationId', '==', conversationId)
            //.where('deleted', '==', false)
            .onSnapshot(snapshot => {
                callback(snapshot);
            })
    },
}