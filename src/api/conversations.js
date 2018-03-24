import getFirestore from '../firestoreInit';
import Vue from 'vue';
const collectionName = 'conversations';


export default {
    createConversation(conversation) {
        return getFirestore().then(firestore => {
            return firestore.collection(collectionName).add(conversation);
        });
    },
    removeConversation(userId, conversationId) {
        return Vue.http.get('/removeConversation', {
            params: {
                conversationId: conversationId,
                userId: userId
            }
        })
        .then(response => {
            return response.body;
        })
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