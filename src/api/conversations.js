import firestore from '../firestoreInit';
import Vue from 'vue';
import config from '../config/firebaseConfig'
const collectionName = 'conversations';


export default {
    listenToConversations(userId, callback) {
        return firestore.collection(collectionName).where('userIds.' + userId, '==', true).onSnapshot(snapshot => {
            let result = [];
            snapshot.forEach(doc => {
                result.push({...doc.data(), id: doc.id});
            })
            callback(result);
        })
    },
    addConversation(conversation) {
        return firestore.collection(collectionName).add(conversation);
    },
    removeConversation(conversationId) {
        return firestore.collection(collectionName).doc(conversationId).delete();
    },
    getConversation(conversationId) {
        return Vue.http.get(config.functions + '/getConversation', {params: {conversationId: conversationId}})
            .then(response => {
                console.log('got conversations', reponse);
                return response.body;
            })
    }
}