import firestore from '../firestoreInit';

export default {
    listenToMessages(userId, callback) {
        return firestore.collection('chat').where('userId', '==', userId).onSnapshot(snapshot => {
            let result = [];
            snapshot.forEach(doc => {
                result.push({...doc.data(), id: doc.id});
            })
            callback(result);
        })
    },
    addMessage(message) {
        return firestore.collection('chat').add(message);
    },
    removeMessage(messageId) {
        return firestore.collection('chat').doc(messageId).delete();
    }
}