import firestore from '../firestoreInit';
const collectionName = 'userConversations';

export default {
    addUserConversation(userConversation) {
        return firestore.collection(collectionName).add(userConversation);
    },
    listenToUserConversations(userId, callback) {
        return firestore.collection(collectionName).where('userId', '==', userId).onSnapshot(snapshot => {
            let result = [];
            snapshot.forEach(doc => {
                result.push(doc.data().conversationId);
            })
            callback(result);
        })
    },
}