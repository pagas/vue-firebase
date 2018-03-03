import firestore from '../firestoreInit';
const collectionName = 'chat';

export default {
    listenToMessages(conversationId, callback) {
        return firestore.collection(collectionName).where('conversationId', '==', conversationId).onSnapshot(snapshot => {
            let result = [];
            snapshot.forEach(doc => {
                result.push({...doc.data(), id: doc.id});
            })
            callback(result);
        })
    },
    addMessage(message) {
        return firestore.collection(collectionName).add(message);
    },
    removeMessage(messageId) {
        return firestore.collection(collectionName).doc(messageId).delete();
    }
}