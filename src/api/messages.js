import getFirestore from '../firestoreInit';

const collectionName = 'messages';

export default {
    listenToMessages(conversationId, lastVisible, callback) {
        lastVisible = lastVisible || null;
        return getFirestore().then(firestore => {
            return firestore.collection(collectionName)
                .where('conversationId', '==', conversationId)
                .where('deleted', '==', false)
                .orderBy('createdAt', 'desc')
                .endAt(lastVisible)
                .onSnapshot(snapshot => {
                    let result = [];
                    snapshot.forEach(doc => {
                        result.push({...doc.data(), id: doc.id});
                    })
                    callback(result);
                })
        });
    },
    addMessage(message) {
        message.createdAt = new Date();
        message.deleted = false;
        return getFirestore().then(firestore => {
            return firestore.collection(collectionName).add(message);
        });
    },
    removeMessage(messageId) {
        return getFirestore().then(firestore => {
            return firestore.collection(collectionName).doc(messageId).update({deleted: true});
        });
    },
    getFirstMessages(conversationId) {
        return getFirestore().then(firestore => {
            return firestore.collection(collectionName)
                .where('conversationId', '==', conversationId)
                .where('deleted', '==', false)
                .orderBy('createdAt', 'desc')
                .limit(3).get()
                .then(documentSnapshots => {
                    let result = [];
                    documentSnapshots.forEach(doc => {
                        result.push({...doc.data(), id: doc.id});
                    })
                    return {result: result, lastVisible: documentSnapshots.docs[documentSnapshots.docs.length - 1]};
                })
        });
    },
    loadMoreMessages(conversationId, lastVisible) {
        return getFirestore().then(firestore => {
            return firestore.collection(collectionName)
                .where('conversationId', '==', conversationId)
                .where('deleted', '==', false)
                .orderBy('createdAt', 'desc')
                .startAfter(lastVisible)
                .limit(3).get()
                .then(documentSnapshots => {
                    let result = [];
                    documentSnapshots.forEach(doc => {
                        result.push({...doc.data(), id: doc.id});
                    })
                    return {result: result, lastVisible: documentSnapshots.docs[documentSnapshots.docs.length - 1]};
                })
        });
    }
}