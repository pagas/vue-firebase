import getFirestore from '../firestoreInit';
const collectionName = 'conversations';


export default {
    createConversation(conversation) {
        return getFirestore().then(firestore => {
            return firestore.collection(collectionName).add(conversation);
        });
    },
    removeConversation(conversationId) {
        getFirestore().then(firebase => {
            return firebase.collection(collectionName)
                    .doc(conversationId).update({deleted: true})
            }
        );
    },
    /**
     * Used in conversation view to get conversation and users in one object.
     * @param conversationId
     */
    getConversation(conversationId) {
        return getFirestore().then(firestore => {
            return firestore.collection(collectionName).doc(conversationId).get().then(doc => {
                return {...doc.data(), id: doc.id};
            })
        });
    },
}