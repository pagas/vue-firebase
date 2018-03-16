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
                    doc.ref.delete().then(response => {
                        console.log('document was deleted', response);
                    })
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
                    result.push({id: doc.data().conversationId, name: doc.data().conversationName});
                })
                callback(result);
            })
    },

    listenToNewUsers(conversationId, callback) {
        return firestore.collection(collectionName)
            .where('conversationId', '==', conversationId)
            .where('deleted', '==', false)
            .onSnapshot(
                function(doc) {
                    callback(doc);
                }
            )
    },
}