import firestore from '../firestoreInit';

const collectionName = 'conversations';

export default {
    listenToConversations(userId, callback) {
        return firestore.collection(collectionName).where('userIds.' + userId, '==', true).onSnapshot(snapshot => {
            let result = [];
            snapshot.forEach(doc => {
                result.push({...doc.data(), id: doc.id});
            })
            callback(result);
        })
    },
    addConversation(conversation) {
        return firestore.collection(collectionName).add(conversation);
    },
    removeConversation(conversationId) {
        return firestore.collection(collectionName).doc(conversationId).delete();
    },
    getConversation(conversationId) {
        return firestore.collection(collectionName).doc(conversationId).then(doc => {
            return doc.data();
        })
    }
}