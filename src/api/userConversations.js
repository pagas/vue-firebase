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
    listenToUserConversations(userId, lastVisible, callback) {
        return firestore.collection(collectionName)
            .where('userId', '==', userId)
            .where('deleted', '==', false)
            .orderBy('createdAt', 'desc')
            .endAt(lastVisible)
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

    loadMoreConversations(userId, lastVisible) {
        return firestore.collection(collectionName)
            .where('userId', '==', userId)
            .where('deleted', '==', false)
            .orderBy('createdAt', 'desc')
            .startAfter(lastVisible)
            .limit(3).get()
            .then(documentSnapshots => {
                let result = [];
                documentSnapshots.forEach(doc => {
                    result.push({id: doc.data().conversationId, name: doc.data().conversationName});
                })
                return {result: result, lastVisible: documentSnapshots.docs[documentSnapshots.docs.length-1]};
            })
    },
    getFirstConversations(userId) {
        return firestore.collection(collectionName)
            .where('userId', '==', userId)
            .where('deleted', '==', false)
            .orderBy('createdAt', 'desc')
            .limit(3).get()
            .then(documentSnapshots => {
                let result = [];
                documentSnapshots.forEach(doc => {
                    result.push({id: doc.data().conversationId, name: doc.data().conversationName});
                })
                return {result: result, lastVisible: documentSnapshots.docs[documentSnapshots.docs.length-1]};
            })
    }

}