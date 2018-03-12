import firestore from '../firestoreInit';
import Vue from 'vue';
import config from '../config/firebaseConfig'
const collectionName = 'conversations';


export default {
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
    getConversation(conversationId) {
        return Vue.http.get(config.functions + '/getConversation', {params: {conversationId: conversationId}})
            .then(response => {
                return response.body;
            })
    },
    getConversations(conversationIds) {
        return Vue.http.post('/getConversations', {conversationIds: conversationIds})
            .then(response => {
                return response.body;
            })
    }
}