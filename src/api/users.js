import getFirestore from '../firestoreInit';
const collectionName = 'users';
import Vue from 'vue';

export default {
    getUser(userId) {
        getFirestore().then(firestore => {
            return firestore.collection(collectionName).doc(userId).get().then(doc => {
                return doc.data();
            })
        });
    },
    getUsers() {
        return getFirestore().then(firestore => {
            return firestore.collection(collectionName).get().then(snapshot => {
                let result = [];
                snapshot.forEach(doc => {
                    result.push({...doc.data(), id: doc.id});
                })
                return result;
            });
        })
    },
}