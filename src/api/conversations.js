import firestore from '../firestoreInit';
import Vue from 'vue';
import config from '../config/firebaseConfig'
const collectionName = 'conversations';


export default {
    addConversation(conversation) {
        conversation.deleted = false;
        conversation.createdAt = new Date();
        return firestore.collection(collectionName).add(conversation);
    },
    createConversation(conversation, user) {
        return Vue.http.post('/createConversation', {
                conversation: conversation,
                user: user
            })
            .then(response => {
                return response.body;
            })
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
        return firestore.collection('conversations').doc(conversationId).get().then( doc => {
            return {...doc.data(), id: doc.id};
        })
    },
}