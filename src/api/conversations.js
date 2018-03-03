import firestore from '../firestoreInit';

export default {
    listenToConversations(userId, callback) {
        return firestore.collection('conversations').where('userIds.'+userId, '==', true).onSnapshot(snapshot => {
            let result = [];
            snapshot.forEach(doc => {
                result.push({...doc.data(), id: doc.id});
            })
            callback(result);
        })
    },
    addConversation(conversation) {
        return firestore.collection('conversations').add(conversation);
    },
    removeConversation(conversationId) {
        return firestore.collection('conversations').doc(conversationId).delete();
    }
}